import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

async function save(formData: FormData) {
  "use server";
  console.log("SAVE called, x_id cookie:", (await cookies()).get("x_id")?.value);
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) {
    console.log("SAVE aborted: no x_id");
    return;
  }
  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  console.log("SAVE userId:", userId);
  if (!userId) return;

  const open = formData.get("open_to_work") === "on";
  const remote = formData.get("remote") === "on";
  await pool.query(
    `INSERT INTO candidates (user_id, open_to_work, role, skills, region, remote, experience, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id) DO UPDATE SET
       open_to_work=$2, role=$3, skills=$4, region=$5, remote=$6, experience=$7, bio=$8`,
    [userId, open, formData.get("role"), formData.get("skills"),
     formData.get("region"), remote, formData.get("experience"), formData.get("bio")]
  );
  console.log("SAVE done");
  redirect("/dashboard");
}

export default async function Dashboard() {
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return <p style={{ textAlign: "center", marginTop: 80 }}>Not authorized. <a href="/">Sign in</a></p>;

  const u = await pool.query("SELECT * FROM users WHERE x_id = $1", [xId]);
  const user = u.rows[0];
  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [user.id]);
  const profile = c.rows[0] || {};

  const ethos = user.ethos_score != null
    ? `Ethos score: ${user.ethos_score} ${user.ethos_verified === "VERIFIED" ? "(verified human)" : ""}`
    : "Ethos score: not found";

  return (
    <main style={{ maxWidth: 600, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1>Your profile, @{user.username}</h1>
      <p style={{ fontWeight: "bold" }}>{ethos}</p>
      <form action={save}>
        <label><input type="checkbox" name="open_to_work" defaultChecked={profile.open_to_work !== false} /> Open to work</label>
        <p><input name="role" placeholder="Role (e.g. Solidity dev)" defaultValue={profile.role || ""} style={{ width: "100%", padding: 8 }} /></p>
        <p><input name="skills" placeholder="Skills (comma separated)" defaultValue={profile.skills || ""} style={{ width: "100%", padding: 8 }} /></p>
        <p><input name="region" placeholder="Region (e.g. EU, remote)" defaultValue={profile.region || ""} style={{ width: "100%", padding: 8 }} /></p>
        <label><input type="checkbox" name="remote" defaultChecked={profile.remote !== false} /> Remote OK</label>
        <p><input name="experience" placeholder="Experience (e.g. 3 years)" defaultValue={profile.experience || ""} style={{ width: "100%", padding: 8 }} /></p>
        <p><textarea name="bio" placeholder="Short bio" defaultValue={profile.bio || ""} style={{ width: "100%", padding: 8, minHeight: 80 }} /></p>
        <button type="submit" style={{ padding: "10px 20px", background: "black", color: "white", border: "none", borderRadius: 6 }}>Save profile</button>
      </form>
    </main>
  );
}
