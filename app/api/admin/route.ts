import { NextResponse } from "next/server";
import { listAll } from "@/lib/store";

export async function GET() {
  // اگر امنیت خواستی، اینجا header یا query token چک کن
  const db = await listAll();
  return NextResponse.json({ ok: true, ...db });
}
