import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import Header from "../components/Header";
import { EthosBadge } from "../components/EthosBadge";
import { getCurrentUser } from "@/lib/auth";

async function save(formData: FormData) {
  "use server";
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return;
  const u = await pool.query("SELECT id, username FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  const username = u.rows[0]?.username;
  if (!userId) return; // not authorized
  const open = formData.get("open_to_work") === "on";
  const remote = formData.get("remote") === "on";
  await pool.query(
    `INSERT INTO candidates (user_id, open_to_work, role, skills, region, remote, experience, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id) DO UPDATE SET
       open_to_work=$2, role=$3, skills=$4, region=$5, remote=$6, experience=$7, bio=$8`,
    [userId, open, formData.get("role"), formData.get("skills"), formData.get("region"), remote, formData.get("experience"), formData.get("bio")]
  );
  redirect("/u/" + encodeURIComponent(username || "") + "?saved=1");
}

async function removeProfile() {
  "use server";
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return;
  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return;
  await pool.query("DELETE FROM candidates WHERE user_id = $1", [userId]);
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  redirect("/");
}

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user)
    return (
      <>
        <Header />
        <div className="synth-bg min-h-screen flex items-center justify-center">
          <div className="glass rounded-2xl p-10 text-center max-w-[400px]">
            <p className="text-white font-medium text-lg">Not authorized</p>
            <p className="text-[#8a8a93] text-sm mt-2">Sign in with X to edit your profile.</p>
            <a href="/api/auth/login" className="btn btn-primary mt-5 inline-flex">Sign in</a>
          </div>
        </div>
      </>
    );

  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [user.id]);
  const profile = c.rows[0] || {};

  const field = (name: string, placeholder: string, value: string) => (
    <input
      name={name}
      placeholder={placeholder}
      defaultValue={value}
      className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all"
    />
  );

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[600px] mx-auto px-5 py-10">
          <div className="flex items-center justify-between">
            <h1 className="chrome-text text-2xl font-bold tracking-tight">Edit profile</h1>
            <a href="/api/auth/logout" className="btn btn-secondary text-[13px] py-2 px-4">Logout</a>
          </div>
          <p className="mono text-sm text-[#8a8a93] mt-1">@{user.username}</p>

          <div className="mt-5">
            <EthosBadge score={user.ethos_score} verified={user.ethos_verified} />
          </div>

          <form action={save} className="mt-8 space-y-4">
            <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
              <input type="checkbox" name="open_to_work" defaultChecked={profile.open_to_work !== false} className="accent-[#5b9dd9]" />
              Open to work
            </label>
            {field("role", "Role (e.g. Solidity dev)", profile.role || "")}
            {field("skills", "Skills (comma separated)", profile.skills || "")}
            {field("region", "Region (e.g. EU, remote)", profile.region || "")}
            <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
              <input type="checkbox" name="remote" defaultChecked={profile.remote !== false} className="accent-[#5b9dd9]" />
              Remote OK
            </label>
            {field("experience", "Experience (e.g. 3 years)", profile.experience || "")}
            <textarea
              name="bio"
              placeholder="Short bio"
              defaultValue={profile.bio || ""}
              className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all min-h-[90px] resize-y"
            />
            <button type="submit" className="btn btn-primary w-full">Save profile</button>
          </form>

          <form action={removeProfile} className="mt-4">
            <button type="submit" className="btn btn-secondary w-full !text-red-400 !border-red-400/30 hover:!border-red-400/50">
              Delete profile
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
