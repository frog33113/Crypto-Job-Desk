"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EthosBadge } from "../components/EthosBadge";
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

  useEffect(() => {
    fetch("/api/candidates?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then(setList);
  }, [q]);

  return (
    <>
      <Header />

      <main className="max-w-[960px] mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Candidates
          </h1>
          <div className="flex items-center gap-2">
            <input
              placeholder="Search role or skill..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-56 px-3 py-2.5 text-sm bg-[#1a1a1d] border border-[#26262b] rounded-lg text-white outline-none focus:border-[#3a3a42] transition-colors"
            />
            <button
              type="button"
              onClick={() => setQ(q)}
              className="btn btn-secondary text-[13px] py-2 px-4"
            >
              Search
            </button>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="bg-[#141416] border border-[#26262b] rounded-xl p-10 text-center">
            <p className="text-white font-medium">No candidates yet.</p>
            <p className="text-[#8a8a93] text-sm mt-1">
              Be the first to post your profile and get hired through crypto Twitter.
            </p>
            <a href="/api/auth/login" className="btn btn-primary mt-5 inline-flex">
              Post your profile
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map((c) => (
              <Link
                key={c.username}
                href={"/u/" + c.username}
                className="block bg-[#141416] border border-[#26262b] rounded-xl p-5 hover:border-[#3a3a42] transition-colors hover:no-underline"
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
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
