"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";

type Cand = {
  username: string;
  avatar_url: string | null;
  ethos_score: number | null;
  ethos_verified: string | null;
  role: string | null;
  skills: string | null;
  region: string | null;
  remote: boolean;
  experience: string | null;
  bio: string | null;
};

export default function Candidates() {
  const [list, setList] = useState<Cand[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/candidates?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then((d) => { setList(d); setLoading(false); });
  }, [q]);

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[1080px] mx-auto px-5 py-10">
          <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
            <h1 className="chrome-text text-3xl font-bold tracking-tight">
              Candidates
            </h1>
            <div className="flex items-center gap-2">
              <input
                placeholder="Search role or skill..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-56 px-3.5 py-2.5 text-sm bg-[#111114] border border-[#2a2a32] rounded-lg text-white outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_12px_rgba(91,157,217,0.15)] transition-all"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-[#8a8a93] text-sm">Loading...</p>
          ) : list.length === 0 ? (
            <div className="gloss-panel rounded-2xl p-12 text-center max-w-[440px] mx-auto">
              <p className="text-white font-medium text-lg">No candidates yet.</p>
              <p className="text-[#8a8a93] text-sm mt-2">
                Be the first to post your profile and get hired through crypto Twitter.
              </p>
              <a href="/api/auth/login" className="btn neon-primary mt-6 inline-flex">
                Post your profile
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {list.map((c) => (
                <Link
                  key={c.username}
                  href={"/u/" + c.username}
                  className="block gloss-panel rounded-2xl p-5 hover:border-[#3a3a42] transition-all hover:no-underline"
                >
                  <div className="flex items-center gap-3">
                    {c.avatar_url && (
                      <img src={c.avatar_url} width={48} height={48} className="rounded-full" alt="" />
                    )}
                    <div>
                      <div className="text-white font-medium">@{c.username}</div>
                      {c.ethos_score != null && (
                        <span className="inline-flex items-center gap-1.5 mono text-xs px-2 py-0.5 rounded-full border border-[#2a2a32] text-[#8a8a93] mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9] shadow-[0_0_8px_#5b9dd9]" />
                          Ethos {c.ethos_score}
                          {c.ethos_verified === "VERIFIED" ? " ✓" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-white font-medium">{c.role || "—"}</div>
                  <div className="text-[#8a8a93] text-sm mt-0.5">
                    {c.region || "Anywhere"}
                    {c.remote ? " · remote" : ""}
                    {c.experience ? ` · ${c.experience}` : ""}
                  </div>
                  {c.skills && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {c.skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 5).map((s, i) => (
                        <span key={i} className="mono text-xs px-2 py-0.5 rounded-md bg-[#0c0c10] border border-[#2a2a32] text-[#b5b5bd]">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {c.bio && (
                    <p className="text-sm text-[#b5b5bd] mt-3 line-clamp-2">{c.bio}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
