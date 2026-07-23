import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function GET() {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return NextResponse.json({ user: null });
  const r = await pool.query(
    "SELECT username, avatar_url FROM users WHERE x_id = $1",
    [xId]
  );
  const row = r.rows[0];
  return NextResponse.json({
    user: row ? { username: row.username, avatar_url: row.avatar_url } : null,
  });
}
