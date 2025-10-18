"use client";
import { Mail, Send, Instagram, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function ContactPage() {
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

      {/* Contact Info */}
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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <input placeholder="نام کامل" className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500" />
          <input placeholder="ایمیل" className="p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-500" />
          <textarea placeholder="پیام شما..." className="h-32 p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-fuchsia-500"></textarea>
          <button className="mt-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-semibold hover:opacity-90 transition">
            ارسال پیام
          </button>
        </form>
      </section>

      {/* Extra Text */}
      <section className="text-center max-w-3xl mx-auto text-slate-300">
        <p>
          اگر ایده‌ای داری که می‌خوای به واقعیت تبدیلش کنی، از همین حالا شروع کن.
          همکاری با من یعنی طراحی مدرن، عملکرد عالی و پشتیبانی واقعی 💪
        </p>
      </section>
      <div>
        <ParticlesBackground/>
      </div>
    </div>
  );
}
