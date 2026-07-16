import { createHash } from "crypto";
import type { Lead } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { site, googleCalendarUrl } from "@/lib/site";

/**
 * Post-registration automations. Every channel activates only when its
 * environment keys are present; otherwise it logs in dev mode so the
 * pipeline stays observable without third party accounts.
 */

async function audit(event: string, detail: string, leadId?: string): Promise<void> {
  await prisma.auditLog.create({ data: { event, detail, leadId } });
}

function devLog(channel: string, payload: unknown): void {
  console.info(`[dev-${channel}]`, JSON.stringify(payload, null, 2));
}

// ---------------------------------------------------------------- email

export async function sendConfirmationEmail(lead: Lead): Promise<void> {
  const subject = `Seat reserved: ${site.name}, ${site.event.dateLabel}`;
  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#191817">
      <p style="letter-spacing:3px;font-size:11px;color:#9C7C46;text-transform:uppercase">Think Reality x Luxofy Properties</p>
      <h1 style="font-weight:500;font-size:26px">Your seat is reserved, ${lead.fullName.split(" ")[0]}.</h1>
      <p>Thank you for registering for the ${site.name}. Our team will call you within 24 hours to confirm your RSVP.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
        <tr><td style="padding:8px 0;color:#6B675F">Date</td><td>${site.event.dateLabel}</td></tr>
        <tr><td style="padding:8px 0;color:#6B675F">City</td><td>${site.event.city}</td></tr>
        <tr><td style="padding:8px 0;color:#6B675F">Venue</td><td>${site.event.venueNote}</td></tr>
        <tr><td style="padding:8px 0;color:#6B675F">Entry</td><td>Invite only. Carry a government photo ID.</td></tr>
      </table>
      <a href="${googleCalendarUrl()}" style="display:inline-block;background:#191817;color:#fff;padding:12px 28px;text-decoration:none;font-size:14px">Add to calendar</a>
      <p style="color:#6B675F;font-size:12px;margin-top:32px">${site.organizer} x ${site.partner} | ${site.contact.email} | ${site.contact.phone}</p>
    </div>`;

  try {
    const { sent } = await sendEmail({ to: lead.email, subject, html });
    await audit(sent ? "EMAIL_SENT" : "EMAIL_QUEUED_DEV", subject, lead.id);
  } catch (error) {
    console.error("[email]", error);
    await audit("EMAIL_FAILED", subject, lead.id);
  }
}

// ------------------------------------------------------------- whatsapp

export async function sendWhatsAppConfirmation(lead: Lead): Promise<void> {
  const message =
    `Hi ${lead.fullName.split(" ")[0]}, your seat for the ${site.name} on ${site.event.dateLabel} ` +
    `in ${site.event.city} is reserved. The venue is shared with confirmed guests. ` +
    `Our investment advisor will call you shortly to confirm. Reply here for any questions.`;

  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    devLog("whatsapp", { to: lead.phone, message });
    await audit("WHATSAPP_QUEUED_DEV", message.slice(0, 120), lead.id);
    return;
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: lead.phone.replace(/^\+/, ""),
        type: "text",
        text: { body: message },
      }),
    }
  );
  await audit(res.ok ? "WHATSAPP_SENT" : "WHATSAPP_FAILED", `${res.status}`, lead.id);
}

// ---------------------------------------------------------------- slack

export async function notifySalesTeam(lead: Lead): Promise<void> {
  const text =
    `*New ${lead.band} lead* (score ${lead.score})\n` +
    `${lead.fullName} | ${lead.occupation} | ${lead.city}\n` +
    `Budget ${lead.budget} | Timeline ${lead.timeline} | Purpose ${lead.purpose}\n` +
    `${lead.phone} | ${lead.email}` +
    (lead.utmSource ? `\nSource: ${lead.utmSource} / ${lead.utmCampaign ?? "-"}` : "");

  if (!process.env.SLACK_WEBHOOK_URL) {
    devLog("slack", { text });
    await audit("SLACK_QUEUED_DEV", `${lead.band} ${lead.score}`, lead.id);
    return;
  }

  const res = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  await audit(res.ok ? "SLACK_SENT" : "SLACK_FAILED", `${res.status}`, lead.id);
}

// ------------------------------------------------------- meta conversions

export async function sendMetaConversion(lead: Lead, ip: string, userAgent: string): Promise<void> {
  const sha = (value: string) => createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
  const payload = {
    data: [
      {
        event_name: "CompleteRegistration",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: `${site.url}/register`,
        user_data: {
          em: [sha(lead.email)],
          ph: [sha(lead.phone.replace(/\D/g, ""))],
          client_ip_address: ip,
          client_user_agent: userAgent,
        },
        custom_data: { lead_band: lead.band, lead_score: lead.score },
      },
    ],
  };

  if (!process.env.META_PIXEL_ID || !process.env.META_CAPI_TOKEN) {
    devLog("meta-capi", { event: "CompleteRegistration", band: lead.band });
    await audit("META_CAPI_QUEUED_DEV", "CompleteRegistration", lead.id);
    return;
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  await audit(res.ok ? "META_CAPI_SENT" : "META_CAPI_FAILED", `${res.status}`, lead.id);
}

// ------------------------------------------------------------ orchestrator

/**
 * Round-robin assignment across the sales team. Replace with the real
 * roster before the campaign goes live; a single shared desk by default.
 */
const SALES_TEAM = ["Luxofy Sales Desk"];

export async function assignSalesperson(): Promise<string> {
  const count = await prisma.lead.count();
  return SALES_TEAM[count % SALES_TEAM.length];
}

export async function runPostRegistrationAutomations(
  lead: Lead,
  ip: string,
  userAgent: string
): Promise<void> {
  const results = await Promise.allSettled([
    sendConfirmationEmail(lead),
    sendWhatsAppConfirmation(lead),
    notifySalesTeam(lead),
    sendMetaConversion(lead, ip, userAgent),
  ]);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[automation]", result.reason);
    }
  }
}
