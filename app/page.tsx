"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";


export default function Home() {
  return (
    <div className="space-y-24 text-slate-100">
      {/* Hero */}
      <section className="mt-20">
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              {/* neon glow */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-400 blur-2xl opacity-50" />
              <img
                src="/my.png"            // <<-- عکس خودت را با این نام داخل public بذار
                alt="Farzam Askary"
                className="relative w-44 h-44 md:w-60 md:h-60 rounded-full object-cover border-4 border-white/20 shadow-[0_0_40px_-10px_rgba(217,70,239,0.55)]"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-center md:text-right space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="text-fuchsia-500">Farzam</span>{" "}
              <span className="text-cyan-400">Askary</span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto md:mx-0">
              طراح و توسعه‌دهنده‌ی وب از بوکان — عاشق ساخت تجربه‌های نئونی، تمیز و سریع.
              پایه ۱۲ شبکه و نرم‌افزار؛ مسلط به Python, JavaScript, PHP, WordPress و Lua.
            </p>
            <div className="flex justify-center md:justify-start gap-3 pt-2">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg hover:scale-105 transition"
              >
                دیدن پروژه‌ها
              </Link>
              <Link
                href="/order"
                className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition"
              >
                ثبت سفارش
              </Link>
            </div>

            {/* quick badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-3">
              {["UI/UX Modern", "Responsive", "SEO Ready", "Fast Delivery"].map((b) => (
                <span key={b} className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-fuchsia-400">درباره من</h2>
        <p className="text-slate-300 max-w-3xl mx-auto">
          من فرزام عسکری هستم؛ از طراحی مینیمال تا سیستم‌های حرفه‌ای فروشگاهی و داشبورد، هدفم
          ساخت محصولاتی با تجربه کاربری بی‌نقص، سرعت بالا و هویت بصری متفاوت است.
          روی کیفیت کد، مستندسازی و پشتیبانی واقعی حساس‌ام.
        </p>
      </section>

      {/* Skills */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8">مهارت‌ها</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {["Python","JavaScript","PHP","WordPress","Lua","Next.js","TailwindCSS","UI/UX"].map((skill) => (
            <div
              key={skill}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-fuchsia-400 mb-8">خدمات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "طراحی سایت شخصی", desc: "وب‌سایت اختصاصی برای معرفی شما و برندتان با هویت بصری قوی." },
            { title: "فروشگاه اینترنتی", desc: "تجربه خرید سریع، امن و بهینه برای موبایل و دسکتاپ." },
            { title: "مشاوره طراحی و سئو", desc: "بهبود تجربه کاربر، سرعت و رتبه گوگل با بهترین روش‌ها." },
          ].map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <h3 className="font-semibold text-lg mb-2 text-cyan-300">{s.title}</h3>
              <p className="text-slate-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="text-2xl font-bold">برای شروع آماده‌ای؟</h3>
          <p className="text-slate-300 mt-2">
            اگر ایده‌ای داری که می‌خوای به واقعیت تبدیلش کنی، از همین حالا شروع کن.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/order"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg hover:scale-105 transition"
            >
              ثبت سفارش
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition"
            >
              تماس با من
            </Link>
          </div>
        </div>
      </section>
      <div>
        <ParticlesBackground/>
      </div>
    </div>
  );
}
