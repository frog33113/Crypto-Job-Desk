import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return new NextResponse("Unauthorized", { status: 401 });

  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return new NextResponse("No user", { status: 400 });

  const body = await req.json();
  await pool.query(
    `INSERT INTO candidates (user_id, open_to_work, role, skills, region, remote, experience, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id) DO UPDATE SET
       open_to_work=$2, role=$3, skills=$4, region=$5, remote=$6, experience=$7, bio=$8`,
    [userId, body.open_to_work, body.role, body.skills, body.region, body.remote, body.experience, body.bio]
  );
  return NextResponse.json({ ok: true });
}
