// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { addContact } from "@/lib/store";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO = process.env.CONTACT_EMAIL || "farzam1askary@gmail.com";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "اطلاعات ناقص است." }, { status: 400 });
    }

    const rec = await addContact({ name, email, message });

    if (resend) {
      await resend.emails.send({
        from: "noreply@your-domain.com",
        to: TO,
        subject: "پیام جدید از فرم تماس",
        text: `نام: ${name}\nایمیل: ${email}\n\n${message}`,
      });
    }

    return NextResponse.json({ ok: true, id: rec.id });
  } catch (err) {
    console.error("CONTACT_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
