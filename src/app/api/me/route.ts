import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function GET() {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return NextResponse.json({ user: null });
  const r = await pool.query(
    "SELECT username FROM users WHERE x_id = $1",
    [xId]
  );
  const username = r.rows[0]?.username || null;
  return NextResponse.json({ user: username ? { username } : null });
}
