import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const runtime = "nodejs"; // ✅ مهم

type Order = {
  id: string;
  name: string;
  phone: string;
  budget?: string;
  service: string;
  details: string;
  createdAt: string;
  status: "new" | "review" | "done";
};

const dataDir = path.join(process.cwd(), "data");
const file = path.join(dataDir, "orders.json");

async function ensureFile() {
  await mkdir(dataDir, { recursive: true }); // ✅ اگر نبود بساز
  try {
    await readFile(file, "utf8");
  } catch {
    await writeFile(file, "[]", "utf8");
  }
}

async function load(): Promise<Order[]> {
  await ensureFile();
  try { return JSON.parse(await readFile(file, "utf8") || "[]"); }
  catch { return []; }
}
async function save(rows: Order[]) {
  await ensureFile();
  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
}

export async function GET() {
  const rows = await load();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const row: Order = {
      id: nanoid(),
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      budget: String(fd.get("budget") || ""),
      service: String(fd.get("service") || ""),
      details: String(fd.get("details") || ""),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    const rows = await load();
    rows.unshift(row);
    await save(rows);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("ORDER_POST_ERR:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const rows = await load();
    const i = rows.findIndex(r => r.id === id);
    if (i === -1) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    rows[i].status = status;
    await save(rows);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const rows = await load();
    const next = rows.filter(r => r.id !== id);
    await save(next);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
