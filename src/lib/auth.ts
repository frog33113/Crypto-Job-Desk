import { cookies } from "next/headers";
import pool from "./db";

export async function getCurrentUser() {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return null;
  const r = await pool.query(
    "SELECT id, username, ethos_score, ethos_verified FROM users WHERE x_id = $1",
    [xId]
  );
  return r.rows[0] || null;
}
