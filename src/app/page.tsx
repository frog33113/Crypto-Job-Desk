import Header from "./components/Header";

const features = [
  { title: "Ethos-verified", desc: "On-chain trust scoring on every profile. Know who you're hiring." },
  { title: "Crypto-native", desc: "Roles for protocols, DAOs, funds, infra. No legacy HR middlemen." },
  { title: "No recruiters", desc: "Direct hires only. Candidates talk to teams, not agencies." },
];

export default function Home() {
  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        {/* Hero */}
        <section className="max-w-[1080px] mx-auto px-5 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 mono text-xs px-3.5 py-1.5 rounded-full border border-[#2a2a32] text-[#8a8a93] mb-8 bg-[#0c0c10]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9] shadow-[0_0_10px_#5b9dd9]" />
            Powered by Ethos Network
          </div>

          <h1 className="chrome-text text-[44px] md:text-6xl font-bold tracking-tight leading-[1.05]">
            Jobs, filtered by
            <br />
            on-chain trust.
          </h1>
          <p className="text-[#9aa0ab] text-lg mt-6 max-w-[560px] mx-auto leading-relaxed">
            A job board for crypto Twitter. Every candidate is verified through
            Ethos — so you hire people, not anonymous handles.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a href="/api/auth/login" className="btn neon-primary">
              Sign in with X
            </a>
            <a href="/candidates" className="btn neon-secondary">
              Browse candidates
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-[1080px] mx-auto px-5 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a32] border border-[#2a2a32] rounded-2xl overflow-hidden">
            {features.map((f) => (
              <div key={f.title} className="bg-[#0c0c10] p-6">
                <div className="text-white font-semibold text-[15px]">{f.title}</div>
                <p className="text-[#8a8a93] text-sm mt-2.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate preview */}
        <section className="max-w-[1080px] mx-auto px-5 pb-24">
          <div className="gloss-panel rounded-2xl p-7 max-w-[440px] mx-auto">
            <div className="text-[#8a8a93] text-xs mb-4 mono">PREVIEW</div>
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2a2a32] to-[#161618] border border-[#33333d] flex items-center justify-center text-[#5b9dd9] text-xl font-bold shadow-[0_0_16px_rgba(91,157,217,0.2)]">
                @
              </div>
              <div>
                <div className="text-white font-medium text-[15px]">@candidate</div>
                <span className="inline-flex items-center gap-1.5 mono text-xs px-2 py-0.5 rounded-full border border-[#2a2a32] text-[#8a8a93] mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9] shadow-[0_0_8px_#5b9dd9]" />
                  Ethos 1280
                </span>
              </div>
            </div>
            <div className="mt-5 text-white font-semibold text-lg">Solidity Engineer</div>
            <div className="text-[#8a8a93] text-sm mt-1">Remote · 4 yrs · DeFi</div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["Solidity", "Foundry", "DeFi", "Audit"].map((s) => (
                <span key={s} className="mono text-xs px-2.5 py-1 rounded-md bg-[#0c0c10] border border-[#2a2a32] text-[#b5b5bd]">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#2a2a32]">
              <a href="/candidates" className="btn neon-secondary text-[13px] py-2.5 px-4 w-full">
                View all candidates
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
