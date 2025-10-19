import { NextResponse } from "next/server";
import { getStats } from "@/lib/kv";

function auth(req: Request) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_KEY;
}

export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const stats = await getStats();
  return NextResponse.json({ ok: true, stats });
}
