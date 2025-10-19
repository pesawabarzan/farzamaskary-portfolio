import { kv } from "@vercel/kv";

export type SubmissionBase = {
  id: string;
  type: "contact" | "order";
  name: string;
  email: string;
  message?: string;
  details?: Record<string, any>;
  createdAt: string;        // ISO string
  ip?: string | null;
  ua?: string | null;
};

const LIST_KEY = "submissions:list";     // لیست IDها برای صفحه ادمین

export async function saveSubmission(data: SubmissionBase) {
  // ذخیره رکورد
  await kv.hset(`submission:${data.id}`, data as any);
  // ایندکس برای لیست
  await kv.lpush(LIST_KEY, data.id);
  // نگه داریم حداکثر 1000 تا (دلخواه)
  await kv.ltrim(LIST_KEY, 0, 999);
}

export async function getSubmissions(offset = 0, limit = 50) {
  const ids = await kv.lrange(LIST_KEY, offset, offset + limit - 1);
  const pipeline = ids.map((id) => kv.hgetall<SubmissionBase>(`submission:${id}`));
  const rows = await Promise.all(pipeline);
  // حذف null ها و بر اساس زمان مرتب
  return rows.filter(Boolean).sort((a, b) => (b!.createdAt > a!.createdAt ? 1 : -1)) as SubmissionBase[];
}

export async function getStats() {
  const rows = await getSubmissions(0, 1000);
  const total = rows.length;
  const orders = rows.filter(r => r.type === "order").length;
  const contacts = total - orders;
  return { total, orders, contacts };
}
