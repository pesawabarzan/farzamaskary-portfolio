// lib/store.ts
import { promises as fs } from "fs";
import path from "path";

type Order = {
  id: string;
  name: string;
  phone: string;
  budget?: string;
  service: string;
  details: string;
  status: "new" | "reviewing" | "done";
  createdAt: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "reviewing" | "done";
  createdAt: string;
};

const useKV = !!process.env.KV_REST_API_URL; // روی Vercel true میشه

// --- KV helpers
let kv: any = null;
if (useKV) {
  // @vercel/kv داخل package.json اضافه شده
  // "dependencies": { "@vercel/kv": "latest", ... }
  // اگر نداری: npm i @vercel/kv
  const mod = await import("@vercel/kv");
  kv = mod.kv;
}

// --- File helpers (fallback برای dev)
const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

async function ensureFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => {});
  for (const f of [ORDERS_FILE, CONTACTS_FILE]) {
    try { await fs.access(f); } catch { await fs.writeFile(f, "[]"); }
  }
}

function id() {
  // بدون crypto برای edge سازگاری
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ---------- Orders ----------
export async function addOrder(input: Omit<Order, "id" | "createdAt" | "status">) {
  const rec: Order = { id: id(), createdAt: new Date().toISOString(), status: "new", ...input };

  if (useKV) {
    // لیست «orders»
    await kv.lpush("orders", JSON.stringify(rec));
  } else {
    await ensureFiles();
    const buf = await fs.readFile(ORDERS_FILE, "utf8");
    const all: Order[] = JSON.parse(buf || "[]");
    all.unshift(rec);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(all, null, 2));
  }
  return rec;
}

export async function listOrders(): Promise<Order[]> {
  if (useKV) {
    const raw: string[] = await kv.lrange("orders", 0, -1);
    return raw.map((s) => JSON.parse(s)).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } else {
    await ensureFiles();
    const buf = await fs.readFile(ORDERS_FILE, "utf8");
    return JSON.parse(buf || "[]");
  }
}

export async function setOrderStatus(id: string, status: Order["status"]) {
  if (useKV) {
    const raw: string[] = await kv.lrange("orders", 0, -1);
    const items = raw.map((s) => JSON.parse(s));
    const idx = items.findIndex((x: Order) => x.id === id);
    if (idx >= 0) {
      items[idx].status = status;
      // بازنویسی کل لیست
      await kv.del("orders");
      if (items.length) await kv.rpush("orders", ...items.map((x: Order) => JSON.stringify(x)));
    }
    return;
  } else {
    await ensureFiles();
    const all: Order[] = JSON.parse(await fs.readFile(ORDERS_FILE, "utf8") || "[]");
    const idx = all.findIndex((x) => x.id === id);
    if (idx >= 0) {
      all[idx].status = status;
      await fs.writeFile(ORDERS_FILE, JSON.stringify(all, null, 2));
    }
  }
}

// ---------- Contacts ----------
export async function addContact(input: Omit<Contact, "id" | "createdAt" | "status">) {
  const rec: Contact = { id: id(), createdAt: new Date().toISOString(), status: "new", ...input };

  if (useKV) {
    await kv.lpush("contacts", JSON.stringify(rec));
  } else {
    await ensureFiles();
    const all: Contact[] = JSON.parse(await fs.readFile(CONTACTS_FILE, "utf8") || "[]");
    all.unshift(rec);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(all, null, 2));
  }
  return rec;
}

export async function listContacts(): Promise<Contact[]> {
  if (useKV) {
    const raw: string[] = await kv.lrange("contacts", 0, -1);
    return raw.map((s) => JSON.parse(s)).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } else {
    await ensureFiles();
    const buf = await fs.readFile(CONTACTS_FILE, "utf8");
    return JSON.parse(buf || "[]");
  }
}

export async function setContactStatus(id: string, status: Contact["status"]) {
  if (useKV) {
    const raw: string[] = await kv.lrange("contacts", 0, -1);
    const items = raw.map((s) => JSON.parse(s));
    const idx = items.findIndex((x: Contact) => x.id === id);
    if (idx >= 0) {
      items[idx].status = status;
      await kv.del("contacts");
      if (items.length) await kv.rpush("contacts", ...items.map((x: Contact) => JSON.stringify(x)));
    }
    return;
  } else {
    await ensureFiles();
    const all: Contact[] = JSON.parse(await fs.readFile(CONTACTS_FILE, "utf8") || "[]");
    const idx = all.findIndex((x) => x.id === id);
    if (idx >= 0) {
      all[idx].status = status;
      await fs.writeFile(CONTACTS_FILE, JSON.stringify(all, null, 2));
    }
  }
}
