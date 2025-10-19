import { promises as fs } from "fs";
import path from "path";

type Contact = {
  type: "contact";
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type Order = {
  type: "order";
  name: string;
  budget?: string;
  phone: string;
  service: string;
  details: string;
  createdAt: string;
};

type DB = { contacts: Contact[]; orders: Order[] };

// انتخاب فایل ذخیره‌سازی به‌صورت Cross-platform
const defaultFile =
  process.env.NODE_ENV === "production"
    ? path.join("/tmp", "submissions.json") // روی Vercel/لینوکس
    : path.join(process.cwd(), ".data", "submissions.json"); // روی ویندوز/لوکال

const FILE = process.env.STORE_FILE || defaultFile;

async function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function readDB(): Promise<DB> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as DB;
  } catch {
    return { contacts: [], orders: [] };
  }
}

async function writeDB(db: DB) {
  await ensureDirExists(FILE);
  await fs.writeFile(FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function addContact(c: Omit<Contact, "type" | "createdAt">) {
  const db = await readDB();
  db.contacts.unshift({ type: "contact", createdAt: new Date().toISOString(), ...c });
  await writeDB(db);
}

export async function addOrder(o: Omit<Order, "type" | "createdAt">) {
  const db = await readDB();
  db.orders.unshift({ type: "order", createdAt: new Date().toISOString(), ...o });
  await writeDB(db);
}

export async function listAll() {
  return readDB();
}
