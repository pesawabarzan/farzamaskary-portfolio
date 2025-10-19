// app/api/order/route.ts
import { NextResponse } from "next/server";
import { addOrder } from "@/lib/store";
// (اختیاری) ایمیل فقط اگر کلید هست:
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO = process.env.CONTACT_EMAIL || "farzam1askary@gmail.com";

export const runtime = "nodejs"; // برای fs fallback در dev

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const budget = (fd.get("budget") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const details = (fd.get("details") || "").toString().trim();

    if (!name || !phone || !service || !details) {
      return NextResponse.json({ ok: false, error: "اطلاعات ناقص است." }, { status: 400 });
    }

    const rec = await addOrder({ name, phone, budget, service, details });

    // ایمیل فقط اگر RESEND_API_KEY ست شده
    if (resend) {
      await resend.emails.send({
        from: "noreply@your-domain.com",
        to: TO,
        subject: "سفارش جدید",
        text: `نام: ${name}\nتلفن: ${phone}\nبودجه: ${budget}\nسرویس: ${service}\n\n${details}`,
      });
    }

    return NextResponse.json({ ok: true, id: rec.id });
  } catch (err) {
    console.error("ORDER_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
