import ParticlesBackground from "@/components/ParticlesBackground";

"use client";
import { useMemo, useState } from "react";
import NeonCard from "@/components/NeonCard";

type Order = { id:string; name:string; email:string; type:string; status:"جدید"|"در حال بررسی"|"تکمیل شده"; date:string };

const seed: Order[] = [
  { id:"ORD-1001", name:"Ali M", email:"ali@example.com", type:"فروشگاه", status:"جدید", date:"2025-10-01" },
  { id:"ORD-1002", name:"Sara K", email:"sara@example.com", type:"سایت شخصی", status:"در حال بررسی", date:"2025-10-05" },
  { id:"ORD-1003", name:"Reza P", email:"reza@example.com", type:"شرکتی", status:"تکمیل شده", date:"2025-10-10" },
];

export default function AdminPage(){
  const [orders, setOrders] = useState<Order[]>(seed);
  const [q,setQ] = useState("");

  const filtered = useMemo(()=>orders.filter(o =>
    o.id.includes(q) || o.name.includes(q) || o.email.includes(q) || o.type.includes(q) || o.status.includes(q)
  ),[orders,q]);

  const updateStatus = (id:string, status:Order["status"]) => {
    setOrders(prev => prev.map(o => o.id===id? {...o, status}: o));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">پنل ادمین</h2>
      <p className="text-slate-400 mt-1 text-sm">نسخه‌ی نمایشی – بدون بک‌اند. مدیریت سفارش‌ها با دادهٔ نمونه.</p>

      <NeonCard className="mt-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input placeholder="جستجو بر اساس نام/ایمیل/شناسه..." value={q} onChange={e=>setQ(e.target.value)} className="p-3 rounded-xl glass placeholder:text-slate-400 w-full md:w-80"/>
          <div className="text-sm text-slate-400">کل: {filtered.length}</div>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-400">
              <tr className="text-left"><th className="py-2">شناسه</th><th>نام</th><th>ایمیل</th><th>نوع</th><th>وضعیت</th><th>تاریخ</th><th>اقدام</th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-t border-white/10">
                  <td className="py-2">{o.id}</td>
                  <td>{o.name}</td>
                  <td>{o.email}</td>
                  <td>{o.type}</td>
                  <td>{o.status}</td>
                  <td>{o.date}</td>
                  <td className="space-x-2 rtl:space-x-reverse">
                    <button onClick={()=>updateStatus(o.id,"جدید")} className="px-3 py-1 rounded-lg glass">جدید</button>
                    <button onClick={()=>updateStatus(o.id,"در حال بررسی")} className="px-3 py-1 rounded-lg glass">در حال بررسی</button>
                    <button onClick={()=>updateStatus(o.id,"تکمیل شده")} className="px-3 py-1 rounded-lg glass">تکمیل</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  )
}