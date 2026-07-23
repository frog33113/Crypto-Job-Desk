"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<{ username: string; avatar_url: string | null } | null>(null);
  const [loaded, setLoaded] = useState(false);

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
                d="M19.92 19.96C19.92 21.3282 19.8351 22.6765 19.6703 24H0V32H17.606C16.444 34.8973 14.875 39.5876 12.9697 40H40V32H17.606C18.6188 29.475 19.3225 26.7927 19.6703 24H40V16H19.6801C19.3395 13.208 18.6432 10.5257 17.638 8H40V0H13.0327C14.927 2.4141 16.4855 5.10421 17.638 8H0V16H19.6801C19.8385 17.2978 19.92 18.6194 19.92 19.96Z"
                fill="#5b9dd9"
                style={{ filter: "drop-shadow(0 0 4px rgba(91,157,217,0.6))" }}
              />
            </svg>
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-white">
            Crypto Job Desk
          </span>
        </Link>

        {/* Center: nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
          <Link href="/candidates" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors">
            Candidates
          </Link>
          <Link href="/jobs" className="px-3.5 py-2 rounded-lg text-[#8a8a93] hover:text-white hover:bg-white/5 transition-colors">
            Jobs
          </Link>
        </nav>

        {/* Right: auth */}
        <div className="flex items-center gap-2.5 shrink-0">
          {loaded && user ? (
            <>
              <Link href="/post-job" className="btn btn-primary text-[13px] py-2 px-4">
                Post a Job
              </Link>
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
            </>
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
    </header>
  );
}
