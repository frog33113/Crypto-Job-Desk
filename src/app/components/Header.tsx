"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<{ username: string; avatar_url: string | null } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060608]/80 border-b border-[#1e1e24]">
      <div className="max-w-[1080px] mx-auto px-5 h-16 flex items-center gap-4">
        {/* Left: brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_2px_8px_rgba(0,0,0,0.4)]">
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <path
                d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z"
                fill="#5b9dd9"
                style={{ filter: "drop-shadow(0 0 4px rgba(91,157,217,0.6))" }}
              />
            </svg>
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-white">
            Crypto Job Desk
          </span>
        </Link>

        {/* Center: nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
          <Link href="/candidates" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors">
            Candidates
          </Link>
          <Link href="/jobs" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors">
            Jobs
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[#2e2e38] bg-[#0c0c10] text-[#8a8a93] hover:text-white transition-colors shrink-0"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* Right: auth (desktop) */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {loaded && user ? (
            <Link href={"/u/" + user.username}>
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  width={36}
                  height={36}
                  className="rounded-full border border-[#2e2e38] shadow-[0_0_12px_rgba(91,157,217,0.2)]"
                />
              ) : (
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] text-sm font-bold">
                  {user.username.slice(0, 1).toUpperCase()}
                </span>
              )}
            </Link>
          ) : (
            <>
              <Link href="/api/auth/login" className="btn btn-secondary text-[13px] py-2 px-4">
                Log in
              </Link>
              <Link href="/api/auth/login" className="btn btn-primary text-[13px] py-2 px-4">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1e1e24] bg-[#060608]/95 backdrop-blur-xl">
          <nav className="max-w-[1080px] mx-auto px-5 py-4 flex flex-col gap-1">
            <Link
              href="/candidates"
              onClick={() => setMobileOpen(false)}
              className="px-3.5 py-3 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Candidates
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileOpen(false)}
              className="px-3.5 py-3 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Jobs
            </Link>
            <div className="border-t border-[#1e1e24] pt-3 mt-1 flex flex-col gap-2">
              {loaded && user ? (
                <Link
                  href={"/u/" + user.username}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white transition-colors text-sm"
                >
                  {user.avatar_url && (
                    <img src={user.avatar_url} width={28} height={28} className="rounded-full" alt="" />
                  )}
                  @{user.username}
                </Link>
              ) : (
                <>
                  <Link href="/api/auth/login" onClick={() => setMobileOpen(false)} className="btn btn-secondary text-[13px] py-2.5 w-full">
                    Log in
                  </Link>
                  <Link href="/api/auth/login" onClick={() => setMobileOpen(false)} className="btn btn-primary text-[13px] py-2.5 w-full">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
