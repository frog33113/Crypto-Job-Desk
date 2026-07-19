import Header from "./components/Header";

const features = [
  { title: "Ethos-verified", desc: "Trust scoring on every profile." },
  { title: "Crypto-native", desc: "Roles for protocols, DAOs, funds." },
  { title: "No recruiters", desc: "Direct hires. No agencies." },
];

export default function Home() {
  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[1080px] mx-auto px-5 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: hero */}
            <div>
              <div className="inline-flex items-center gap-2 mono text-xs px-3 py-1 rounded-full border border-[#2a2a32] text-[#8a8a93] mb-6 bg-[#0c0c10]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9] shadow-[0_0_8px_#5b9dd9]" />
                Verified by Ethos
              </div>

              <h1 className="chrome-text text-5xl font-bold tracking-tight leading-[1.05]">
                Jobs, filtered by
                <br />
                on-chain trust.
              </h1>
              <p className="text-[#9aa0ab] text-base mt-5 max-w-[460px] leading-relaxed">
                A job board for crypto Twitter. Every candidate is verified
                through Ethos — so you hire people, not anonymous handles.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a href="/api/auth/login" className="btn neon-primary">
                  Sign in with X
                </a>
                <a href="/candidates" className="btn neon-secondary">
                  Browse candidates
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-px bg-[#2a2a32] border border-[#2a2a32] rounded-xl overflow-hidden max-w-[460px]">
                {features.map((f) => (
                  <div key={f.title} className="bg-[#0c0c10] p-4">
                    <div className="text-white font-medium text-[14px]">
                      {f.title}
                    </div>
                    <p className="text-[#8a8a93] text-xs mt-1.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live candidate card preview */}
            <div className="gloss-panel rounded-2xl p-6 max-w-[420px] lg:ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2a2a32] to-[#161618] border border-[#33333d] flex items-center justify-center text-[#5b9dd9] font-bold">
                  @
                </div>
                <div>
                  <div className="text-white font-medium">@candidate</div>
                  <span className="inline-flex items-center gap-1.5 mono text-xs px-2 py-0.5 rounded-full border border-[#2a2a32] text-[#8a8a93] mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9] shadow-[0_0_8px_#5b9dd9]" />
                    Ethos 1280
                  </span>
                </div>
              </div>
              <div className="mt-5 text-white font-medium">Solidity Engineer</div>
              <div className="text-[#8a8a93] text-sm mt-1">
                Remote · 4 yrs · DeFi
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["Solidity", "Foundry", "DeFi", "Audit"].map((s) => (
                  <span
                    key={s}
                    className="mono text-xs px-2 py-1 rounded-md bg-[#0c0c10] border border-[#2a2a32] text-[#b5b5bd]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#2a2a32]">
                <a
                  href="/candidates"
                  className="btn neon-secondary text-[13px] py-2 px-4 w-full"
                >
                  View candidates
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
