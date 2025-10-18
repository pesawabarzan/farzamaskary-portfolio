"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Tag, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  category: "personal" | "store" | "company" | "dashboard" | "landing";
  link?: string;
};

const ALL_PROJECTS: Project[] = [
  // Ecommerce / Checkout
  {
    title: "Next.js Commerce (Shopify)",
    year: "2025",
    desc: "الگوی رسمی فروشگاه با App Router و RSC؛ مبنای عالی برای فروشگاه حرفه‌ای.",
    tags: ["Next.js", "RSC", "Tailwind", "Shopify"],
    category: "store",
    link: "https://vercel.com/new/templates/ecommerce/nextjs-commerce",
  },
  {
    title: "Stripe Checkout — پرداخت یک‌باره",
    year: "2025",
    desc: "دموی رسمی Stripe برای پرداخت تکی با Checkout و کارت‌های تست.",
    tags: ["Stripe", "Checkout", "Payments"],
    category: "store",
    link: "https://github.com/stripe-samples/checkout-one-time-payments",
  },
  {
    title: "Stripe Checkout — اشتراک",
    year: "2025",
    desc: "نمونه پرداخت اشتراکی با Checkout و Billing.",
    tags: ["Stripe", "Subscriptions", "Billing"],
    category: "store",
    link: "https://github.com/stripe-samples/checkout-single-subscription",
  },
  {
    title: "Next.js Commerce (نمونهٔ جامعه)",
    year: "2024",
    desc: "پیاده‌سازی آماده‌ی فروشگاه با App Router و پرداخت مبتنی بر Shopify.",
    tags: ["Next.js", "Tailwind", "Shopify"],
    category: "store",
    link: "https://github.com/codesandbox/next-vercel-ecommerce-sample",
  },
  {
    title: "Ecommerce + Typesense جستجوی سریع",
    year: "2024",
    desc: "فروشگاه با جستجوی برق‌آسا به کمک Typesense و Next.js.",
    tags: ["Typesense", "Search", "Next.js"],
    category: "store",
    link: "https://showcase-nextjs-typesense-ecommerce-store.vercel.app/",
  },

  // SaaS / Boilerplates
  {
    title: "SaaS Boilerplate (Auth + Multi-tenancy)",
    year: "2025",
    desc: "کیـت رایگان و متن‌باز برای شروع سریع محصول SaaS.",
    tags: ["Next.js", "Auth", "SaaS"],
    category: "company",
    link: "https://github.com/ixartz/SaaS-Boilerplate",
  },
  {
    title: "Next.js SaaS Starter (Shadcn + Postgres)",
    year: "2024",
    desc: "استارتر اوپن‌سورس با Stripe و Postgres و shadcn/ui.",
    tags: ["Next.js", "Stripe", "Postgres", "shadcn/ui"],
    category: "company",
    link: "https://pro-demo.nextjs-boilerplate.com/",
  },

  // Dashboards / Real-time
  {
    title: "Realtime با Supabase + Next.js",
    year: "2025",
    desc: "راهنمای رسمی Realtime روی Postgres برای به‌روزرسانی زنده.",
    tags: ["Supabase", "Realtime", "Next.js"],
    category: "dashboard",
    link: "https://supabase.com/docs/guides/realtime/realtime-with-nextjs",
  },
  {
    title: "Slack Clone — چت زنده (Supabase)",
    year: "2024",
    desc: "نمونهٔ فول‌استک با احراز هویت و همگام‌سازی زنده.",
    tags: ["Supabase", "Auth", "Chat"],
    category: "dashboard",
    link: "https://github.com/RiteshPuvvada/Real-Time-Chat-Supabase-NextJs",
  },

  // Landing / Marketing
  {
    title: "Stripe Checkout Sales Demo",
    year: "2025",
    desc: "دموی رسمی Checkout برای سناریوهای فروش جهانی.",
    tags: ["Stripe", "Checkout", "i18n"],
    category: "landing",
    link: "https://github.com/stripe/checkout-sales-demo",
  },
  {
    title: "Next.js Commerce (ریپوی اصلی)",
    year: "2025",
    desc: "کُد منبع رسمی Vercel Commerce (نسخه جدید App Router).",
    tags: ["Next.js", "Commerce", "RSC"],
    category: "landing",
    link: "https://github.com/vercel/commerce",
  },

  // Personal / Company sites
  {
    title: "وب‌سایت شخصی — گالری و بلاگ",
    year: "2025",
    desc: "پورتفولیو شخصی مدرن با صفحات پروژهٔ جداگانه.",
    tags: ["Next.js", "MDX", "SEO"],
    category: "personal",
    link: "https://vercel.com/new/templates/ecommerce/nextjs-commerce",
  },
  {
    title: "سایت شرکتی مینیمال",
    year: "2024",
    desc: "معرفی خدمات، تیم و تماس؛ تمرکز روی سرعت و سادگی.",
    tags: ["Tailwind", "SSR", "SEO"],
    category: "company",
    link: "https://github.com/vercel/commerce",
  },

  // Extra: آموزش‌های چت زنده (منابع معتبر آموزشی)
  {
    title: "React + Firebase Chat (آموزش FreeCodeCamp)",
    year: "2023",
    desc: "آموزش گام‌به‌گام ساخت چت Realtime با Firebase.",
    tags: ["Firebase", "Chat", "React"],
    category: "dashboard",
    link: "https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/",
  },
  {
    title: "React + Firebase Chat (راهنمای کامل)",
    year: "2025",
    desc: "آموزش تکمیلی و به‌روز برای چت Realtime در React.",
    tags: ["Firebase", "Chat"],
    category: "dashboard",
    link: "https://codezup.com/react-firebase-chat-app-guide/",
  },
];


const CATEGORIES: { key: Project["category"] | "all"; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "personal", label: "شخصی" },
  { key: "store", label: "فروشگاهی" },
  { key: "company", label: "شرکتی" },
  { key: "dashboard", label: "داشبورد" },
  { key: "landing", label: "لندینگ" },
];

const ALL_TAGS = Array.from(
  new Set(ALL_PROJECTS.flatMap((p) => p.tags))
).sort();

export default function ProjectsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CATEGORIES[number]["key"]>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const byCat = cat === "all" ? true : p.category === cat;
      const bySearch =
        q.trim().length === 0
          ? true
          : [p.title, p.desc, p.year, p.tags.join(" ")].join(" ")
            .toLowerCase()
            .includes(q.toLowerCase());
      const byTags =
        activeTags.length === 0
          ? true
          : activeTags.every((t) => p.tags.includes(t));
      return byCat && bySearch && byTags;
    });
  }, [q, cat, activeTags]);

  const toggleTag = (t: string) =>
    setActiveTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            پروژه‌ها
            <span className="text-fuchsia-400"> / </span>
            <span className="text-cyan-300">Portfolio</span>
          </h1>
          <p className="text-slate-300 mt-2">
            نمونه‌ای از کارهایی که انجام داده‌ام — از داشبورد و فروشگاهی تا
            لندینگ و سایت‌های شخصی.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در عنوان، توضیح یا تگ‌ها…"
              className="pl-3 pr-10 py-2 rounded-xl bg-black/40 border border-white/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 w-72"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="space-y-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-sm flex items-center gap-2">
            <Filter size={16} /> دسته‌بندی:
          </span>
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`px-3 py-1 rounded-full border text-sm transition ${cat === key
                  ? "bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-sm flex items-center gap-2">
            <Tag size={16} /> تگ‌ها:
          </span>
          {ALL_TAGS.map((t) => {
            const active = activeTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-3 py-1 rounded-full border text-xs transition ${active
                    ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-200"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
              >
                {t}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 hover:bg-white/10"
            >
              حذف فیلتر تگ
            </button>
          )}
        </div>
      </section>

      {/* Result count */}
      <div className="text-sm text-slate-400">
        نتایج: <span className="text-slate-200 font-medium">{filtered.length}</span> پروژه
      </div>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              key={`${p.title}-${p.year}`}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden"
            >
              {/* neon blobs */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-400/15 blur-2xl" />

              <header className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-xs text-slate-400">{p.year}</span>
              </header>

              <p className="mt-3 text-sm text-slate-300/90 min-h-[56px]">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-3 py-1 rounded-full bg-black/40 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  دسته:{" "}
                  <span className="text-slate-200">
                    {
                      CATEGORIES.find((c) => c.key === p.category)?.label ||
                      p.category
                    }
                  </span>
                </span>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    پیش‌نمایش <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center text-slate-400 py-16">
          هیچ پروژه‌ای مطابق فیلترها پیدا نشد — فیلترها را تغییر بدهید.
        </div>
      )}
    </div>
  );
}
