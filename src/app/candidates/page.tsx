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
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#222] max-w-[900px] mx-auto w-full">
        <Link href="/" className="text-white font-bold text-lg no-underline hover:no-underline">
          Crypto Job Desk
        </Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/candidates" className="text-[#1d9bf0] hover:text-[#1d9bf0]">
            Candidates
          </Link>
          <a href="/api/auth/login" className="text-[#aaa] hover:text-white">
            Sign in
          </a>
        </nav>
      </header>
      <main className="max-w-[800px] mx-auto px-4 mt-8">
        <input
          placeholder="Search role or skill..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full p-3 mb-6 text-base bg-[#151515] border border-[#333] rounded-lg text-white outline-none focus:border-[#1d9bf0]"
        />
        {list.length === 0 && <p className="text-[#666]">No candidates yet.</p>}
        {list.map((c) => (
          <div
            key={c.username}
            className="bg-[#151515] border border-[#222] rounded-xl p-4 mb-3"
          >
            <div className="flex items-center gap-3">
              {c.avatar_url && (
                <img
                  src={c.avatar_url}
                  width={44}
                  height={44}
                  className="rounded-full"
                  alt=""
                />
              )}
              <div>
                <strong className="text-white">@{c.username}</strong>
                {c.ethos_score != null && (
                  <span className="ml-2 text-[#1d9bf0] text-sm">
                    Ethos {c.ethos_score}{" "}
                    {c.ethos_verified === "VERIFIED" ? "✓" : ""}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 mb-1 text-white">
              <b>{c.role || "—"}</b> · {c.region || ""}{" "}
              {c.remote ? "· remote" : ""}
            </p>
            {c.skills && (
              <p className="text-[#888] text-sm m-0">{c.skills}</p>
            )}
            {c.bio && (
              <p className="text-sm text-[#bbb] mt-1 m-0">{c.bio}</p>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
