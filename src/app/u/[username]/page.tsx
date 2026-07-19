import { notFound } from "next/navigation";
import pool from "@/lib/db";
import Header from "../../components/Header";
import { EthosBadge } from "../../components/EthosBadge";

export default async function PublicProfile({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { username } = await params;
  const { saved } = await searchParams;
  const handle = username.startsWith("@") ? username.slice(1) : username;

  const u = await pool.query(
    "SELECT id, username, avatar_url, ethos_score, ethos_verified FROM users WHERE username ILIKE $1",
    [handle]
  );
  const user = u.rows[0];
  if (!user) notFound();

  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [
    user.id,
  ]);
  const p = c.rows[0];

  const skills = p?.skills
    ? p.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <Header user={user} />
      {saved && (
        <div className="max-w-[640px] mx-auto px-5 pt-6">
          <div className="bg-[#141416] border border-[#26262b] rounded-lg px-4 py-2.5 text-sm text-[#b5b5bd]">
            ✓ Profile saved
          </div>
        </div>
      )}
      <main className="max-w-[640px] mx-auto px-5 py-10">
        <div className="flex items-center gap-4">
          {user.avatar_url && (
            <img
              src={user.avatar_url}
              width={72}
              height={72}
              className="rounded-full"
              alt=""
            />
          )}
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight m-0">
              @{user.username}
            </h1>
            <div className="mt-2">
              <EthosBadge score={user.ethos_score} verified={user.ethos_verified} />
            </div>
          </div>
        </div>

        {p?.open_to_work && (
          <div className="mt-6 inline-block bg-[#141416] border border-[#26262b] rounded-lg px-3 py-1.5 text-sm text-[#b5b5bd]">
            Open to work
          </div>
        )}

        <div className="mt-6">
          <div className="text-white font-medium text-lg">
            {p?.role || "Role not specified"}
          </div>
          <div className="text-[#8a8a93] text-sm mt-1">
            {p?.region || "Anywhere"}
            {p?.remote ? " · remote" : ""}
            {p?.experience ? ` · ${p.experience}` : ""}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {skills.map((s: string, i: number) => (
              <span
                key={i}
                className="mono text-xs px-2.5 py-1 rounded-md bg-[#141416] border border-[#26262b] text-[#b5b5bd]"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {p?.bio && (
          <p className="text-[#b5b5bd] mt-6 leading-relaxed">{p.bio}</p>
        )}
      </main>
    </>
  );
}
