"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07070a]/80 border-b border-[#2a2a32]">
      <div className="max-w-[1080px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline hover:no-underline shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#2a2a30] to-[#161618] border border-[#33333b] flex items-center justify-center shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="w-3 h-3 rounded-[3px] bg-[#5b9dd9] shadow-[0_0_12px_#5b9dd9]" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-white">
            Crypto Job Desk
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/candidates" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors no-underline hover:no-underline">
            Candidates
          </Link>
          <Link href="/api/auth/login" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors no-underline hover:no-underline">
            Post a profile
          </Link>
          <a href="https://ethos.network" target="_blank" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors no-underline hover:no-underline">
            Ethos
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5 shrink-0">
          {loaded && user ? (
            <Link href={"/u/" + user.username} className="no-underline hover:no-underline">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2a2a32] to-[#161618] border border-[#33333d] flex items-center justify-center text-[#5b9dd9] text-sm font-bold shadow-[0_0_12px_rgba(91,157,217,0.25)]">
                @{user.username.slice(0, 1).toUpperCase()}
              </span>
            </Link>
          ) : (
            <>
              <Link href="/api/auth/login" className="btn neon-secondary text-[13px] py-2 px-4">
                Log in
              </Link>
              <Link href="/api/auth/login" className="btn neon-primary text-[13px] py-2 px-4">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
