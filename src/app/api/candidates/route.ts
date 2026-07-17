import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const r = await pool.query(
    `SELECT u.username, u.avatar_url, u.ethos_score, u.ethos_verified,
            c.role, c.skills, c.region, c.remote, c.experience, c.bio
     FROM candidates c
     JOIN users u ON u.id = c.user_id
     WHERE c.open_to_work = TRUE
       AND ($1 = '' OR c.role ILIKE '%' || $1 || '%' OR c.skills ILIKE '%' || $1 || '%')
     ORDER BY COALESCE(u.ethos_score, 0) DESC
     LIMIT 100`,
    [q]
  );
  return NextResponse.json(r.rows);
}
