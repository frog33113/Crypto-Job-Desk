import Link from "next/link";

export default function NotFound() {
  return (
    <div className="synth-bg min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-10 text-center max-w-[420px] mx-auto">
        <div className="flex justify-center mb-6">
          <span className="w-12 h-12 rounded-lg bg-gradient-to-b from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_2px_8px_rgba(0,0,0,0.4)]">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <path d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z" fill="#5b9dd9" style={{ filter: "drop-shadow(0 0 4px rgba(91,157,217,0.6))" }} />
            </svg>
          </span>
        </div>
        <div className="chrome-text text-5xl font-bold tracking-tight mb-3">404</div>
        <p className="text-[#8a8a93] text-sm mb-6">This page doesn&apos;t exist. Maybe it was rugged.</p>
        <Link href="/" className="btn btn-primary inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  );
}
