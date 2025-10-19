"use client";
import { useState } from "react";
import { Mail, Send, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = e.currentTarget; // ✅ قبل از await نگه‌دار
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({} as any));

      if (res.ok && (data as any)?.ok) {
        setMsg("پیام شما با موفقیت ارسال شد ✅");
        form.reset(); // ✅ امن
      } else {
        setMsg((data as any)?.error || "ارسال ناموفق بود. لطفاً دوباره تلاش کنید.");
      }
    } catch {
      setMsg("خطای شبکه رخ داد. کمی بعد دوباره امتحان کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          تماس با من
        </motion.h1>
        <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
          هر سوال، پروژه یا همکاری‌ای داری، خوشحال می‌شم دربارش صحبت کنیم. معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دم.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="text-fuchsia-400" />
            <span>farzam1askary@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Send className="text-cyan-400" />
            <span>t.me/FarzamAskary</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Instagram className="text-pink-400" />
            <span>instagram/FarzamAskary</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Github className="text-slate-300" />
            <span>github.com/FarzamAskary</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Linkedin className="text-blue-400" />
            <span>linkedin.com/in/FarzamAskary</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <input
            name="name"
            placeholder="نام کامل"
            required
            className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
          />
          <input
            name="email"
            type="email"
            placeholder="ایمیل"
            required
            className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-500"
          />
          <textarea
            name="message"
            placeholder="پیام شما..."
            required
            className="h-32 p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
          {msg && (
            <p className="text-sm text-slate-200" aria-live="polite">
              {msg}
            </p>
          )}
        </form>
      </section>

      <section className="text-center max-w-3xl mx-auto text-slate-300">
        <p>
          اگر ایده‌ای داری که می‌خوای به واقعیت تبدیلش کنی، از همین حالا شروع کن. همکاری با من یعنی طراحی مدرن،
          عملکرد عالی و پشتیبانی واقعی.
        </p>
      </section>

      <ParticlesBackground />
    </div>
  );
}
