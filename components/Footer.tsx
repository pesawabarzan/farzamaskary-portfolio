import { Github, Instagram, Linkedin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-slate-400 border-t border-white/10 bg-gradient-to-t from-black/40 to-transparent">
      <div className="flex justify-center gap-6 mb-6">
        <a href="https://github.com/FarzamAskary" target="_blank" className="hover:text-fuchsia-400 transition"><Github /></a>
        <a href="https://t.me/FarzamAskary" target="_blank" className="hover:text-cyan-400 transition"><Send /></a>
        <a href="https://instagram.com/FarzamAskary" target="_blank" className="hover:text-pink-400 transition"><Instagram /></a>
        <a href="https://linkedin.com/in/FarzamAskary" target="_blank" className="hover:text-blue-400 transition"><Linkedin /></a>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="text-fuchsia-400">Farzam Askary</span> — ساخته‌شده با عشق  💜
      </p>
    </footer>
  );
}
