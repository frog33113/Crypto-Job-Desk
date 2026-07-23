"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EthosBadge } from "../components/EthosBadge";

type Cand = {
  username: string; avatar_url: string | null; ethos_score: number | null;
  ethos_verified: string | null; role: string | null; skills: string | null;
  region: string | null; remote: boolean; experience: string | null; bio: string | null;
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
            <h1 className="chrome-text text-3xl font-bold tracking-tight">Candidates</h1>
            <input
              placeholder="Search role or skill..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-56 px-3.5 py-2.5 text-sm bg-[#111114] border border-[#2a2a32] rounded-lg text-white outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all"
            />
          </div>

          {loading ? (
            <p className="text-[#55555d] text-sm">Loading...</p>
          ) : list.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center max-w-[440px] mx-auto">
              <p className="text-white font-medium text-lg">No candidates yet.</p>
              <p className="text-[#8a8a93] text-sm mt-2">
                Be the first to post your profile and get hired through crypto Twitter.
              </p>
              <a href="/api/auth/login" className="btn btn-primary mt-6 inline-flex">
                Post your profile
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {list.map((c) => (
                <Link
                  key={c.username}
                  href={"/u/" + c.username}
                  className="glass glass-hover rounded-2xl p-5 block"
                >
                  <div className="flex items-center gap-3">
                    {c.avatar_url && (
                      <img src={c.avatar_url} width={48} height={48} className="rounded-full" alt="" />
                    )}
                    <div>
                      <div className="text-white font-medium">@{c.username}</div>
                      <div className="mt-1">
                        <EthosBadge score={c.ethos_score} verified={c.ethos_verified} />
                      </div>
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
                        <span key={i} className="tag">{s}</span>
                      ))}
                    </div>
                  )}
                  {c.bio && <p className="text-sm text-[#b5b5bd] mt-3 line-clamp-2">{c.bio}</p>}
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
