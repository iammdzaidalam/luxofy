import { NextResponse } from "next/server";
import { otpSendSchema } from "@/lib/validation";
import { issueOtp } from "@/lib/otp";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`otp-send:${ip}`, 6, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

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

  try {
    const { devCode } = await issueOtp(email);
    await prisma.auditLog.create({
      data: { event: "OTP_SENT", detail: email, ip },
    });
    // devCode is only returned when no SMTP provider is configured
    return NextResponse.json({ ok: true, ...(devCode ? { devCode } : {}) });
  } catch (error) {
    console.error("[otp-send]", error);
    return NextResponse.json(
      { error: "We could not send the code. Please try again." },
      { status: 500 }
    );
  }
}
