import { NextResponse } from "next/server";

const BASE = process.env.APP_URL || "http://127.0.0.1:3000";

export async function GET() {
  const res = NextResponse.redirect(BASE + "/");
  res.cookies.delete("x_id");
  return res;
}
