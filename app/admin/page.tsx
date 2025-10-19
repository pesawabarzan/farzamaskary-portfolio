"use client";
import { useEffect, useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";

type Order = {
  id: string; name: string; phone: string; budget?: string;
  service: string; details: string; createdAt: string;
  status: "new" | "review" | "done";
};
type Msg = {
  id: string; name: string; email: string; message: string;
  createdAt: string; status: "new" | "review" | "done";
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const [o, m] = await Promise.all([
      fetch("/api/order").then(r=>r.json()),
      fetch("/api/contact").then(r=>r.json())
    ]);
    setOrders(o); setMsgs(m); setLoading(false);
  }
  useEffect(() => { refresh(); }, []);

  async function setStatus(kind: "order"|"msg", id: string, status: "review"|"done") {
    await fetch(kind==="order" ? "/api/order" : "/api/contact", {
      method:"PATCH", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ id, status }),
    });
    refresh();
  }
  async function remove(kind: "order"|"msg", id: string) {
    await fetch((kind==="order"?"/api/order":"/api/contact")+`?id=${id}`, { method:"DELETE" });
    refresh();
  }

  const statusChip = (s: Order["status"]) => ({
    new: "bg-yellow-500/20 text-yellow-300",
    review: "bg-blue-500/20 text-blue-300",
    done: "bg-emerald-500/20 text-emerald-300",
  }[s]);

  return (
    <div className="relative">
      <ParticlesBackground /> {/* بک‌گراند متحرک */}

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-10">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">داشبورد ادمین</h1>
          <button onClick={refresh} className="px-3 py-1 rounded-lg bg-white/10 border border-white/10">بروزرسانی</button>
        </header>

        {loading ? <p>در حال بارگذاری…</p> : (
          <>
            {/* Orders */}
            <section>
              <h2 className="text-2xl font-bold mb-4">سفارش‌ها ({orders.length})</h2>
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div className="space-y-1">
                        <div className="text-slate-200">{o.name} — {o.phone}</div>
                        <div className="text-sm text-slate-400">
                          نوع: {o.service} {o.budget ? `— بودجه: ${o.budget}` : ""} — {new Date(o.createdAt).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-300">{o.details}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusChip(o.status)}`}>
                          {o.status === "new" ? "جدید" : o.status === "review" ? "درحال بررسی" : "تکمیل‌شده"}
                        </span>
                        <button onClick={()=>setStatus("order", o.id, "review")} className="px-2 py-1 text-xs rounded bg-blue-500/20 border border-blue-500/30">بررسی</button>
                        <button onClick={()=>setStatus("order", o.id, "done")} className="px-2 py-1 text-xs rounded bg-emerald-500/20 border border-emerald-500/30">تکمیل شد</button>
                        <button onClick={()=>remove("order", o.id)} className="px-2 py-1 text-xs rounded bg-red-500/20 border border-red-500/30">حذف</button>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length===0 && <p className="text-slate-400">سفارشی موجود نیست.</p>}
              </div>
            </section>

            {/* Messages */}
            <section>
              <h2 className="text-2xl font-bold mb-4 mt-10">پیام‌ها ({msgs.length})</h2>
              <div className="space-y-3">
                {msgs.map(m => (
                  <div key={m.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div className="space-y-1">
                        <div className="text-slate-200">{m.name} — {m.email}</div>
                        <div className="text-sm text-slate-400">{new Date(m.createdAt).toLocaleString()}</div>
                        <div className="text-sm text-slate-300">{m.message}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusChip(m.status)}`}>
                          {m.status === "new" ? "جدید" : m.status === "review" ? "درحال بررسی" : "تکمیل‌شده"}
                        </span>
                        <button onClick={()=>setStatus("msg", m.id, "review")} className="px-2 py-1 text-xs rounded bg-blue-500/20 border border-blue-500/30">بررسی</button>
                        <button onClick={()=>setStatus("msg", m.id, "done")} className="px-2 py-1 text-xs rounded bg-emerald-500/20 border border-emerald-500/30">تکمیل شد</button>
                        <button onClick={()=>remove("msg", m.id)} className="px-2 py-1 text-xs rounded bg-red-500/20 border border-red-500/30">حذف</button>
                      </div>
                    </div>
                  </div>
                ))}
                {msgs.length===0 && <p className="text-slate-400">پیامی موجود نیست.</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
