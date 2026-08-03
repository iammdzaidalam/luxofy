import { NextResponse } from "next/server";
import { otpSendSchema } from "@/lib/validation";
import { issueOtp } from "@/lib/otp";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = otpSendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  if (!rateLimit(`otp-email:${email}`, 4, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many codes requested for this email. Please wait a few minutes." },
      { status: 429 }
    );
  }

  // Indian mobile carriers put many visitors behind one CGNAT address, so the
  // per-IP ceiling only needs to stop a single abuser — the per-email limit
  // above is the real guard. Checked after validation so malformed requests
  // cannot burn a legitimate visitor's quota.
  const ip = clientIp(req);
  if (!rateLimit(`otp-send:${ip}`, 30, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  try {
    const { devCode } = await issueOtp(email);
    await prisma.auditLog.create({
      data: { event: "OTP_SENT", detail: email, ip },
    });

    // A devCode means delivery failed. Outside development it must never reach
    // the client — returning it would let anyone verify any address. Surface a
    // real error instead so a broken mailbox is visible rather than silent.
    if (devCode) {
      if (process.env.NODE_ENV === "production") {
        console.error("[otp-send] delivery failed for", email);
        return NextResponse.json(
          { error: "We could not send the code right now. Please try again in a moment." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true, devCode });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[otp-send]", error);
    return NextResponse.json(
      { error: "We could not send the code. Please try again." },
      { status: 500 }
    );
  }
}
