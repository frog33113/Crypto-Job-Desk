import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

export async function GET(req: Request) {
  const ip = getClientIP(req);
  const lim = rateLimit(ip);
  if (!lim.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const r = await pool.query(
    `SELECT j.*, u.username as employer_username, u.avatar_url as employer_avatar
     FROM jobs j
     JOIN users u ON u.id = j.employer_id
     ORDER BY j.created_at DESC
     LIMIT 50`
  );
  return NextResponse.json({ jobs: r.rows });
}
