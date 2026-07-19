import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import Header from "../components/Header";
import { getCurrentUser } from "@/lib/auth";

async function save(formData: FormData) {
  "use server";
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return;
  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return;
  const open = formData.get("open_to_work") === "on";
  const remote = formData.get("remote") === "on";
  await pool.query(
    `INSERT INTO candidates (user_id, open_to_work, role, skills, region, remote, experience, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id) DO UPDATE SET
       open_to_work=$2, role=$3, skills=$4, region=$5, remote=$6, experience=$7, bio=$8`,
    [
      userId,
      open,
      formData.get("role"),
      formData.get("skills"),
      formData.get("region"),
      remote,
      formData.get("experience"),
      formData.get("bio"),
    ]
  );
  redirect("/dashboard");
}

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user)
    return (
      <p className="text-center mt-20 text-[#8a8a93]">
        Not authorized. <a href="/">Sign in</a>
      </p>
    );

  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [
    user.id,
  ]);
  const profile = c.rows[0] || {};

  const field = (name: string, placeholder: string, value: string) => (
    <input
      name={name}
      placeholder={placeholder}
      defaultValue={value}
      className="w-full px-3 py-2.5 bg-[#141416] border border-[#26262b] rounded-lg text-white text-sm outline-none focus:border-[#3a3a42] transition-colors"
    />
  );

  return (
    <>
      <Header user={user} />
      <main className="max-w-[600px] mx-auto px-5 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Your profile
          </h1>
          <a
            href="/api/auth/logout"
            className="text-[#8a8a93] text-sm hover:text-white transition-colors"
          >
            Logout
          </a>
        </div>
        <p className="mono text-sm text-[#8a8a93] mt-1">@{user.username}</p>

        <div className="mt-6 bg-[#141416] border border-[#26262b] rounded-xl px-4 py-3 inline-block">
          <span className="mono text-sm text-white">
            Ethos {user.ethos_score ?? "—"}
            {user.ethos_verified === "VERIFIED" ? " ✓" : ""}
          </span>
        </div>

        <form action={save} className="mt-8 space-y-4">
          <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
            <input
              type="checkbox"
              name="open_to_work"
              defaultChecked={profile.open_to_work !== false}
              className="accent-[#5b9dd9]"
            />
            Open to work
          </label>

          {field("role", "Role (e.g. Solidity dev)", profile.role || "")}
          {field("skills", "Skills (comma separated)", profile.skills || "")}
          {field("region", "Region (e.g. EU, remote)", profile.region || "")}

          <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
            <input
              type="checkbox"
              name="remote"
              defaultChecked={profile.remote !== false}
              className="accent-[#5b9dd9]"
            />
            Remote OK
          </label>

          {field("experience", "Experience (e.g. 3 years)", profile.experience || "")}

          <textarea
            name="bio"
            placeholder="Short bio"
            defaultValue={profile.bio || ""}
            className="w-full px-3 py-2.5 bg-[#141416] border border-[#26262b] rounded-lg text-white text-sm outline-none focus:border-[#3a3a42] transition-colors min-h-[90px] resize-y"
          />

          <button
            type="submit"
            className="px-5 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-[#e6e6e6] transition-colors"
          >
            Save profile
          </button>
        </form>
      </main>
    </>
  );
}
