import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import Script from "next/script";

{/* ... داخل <html> */}
<Script id="ld-person" type="application/ld+json">
{JSON.stringify({
  "@context":"https://schema.org",
  "@type":"Person",
  name:"فرزام عسکری",
  jobTitle:"Front-end Developer",
  url:"https://farzamaskary.ir",
  sameAs:[
    "https://github.com/FarzamAskary",
    "https://www.linkedin.com/in/FarzamAskary"
  ]
})}
</Script>

export const metadata = {
  metadataBase: new URL("https://farzamaskary.ir"),
  title: {
    default: "فرزام عسکری | طراح و توسعه‌دهنده وب",
    template: "%s — فرزام عسکری",
  },
  description:
    "فرزام عسکری، طراح و توسعه‌دهنده وب. طراحی سایت حرفه‌ای: لندینگ، فروشگاهی، شرکتی، داشبورد. Next.js, React, Tailwind, SEO.",
  keywords: [
    "فرزام عسکری","فرزام","طراح سایت","توسعه دهنده وب","Next.js","React",
    "طراحی سایت در تهران","ساخت فروشگاه اینترنتی","طراحی لندینگ","SEO"
  ],
  alternates: { canonical: "https://farzamaskary.ir" },
  openGraph: {
    type: "website",
    url: "https://farzamaskary.ir",
    title: "فرزام عسکری | طراح و توسعه‌دهنده وب",
    description:
      "طراحی وب‌سایت‌های سریع و مدرن با Next.js — فروشگاهی، شرکتی، شخصی و داشبورد.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "fa_IR",
    siteName: "Farzam Askary",
  },
  twitter: {
    card: "summary_large_image",
    title: "فرزام عسکری | طراح و توسعه‌دهنده وب",
    description:
      "طراحی وب‌سایت‌های سریع و مدرن با Next.js — فروشگاهی، شرکتی، شخصی و داشبورد.",
    images: ["/og.jpg"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">

      <body className="min-h-screen antialiased bg-[#0b0b14] text-slate-100 relative overflow-x-hidden">
        {/* 🔮 بک‌گراند نئونی + ذرات */}
        <div>
          <ParticlesBackground />
        </div>
        {/* نئون گرادیانت ثابت در بک */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full blur-3xl bg-fuchsia-600/20" />
          <div className="absolute -bottom-24 -right-16 h-[28rem] w-[28rem] rounded-full blur-3xl bg-cyan-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_70%)]" />
        </div>

        {/* محتوای اصلی */}
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
