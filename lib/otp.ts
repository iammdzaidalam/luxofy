import { createHash, randomInt } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  return createHash("sha256").update(`${code}:${process.env.JWT_SECRET}`).digest("hex");
}

function otpEmailHtml(code: string): string {
  return `
    <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#191817">
      <p style="letter-spacing:3px;font-size:11px;color:#9C7C46;text-transform:uppercase">Think Reality x Luxofy Properties</p>
      <h1 style="font-weight:500;font-size:24px">Your verification code</h1>
      <p style="font-size:15px;line-height:1.6">Use this code to verify your registration for the ${site.name}. It is valid for 10 minutes.</p>
      <p style="font-size:34px;letter-spacing:10px;font-weight:600;background:#F7F5F0;padding:18px 24px;text-align:center">${code}</p>
      <p style="color:#6F6A60;font-size:12px">If you did not request this, you can safely ignore this email.</p>
    </div>`;
}

/**
 * Generates a one time password and emails it. If no provider is configured
 * or delivery fails, the code is returned so the form can surface it in dev
 * mode and the flow never hard-blocks on email.
 */
export async function issueOtp(email: string): Promise<{ devCode?: string }> {
  const code = randomInt(100000, 1000000).toString();

  await prisma.otpCode.deleteMany({ where: { email, verified: false } });
  await prisma.otpCode.create({
    data: {
      email,
      codeHash: hashCode(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
  });

  const { sent } = await sendEmail({
    to: email,
    subject: `${code} is your verification code`,
    html: otpEmailHtml(code),
    text: `${code} is your verification code for the ${site.name}. Valid for 10 minutes.`,
  });

  return sent ? {} : { devCode: code };
}

export async function verifyOtp(
  email: string,
  code: string
): Promise<{ ok: boolean; error?: string }> {
  const record = await prisma.otpCode.findFirst({
    where: { email, verified: false },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { ok: false, error: "No code requested for this email. Please resend." };
  if (record.expiresAt < new Date()) return { ok: false, error: "This code has expired. Please resend." };
  if (record.attempts >= MAX_ATTEMPTS)
    return { ok: false, error: "Too many attempts. Please request a new code." };

  await prisma.otpCode.update({
    where: { id: record.id },
    data: { attempts: { increment: 1 } },
  });

  if (record.codeHash !== hashCode(code)) {
    return { ok: false, error: "Incorrect code. Please check and try again." };
  }

  await prisma.otpCode.update({ where: { id: record.id }, data: { verified: true } });
  return { ok: true };
}

/** True if the email completed OTP verification within the last 30 minutes. */
export async function isEmailVerified(email: string): Promise<boolean> {
  const record = await prisma.otpCode.findFirst({
    where: {
      email,
      verified: true,
      createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
    },
  });
  return Boolean(record);
}
