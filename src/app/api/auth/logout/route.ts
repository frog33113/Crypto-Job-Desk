import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") || "127.0.0.1:3000";
  const proto = host.startsWith("127.0.0.1") || host.startsWith("localhost") ? "http" : "https";
  const res = NextResponse.redirect(`${proto}://${host}/`);
  res.cookies.delete("x_id");
  return res;
}
