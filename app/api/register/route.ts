import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { isEmailVerified } from "@/lib/otp";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { assignSalesperson, runPostRegistrationAutomations } from "@/lib/integrations";

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // bot protection activates once keys are configured
  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`register:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const turnstileOk = await verifyTurnstile(raw.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Bot verification failed. Please retry." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${issue.path.join(".")}: ${issue.message}` },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const phone = data.phone.startsWith("+") ? data.phone : `+91${data.phone}`;
  const email = data.email.toLowerCase();

  const verified = await isEmailVerified(email);
  if (!verified) {
    return NextResponse.json(
      { error: "Please verify your email with the OTP before submitting." },
      { status: 403 }
    );
  }

  const existing = await prisma.lead.findUnique({ where: { phone } });
  if (existing) {
    return NextResponse.json(
      { error: "This mobile number is already registered. Our team will be in touch." },
      { status: 409 }
    );
  }

  const { score, band } = computeScore({
    budget: data.budget,
    timeline: data.timeline,
    occupation: data.occupation,
    purpose: data.purpose,
  });

  const lead = await prisma.lead.create({
    data: {
      fullName: data.fullName,
      email,
      phone,
      emailVerified: true,
      city: data.city,
      state: data.state,
      country: data.country,
      age: data.age,
      gender: data.gender,
      occupation: data.occupation,
      company: data.company || null,
      designation: data.designation || null,
      linkedin: data.linkedin || null,
      annualIncome: data.annualIncome,
      netWorth: data.netWorth,
      budget: data.budget,
      timeline: data.timeline,
      currentInvestments: data.currentInvestments.join(", "),
      purpose: data.purpose,
      propertyType: data.propertyType,
      goaLocation: data.goaLocation,
      hearAbout: data.hearAbout,
      expectedValue: data.expectedValue || null,
      paymentPreference: data.paymentPreference,
      wouldLike: data.wouldLike.join(", "),
      score,
      band,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      referrer: data.referrer,
      assignedTo: await assignSalesperson(),
    },
  });

  await prisma.auditLog.create({
    data: {
      event: "LEAD_CREATED",
      detail: `score=${score} band=${band}`,
      ip,
      leadId: lead.id,
    },
  });

  // Fire and await automations; each channel degrades gracefully on failure
  await runPostRegistrationAutomations(lead, ip, req.headers.get("user-agent") ?? "");

  return NextResponse.json({ ok: true, band, firstName: data.fullName.split(" ")[0] });
}
