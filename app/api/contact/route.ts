import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const runtime = "nodejs"; // ✅ مهم

type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "new" | "review" | "done";
};

const dataDir = path.join(process.cwd(), "data");
const file = path.join(dataDir, "contacts.json");

async function ensureFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(file, "utf8");
  } catch {
    await writeFile(file, "[]", "utf8");
  }
}

async function load(): Promise<Msg[]> {
  await ensureFile();
  try { return JSON.parse(await readFile(file, "utf8") || "[]"); }
  catch { return []; }
}
async function save(rows: Msg[]) {
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
    const row: Msg = {
      id: nanoid(),
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    const rows = await load();
    rows.unshift(row);
    await save(rows);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("CONTACT_POST_ERR:", err);
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
  } catch {
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
