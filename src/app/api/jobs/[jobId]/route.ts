import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobId } = await params;
  const j = await pool.query("SELECT employer_id FROM jobs WHERE id = $1", [jobId]);
  const job = j.rows[0];

  if (!job || job.employer_id !== userId) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  await pool.query("DELETE FROM jobs WHERE id = $1", [jobId]);
  return NextResponse.json({ ok: true });
}
