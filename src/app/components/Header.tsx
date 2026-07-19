import Link from "next/link";

export default function Header({ user }: { user?: { username: string } | null }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-[#0a0a0b]/80 border-b border-[#26262b]">
      <div className="max-w-[960px] mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-[15px] tracking-tight text-white hover:no-underline">
          Crypto Job Desk
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#8a8a93]">
          <Link href="/candidates" className="hover:text-white transition-colors">
            Candidates
          </Link>
          {user ? (
            <Link href="/dashboard" className="hover:text-white transition-colors">
              @{user.username}
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="text-white hover:text-white transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
