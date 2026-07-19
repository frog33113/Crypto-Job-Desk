import Link from "next/link";

export default function Header({ user }: { user?: { username: string } | null }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-[#0a0a0b]/80 border-b border-[#26262b]">
      <div className="max-w-[960px] mx-auto px-5 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline hover:no-underline"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#2a2a30] to-[#161618] border border-[#33333b] flex items-center justify-center shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_2px_6px_rgba(0,0,0,0.5)]">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#5b9dd9]" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-white">
            Crypto Job Desk
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#8a8a93]">
          <Link
            href="/candidates"
            className="hover:text-white transition-colors no-underline hover:no-underline"
          >
            Candidates
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className="btn btn-secondary text-[13px] py-2 px-4"
            >
              @{user.username}
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="btn btn-secondary text-[13px] py-2 px-4"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
