import nodemailer, { type Transporter } from "nodemailer";

/**
 * Email over plain SMTP via nodemailer, tuned for a free Gmail account
 * (smtp.gmail.com + a 16 character app password from
 * https://myaccount.google.com/apppasswords). Any other SMTP provider
 * works with the same four env vars.
 *
 * Without SMTP credentials, or if delivery fails, messages print to the
 * server console and `sent: false` comes back — callers decide what that
 * means for the user.
 */

let cached: Transporter | null = null;

export function emailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transporter(): Transporter {
  if (!cached) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    cached = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Gmail rate-limits bursts; pooling keeps concurrent sends polite
      pool: true,
      maxConnections: 3,
    });
  }
  return cached;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ sent: boolean }> {
  if (emailConfigured()) {
    try {
      await transporter().sendMail({
        from: process.env.EMAIL_FROM ?? process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      return { sent: true };
    } catch (error) {
      console.error("[email] delivery failed, falling back to dev mode:", error);
    }
  }

  console.info(`[dev-email] to ${options.to}: ${options.subject}`);
  if (options.text) console.info(`[dev-email] ${options.text}`);
  return { sent: false };
}
