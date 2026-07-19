"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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

function EthosBadge({ score, verified }: { score: number | null; verified: string | null }) {
  if (score == null) return null;
  return (
    <span
      className="mono text-xs px-2 py-0.5 rounded-full border border-[#26262b] text-[#8a8a93]"
      title="Ethos trust score"
    >
      Ethos {score}
      {verified === "VERIFIED" ? " ✓" : ""}
    </span>
  );
}

export default function Candidates() {
  const [list, setList] = useState<Cand[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/candidates?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then(setList);
  }, [q]);

  return (
    <>
      <header className="sticky top-0 z-10 backdrop-blur bg-[#0a0a0b]/80 border-b border-[#26262b]">
        <div className="max-w-[960px] mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-[15px] tracking-tight text-white hover:no-underline">
            Crypto Job Desk
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[#8a8a93]">
            <Link href="/candidates" className="text-white hover:text-white">
              Candidates
            </Link>
            <a href="/api/auth/login" className="hover:text-white transition-colors">
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Candidates
          </h1>
          <input
            placeholder="Search role or skill..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-64 px-3 py-2 text-sm bg-[#141416] border border-[#26262b] rounded-lg text-white outline-none focus:border-[#3a3a42] transition-colors"
          />
        </div>

        {list.length === 0 ? (
          <p className="text-[#8a8a93] text-sm">No candidates yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map((c) => (
              <div
                key={c.username}
                className="bg-[#141416] border border-[#26262b] rounded-xl p-5 hover:border-[#3a3a42] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {c.avatar_url && (
                    <img
                      src={c.avatar_url}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt=""
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">
                      @{c.username}
                    </div>
                    <div className="mt-1">
                      <EthosBadge score={c.ethos_score} verified={c.ethos_verified} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-white font-medium">
                  {c.role || "—"}
                </div>
                <div className="text-[#8a8a93] text-sm mt-0.5">
                  {c.region || "Anywhere"}
                  {c.remote ? " · remote" : ""}
                  {c.experience ? ` · ${c.experience}` : ""}
                </div>

                {c.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.skills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((s, i) => (
                        <span
                          key={i}
                          className="mono text-xs px-2 py-0.5 rounded-md bg-[#0a0a0b] border border-[#26262b] text-[#8a8a93]"
                        >
                          {s}
                        </span>
                      ))}
                  </div>
                )}

                {c.bio && (
                  <p className="text-sm text-[#b5b5bd] mt-3 line-clamp-2">
                    {c.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
