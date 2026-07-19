import Link from "next/link";

export default function Header({ user }: { user?: { username: string } | null }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#222] max-w-[900px] mx-auto w-full">
      <Link href="/" className="text-white font-bold text-lg no-underline hover:no-underline">
        Crypto Job Desk
      </Link>
      <nav className="flex gap-5 items-center text-sm">
        <Link href="/candidates" className="text-[#aaa] hover:text-white">
          Candidates
        </Link>
        {user ? (
          <Link href="/dashboard" className="text-[#aaa] hover:text-white">
            @{user.username}
          </Link>
        ) : (
          <Link href="/api/auth/login" className="text-[#1d9bf0] font-semibold hover:text-[#1d9bf0]">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
