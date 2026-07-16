import { NextResponse } from "next/server";
import { otpVerifySchema } from "@/lib/validation";
import { verifyOtp } from "@/lib/otp";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`otp-verify:${ip}`, 15, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = otpVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const result = await verifyOtp(email, parsed.data.code);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await prisma.auditLog.create({ data: { event: "OTP_VERIFIED", detail: email, ip } });
  return NextResponse.json({ ok: true });
}
