import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Farzam Askary — Portfolio",
  description: "Portfolio نئونی فرزام عسکری | طراح و توسعه‌دهنده‌ی وب از بوکان",
  keywords: ["Farzam Askary", "Portfolio", "Web Designer", "Developer", "Iran", "نئون", "بوکان"],
  metadataBase: new URL("https://farzamaskary.ir"),
  openGraph: {
    title: "Farzam Askary — Portfolio",
    description: "طراحی و توسعه وب با استایل نئونی و تجربه کاربری مدرن",
    url: "https://farzamaskary.ir",
    siteName: "Farzam Askary",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "fa_IR",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.svg" }],
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
        <ParticlesBackground />

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
