import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import pool from "@/lib/db";
import Header from "./components/Header";
import { EthosBadge } from "./components/EthosBadge";

const features = [
  { title: "Ethos-verified", desc: "On-chain trust scoring on every profile. Know who you're hiring." },
  { title: "Crypto-native", desc: "Roles for protocols, DAOs, funds, infra. No legacy HR middlemen." },
  { title: "No recruiters", desc: "Direct hires only. Candidates talk to teams, not agencies." },
];

export default async function Home() {
  const xId = (await cookies()).get("x_id")?.value;
  if (xId) redirect("/candidates");

  // Fetch a real candidate for the preview card
  const featured = await pool.query(
    `SELECT u.username, u.avatar_url, u.ethos_score, u.ethos_verified,
            c.role, c.skills, c.region, c.remote, c.experience
     FROM users u
     JOIN candidates c ON c.user_id = u.id
     WHERE u.ethos_score IS NOT NULL
     ORDER BY u.ethos_score DESC
     LIMIT 1`
  );
  const preview = featured.rows[0];
  const previewSkills = preview?.skills
    ? preview.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <Header />
      <div className="synth-bg">
        {/* Hero */}
        <section className="max-w-[1080px] mx-auto px-5 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 mono text-xs px-3.5 py-1.5 rounded-full border border-[#2a2a32] bg-[#0c0c10]/60 text-[#8a8a93] mb-8">
            <span className="neon-dot" />
            Powered by Ethos Network
          </div>

          <h1 className="chrome-text text-[44px] md:text-6xl font-bold tracking-tight leading-[1.05]">
            Jobs, filtered by
            <br />
            on-chain trust.
          </h1>
          <p className="text-[#9aa0ab] text-lg mt-6 max-w-[560px] mx-auto leading-relaxed">
            A job board for crypto Twitter. Every candidate is verified through
            Ethos — so you hire people, not anonymous handles.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a href="/api/auth/login" className="btn btn-primary">
              Sign in with X
            </a>
            <a href="/candidates" className="btn btn-secondary">
              Browse candidates
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-[1080px] mx-auto px-5 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass glass-hover rounded-2xl p-6">
                <div className="text-white font-semibold text-[15px]">{f.title}</div>
                <p className="text-[#8a8a93] text-sm mt-2.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate preview — real data */}
        <section className="max-w-[1080px] mx-auto px-5 pb-28">
          <div className="glass rounded-2xl p-7 max-w-[440px] mx-auto">
            <div className="text-[#55555d] text-xs mb-4 mono">PREVIEW</div>
            {preview ? (
              <>
                <Link href={`/u/${preview.username}`} className="flex items-center gap-3.5 hover:opacity-90 transition-opacity">
                  {preview.avatar_url ? (
                    <img
                      src={preview.avatar_url}
                      width={56}
                      height={56}
                      className="rounded-full border border-[#2e2e38]"
                      alt={preview.username}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] text-xl font-bold shadow-[0_0_16px_rgba(91,157,217,0.15)]">
                      @
                    </div>
                  )}
                  <div>
                    <div className="text-white font-medium text-[15px]">@{preview.username}</div>
                    <div className="mt-1">
                      <EthosBadge score={preview.ethos_score} verified={preview.ethos_verified} />
                    </div>
                  </div>
                </Link>
                <div className="mt-5 text-white font-semibold text-lg">
                  {preview.role || "Role not specified"}
                </div>
                <div className="text-[#8a8a93] text-sm mt-1">
                  {preview.region || "Anywhere"}
                  {preview.remote && (!preview.region || !preview.region.toLowerCase().includes("remote")) ? " · remote" : ""}
                  {preview.experience ? ` · ${preview.experience}` : ""}
                </div>
                {previewSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {previewSkills.map((s: string) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] text-xl font-bold shadow-[0_0_16px_rgba(91,157,217,0.15)]">
                    @
                  </div>
                  <div>
                    <div className="text-white font-medium text-[15px]">Be the first</div>
                    <div className="text-[#8a8a93] text-sm mt-1">Sign in to create a profile</div>
                  </div>
                </div>
              </>
            )}
            <div className="mt-6 pt-5 border-t border-[#1e1e24]">
              <a href="/candidates" className="btn btn-secondary text-[13px] py-2.5 px-4 w-full">
                View all candidates
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
