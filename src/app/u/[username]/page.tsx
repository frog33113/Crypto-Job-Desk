import { notFound } from "next/navigation";
import pool from "@/lib/db";
import Header from "../../components/Header";
import { EthosBadge } from "../../components/EthosBadge";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const handle = username.startsWith("@") ? username.slice(1) : username;
  const url = `https://cryptojobdesk.xyz/u/${encodeURIComponent(handle)}`;
  return {
    title: `@${handle} on Crypto Job Desk`,
    description: `View @${handle}'s profile on Crypto Job Desk — verified through Ethos Network.`,
    icons: { icon: "/icon.svg" },
    openGraph: {
      title: `@${handle} on Crypto Job Desk`,
      description: `View @${handle}'s profile on Crypto Job Desk — verified through Ethos Network.`,
      url,
      images: [`/api/og?u=${encodeURIComponent(handle)}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `@${handle} on Crypto Job Desk`,
      description: "Verified through Ethos Network",
      images: [`/api/og?u=${encodeURIComponent(handle)}`],
    },
  };
}

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
  const profileUrl = `https://cryptojobdesk.xyz/u/${encodeURIComponent(handle)}`;

  const u = await pool.query(
    "SELECT id, username, avatar_url, ethos_score, ethos_verified, ethos_profile_url FROM users WHERE username ILIKE $1",
    [handle]
  );
  const user = u.rows[0];
  if (!user) notFound();

  const me = await getCurrentUser();
  const isOwn = me?.id === user.id;

  const c = await pool.query("SELECT * FROM candidates WHERE user_id = $1", [user.id]);
  const p = c.rows[0];
  const skills = p?.skills ? p.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        {saved && (
          <div className="max-w-[640px] mx-auto px-5 pt-6">
            <div className="glass rounded-lg px-4 py-3 text-sm text-[#b5b5bd] flex items-center gap-2">
              <span className="neon-dot" />
              Profile saved
            </div>
          </div>
        )}

        <main className="max-w-[640px] mx-auto px-5 py-10">
          <div className="glass rounded-2xl p-7">
            <div className="flex items-center gap-4">
              {user.avatar_url && (
                <img src={user.avatar_url} width={72} height={72} className="rounded-full" alt="" />
              )}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-semibold tracking-tight m-0">
                    <a
                      href={`https://x.com/${user.username}`}
                      target="_blank"
                      className="text-white hover:text-[#5b9dd9] transition-colors"
                    >
                      @{user.username}
                    </a>
                  </h1>
                  {isOwn && (
                    <>
                      <a href="/dashboard" className="btn btn-secondary text-[13px] py-2 px-4">
                        Edit profile
                      </a>
                      <a href="/api/auth/logout" className="text-[13px] text-[#8a8a93] hover:text-white transition-colors">
                        Sign out
                      </a>
                    </>
                  )}
                  {!isOwn && (
                    <button
                      onClick={() => {
                        const url = profileUrl;
                        if (navigator.share) {
                          navigator
                            .share({
                              title: `@${handle} on Crypto Job Desk`,
                              url,
                            })
                            .catch(() => {});
                        } else {
                          navigator.clipboard.writeText(url).catch(() => {});
                        }
                      }}
                      className="text-[13px] text-[#8a8a93] hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      Share
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <EthosBadge score={user.ethos_score} verified={user.ethos_verified} />
                  {user.ethos_profile_url && (
                    <a
                      href={user.ethos_profile_url}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs text-[#5b9dd9] hover:text-white transition-colors"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Rate on Ethos
                    </a>
                  )}
                </div>
              </div>
            </div>

            {p?.open_to_work && (
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#b5b5bd] bg-[#0c0c10] border border-[#2a2a32] rounded-lg px-3 py-1.5">
                <span className="neon-dot" />
                Open to work
              </div>
            )}

            <div className="mt-6">
              <div className="text-white font-medium text-lg">{p?.role || "Role not specified"}</div>
              <div className="text-[#8a8a93] text-sm mt-1">
                {p?.region || "Anywhere"}
                {p?.remote && (!p?.region || !p.region.toLowerCase().includes("remote")) ? " · remote" : ""}
                {p?.experience ? ` · ${p.experience}` : ""}
              </div>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {skills.map((s: string, i: number) => (
                  <span key={i} className="tag">{s}</span>
                ))}
              </div>
            )}

            {p?.bio && <p className="text-[#b5b5bd] mt-6 leading-relaxed">{p.bio}</p>}
          </div>
        </main>
      </div>
    </>
  );
}
