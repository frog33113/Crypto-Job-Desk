import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[960px] mx-auto px-5 pt-24 pb-16">
        <h1 className="text-5xl font-semibold tracking-tight text-white leading-[1.05] max-w-[640px]">
          Jobs, filtered by on-chain trust.
        </h1>
        <p className="text-[#8a8a93] text-lg mt-5 max-w-[520px] leading-relaxed">
          Crypto Job Desk is a job board for crypto Twitter. Every candidate is
          verified through Ethos — so you hire people, not anonymous handles.
        </p>
        <div className="mt-9 flex items-center gap-4">
          <a
            href="/api/auth/login"
            className="px-6 py-3.5 bg-white text-black rounded-xl font-medium text-[15px] hover:no-underline hover:bg-[#e6e6e6] transition-colors"
          >
            Sign in with X
          </a>
          <a
            href="/candidates"
            className="px-6 py-3.5 border border-[#26262b] text-white rounded-xl font-medium text-[15px] hover:no-underline hover:border-[#3a3a42] transition-colors"
          >
            Browse candidates
          </a>
        </div>
        <div className="mt-16 flex gap-10 text-sm text-[#8a8a93] mono">
          <div>
            <div className="text-white text-xl">Ethos-verified</div>
            <div className="mt-1">trust scoring</div>
          </div>
          <div>
            <div className="text-white text-xl">Crypto-native</div>
            <div className="mt-1">roles only</div>
          </div>
          <div>
            <div className="text-white text-xl">No recruiters</div>
            <div className="mt-1">direct hires</div>
          </div>
        </div>
      </main>
    </>
  );
}
