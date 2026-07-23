export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e24] bg-[#060608] mt-auto">
      <div className="max-w-[1080px] mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
            <path d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z" fill="#5b9dd9" />
          </svg>
          <span className="text-[#55555d] text-sm">Crypto Job Desk · 2026</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a href="/candidates" className="text-[#8a8a93] hover:text-white transition-colors">Candidates</a>
          <a href="/jobs" className="text-[#8a8a93] hover:text-white transition-colors">Jobs</a>
          <a href="https://app.ethos.network/" target="_blank" className="text-[#8a8a93] hover:text-white transition-colors">Ethos</a>
        </div>
      </div>
    </footer>
  );
}
