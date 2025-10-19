// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const u = process.env.ADMIN_USER;
  const p = process.env.ADMIN_PASS;
  if (!u || !p) return NextResponse.next(); // اگر Credentials تنظیم نشده، صفحه آزاد است

  const auth = req.headers.get("authorization") || "";
  const expected = "Basic " + Buffer.from(`${u}:${p}`).toString("base64");
  if (auth !== expected) {
    const res = new NextResponse("Auth required", { status: 401 });
    res.headers.set("WWW-Authenticate", 'Basic realm="Admin"');
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
