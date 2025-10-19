"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Rocket } from "lucide-react";
import NeonCard from "@/components/NeonCard";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = e.currentTarget; // ✅ فرم را قبل از await نگه‌دار
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/order", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({} as any));

      if (res.ok && (data as any)?.ok) {
        setMsg("سفارش با موفقیت ثبت شد ✅");
        form.reset(); // ✅ امن
      } else {
        setMsg((data as any)?.error || `ثبت سفارش ناموفق بود. دوباره تلاش کنید.`);
      }
    } catch (err) {
      console.error(err);
      setMsg("ثبت سفارش ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-fuchsia-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ثبت سفارش طراحی سایت
        </motion.h1>
        <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
          با پر کردن فرم زیر، درخواست طراحی سایت خود را ثبت کنید. من پس از بررسی جزئیات، با شما تماس می‌گیرم تا درباره‌ی نیازهای پروژه‌تان صحبت کنیم.
        </p>
      </section>

      {/* Steps */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { icon: CheckCircle, title: "درخواست", desc: "فرم را پر کنید و جزئیات پروژه خود را بفرستید." },
          { icon: Zap, title: "بررسی و مشاوره", desc: "در سریع‌ترین زمان ممکن بررسی و با شما تماس می‌گیرم." },
          { icon: Rocket, title: "شروع پروژه", desc: "بعد از تایید، طراحی و توسعه آغاز می‌شود." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Icon size={32} className="mx-auto text-cyan-400 mb-2" />
            <h3 className="font-semibold text-fuchsia-400">{title}</h3>
            <p className="text-sm text-slate-300 mt-1">{desc}</p>
          </div>
        ))}
      </section>

      {/* Form */}
      <section>
        <NeonCard>
          <h2 className="text-2xl font-bold mb-4 text-cyan-300 text-center">فرم ثبت سفارش</h2>

          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="نام کامل"
              required
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
            />
            <input
              name="budget"
              placeholder="بودجه (اختیاری)"
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
            />
            <input
              name="phone"
              placeholder="شماره تماس"
              required
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
            />
            <select
              name="service"
              required
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-500"
              defaultValue=""
            >
              <option value="" disabled>نوع پروژه</option>
              <option value="personal">سایت شخصی</option>
              <option value="store">فروشگاهی</option>
              <option value="company">شرکتی</option>
              <option value="landing">لندینگ</option>
              <option value="dashboard">داشبورد</option>
            </select>

            <textarea
              name="details"
              placeholder="توضیحات پروژه"
              required
              className="md:col-span-2 h-32 p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "در حال ارسال..." : "ارسال سفارش"}
            </button>

            {msg && (
              <p className="md:col-span-2 text-sm text-slate-200" aria-live="polite">
                {msg}
              </p>
            )}
          </form>
        </NeonCard>
      </section>

      {/* Why Me */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-fuchsia-400 mb-6">چرا با من کار کنید؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "پشتیبانی همیشگی", desc: "بعد از تحویل پروژه، همیشه در دسترس هستم." },
            { title: "طراحی سریع و دقیق", desc: "در کوتاه‌ترین زمان با بهترین کیفیت." },
            { title: "خلاقیت و تمیزی", desc: "کد تمیز و طراحی منحصربه‌فرد برای هر پروژه." },
          ].map((s) => (
            <div key={s.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h3 className="font-semibold text-cyan-300">{s.title}</h3>
              <p className="text-slate-300 text-sm mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ParticlesBackground />
    </div>
  );
}
