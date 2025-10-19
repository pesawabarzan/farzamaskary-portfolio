import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/kv";

function auth(req: Request) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_KEY;
}

export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);
  const rows = await getSubmissions(offset, limit);
  return NextResponse.json({ ok: true, rows });
}
