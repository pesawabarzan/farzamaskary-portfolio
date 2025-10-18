"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = (
    <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm">
      <li><Link href="/" className="px-3 py-2 rounded-xl glass hover:bg-white/10">خانه</Link></li>
      <li><Link href="/projects" className="px-3 py-2 rounded-xl glass hover:bg-white/10">پروژه‌ها</Link></li>
      <li><Link href="/order" className="px-3 py-2 rounded-xl glass hover:bg-white/10">سفارش</Link></li>
      <li><Link href="/contact" className="px-3 py-2 rounded-xl glass hover:bg-white/10">تماس</Link></li>
      <li><Link href="/admin" className="px-3 py-2 rounded-xl glass hover:bg-white/10">ادمین</Link></li>
    </ul>
  );
  return (
    <header className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
      <Link href="/" className="font-black tracking-tight text-xl">
        فرزام <span className="text-neonPink">/</span> <span className="text-neonCyan">Farzam</span>
      </Link>
      <nav className="hidden md:block">{nav}</nav>
      <button className="md:hidden glass p-2 rounded-xl" onClick={() => setOpen(true)}><Menu size={18}/></button>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute right-4 top-4 p-2 glass rounded-xl" onClick={(e)=>{e.stopPropagation();setOpen(false)}}><X/></div>
          <div className="absolute right-0 top-0 h-full w-64 p-6 glass">{nav}</div>
        </div>
      )}
    </header>
  );
}