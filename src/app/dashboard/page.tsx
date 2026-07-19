import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import Header from "./components/Header";
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
      <p className="text-center mt-20 text-[#aaa]">
        Not authorized. <a href="/">Sign in</a>
      </p>
    );

  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [
    user.id,
  ]);
  const profile = c.rows[0] || {};

  const ethos =
    user.ethos_score != null
      ? `Ethos score: ${user.ethos_score} ${
          user.ethos_verified === "VERIFIED" ? "(verified human)" : ""
        }`
      : "Ethos score: not found";

  const field = (name: string, placeholder: string, value: string) => (
    <p>
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        className="w-full p-2.5 bg-[#151515] border border-[#333] rounded-lg text-white outline-none focus:border-[#1d9bf0]"
      />
    </p>
  );

  return (
    <>
      <Header user={user} />
      <main className="max-w-[600px] mx-auto px-4 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white">Your profile, @{user.username}</h1>
          <a href="/api/auth/logout" className="text-[#888] text-sm hover:text-white">
            Logout
          </a>
        </div>
        <p className="font-bold text-[#1d9bf0]">{ethos}</p>
        <form action={save}>
          <label className="text-[#ccc]">
            <input
              type="checkbox"
              name="open_to_work"
              defaultChecked={profile.open_to_work !== false}
            />{" "}
            Open to work
          </label>
          {field("role", "Role (e.g. Solidity dev)", profile.role || "")}
          {field("skills", "Skills (comma separated)", profile.skills || "")}
          {field("region", "Region (e.g. EU, remote)", profile.region || "")}
          <label className="text-[#ccc]">
            <input
              type="checkbox"
              name="remote"
              defaultChecked={profile.remote !== false}
            />{" "}
            Remote OK
          </label>
          {field("experience", "Experience (e.g. 3 years)", profile.experience || "")}
          <p>
            <textarea
              name="bio"
              placeholder="Short bio"
              defaultValue={profile.bio || ""}
              className="w-full p-2.5 bg-[#151515] border border-[#333] rounded-lg text-white outline-none focus:border-[#1d9bf0] min-h-[90px]"
            />
          </p>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1d9bf0] text-white border-none rounded-md font-semibold hover:no-underline"
          >
            Save profile
          </button>
        </form>
      </main>
    </>
  );
}
