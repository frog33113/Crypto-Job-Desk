import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export default async function CheckProfile() {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) redirect("/");

  const u = await pool.query("SELECT id, username FROM users WHERE x_id = $1", [xId]);
  const user = u.rows[0];
  if (!user) redirect("/");

  const c = await pool.query("SELECT role FROM candidates WHERE user_id = $1", [user.id]);
  const hasProfile = c.rows[0]?.role;

  if (hasProfile) {
    redirect("/u/" + encodeURIComponent(user.username));
  } else {
    redirect("/dashboard");
  }
}
