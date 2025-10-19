// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendArgs = {
  subject: string;
  html: string;
  to?: string | string[];
};

export async function sendEmail({ subject, html, to }: SendArgs) {
  const recipient = to ?? process.env.ADMIN_EMAIL!;
  if (!recipient) throw new Error("ADMIN_EMAIL is not set");

  await resend.emails.send({
    from: "Portfolio Bot <noreply@resend.dev>", // در صورت داشتن دامنه اختصاصی، از ایمیل دامنه‌ات استفاده کن
    to: Array.isArray(recipient) ? recipient : [recipient],
    subject,
    html,
  });
}
