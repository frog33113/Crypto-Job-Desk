import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Header from "./components/Header";

const features = [
  { title: "Ethos-verified", desc: "On-chain trust scoring on every profile. Know who you're hiring." },
  { title: "Crypto-native", desc: "Roles for protocols, DAOs, funds, infra. No legacy HR middlemen." },
  { title: "No recruiters", desc: "Direct hires only. Candidates talk to teams, not agencies." },
];

export default async function Home() {
  const xId = (await cookies()).get("x_id")?.value;
  if (xId) redirect("/candidates");

  return (
    <>
      <Header />
      <div className="synth-bg">
        {/* Hero */}
        <section className="max-w-[1080px] mx-auto px-5 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 mono text-xs px-3.5 py-1.5 rounded-full border border-[#2a2a32] bg-[#0c0c10]/60 text-[#8a8a93] mb-8">
            <span className="neon-dot" />
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
            <a href="/api/auth/login" className="btn btn-primary">
              Sign in with X
            </a>
            <a href="/candidates" className="btn btn-secondary">
              Browse candidates
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-[1080px] mx-auto px-5 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass glass-hover rounded-2xl p-6">
                <div className="text-white font-semibold text-[15px]">{f.title}</div>
                <p className="text-[#8a8a93] text-sm mt-2.5 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate preview */}
        <section className="max-w-[1080px] mx-auto px-5 pb-28">
          <div className="glass rounded-2xl p-7 max-w-[440px] mx-auto">
            <div className="text-[#55555d] text-xs mb-4 mono">PREVIEW</div>
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1a20] to-[#0c0c10] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] text-xl font-bold shadow-[0_0_16px_rgba(91,157,217,0.15)]">
                @
              </div>
              <div>
                <div className="text-white font-medium text-[15px]">@candidate</div>
                <span className="inline-flex items-center gap-1.5 mono text-xs px-2.5 py-1 rounded-full border border-[#2a2a32] bg-[#0c0c10]/60 text-[#b5b5bd] mt-1">
                  <svg width="11" height="11" viewBox="0 1 30 30" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.505 2.6h4.998v9.054l8.453-2.746L27.5 13.66l-8.453 2.746 5.322 7.326-4.043 2.937-5.322-7.325-5.322 7.325-4.044-2.937 5.323-7.326-8.454-2.746 1.545-4.753 8.453 2.746zm6.513 13.798-1.533-4.72h-4.963l-1.533 4.72 4.015 2.917z" fill="#5b9dd9" />
                  </svg>
                  <span className="text-white font-medium">1280</span>
                </span>
              </div>
            </div>
            <div className="mt-5 text-white font-semibold text-lg">Solidity Engineer</div>
            <div className="text-[#8a8a93] text-sm mt-1">Remote · 4 yrs · DeFi</div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["Solidity", "Foundry", "DeFi", "Audit"].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#1e1e24]">
              <a href="/candidates" className="btn btn-secondary text-[13px] py-2.5 px-4 w-full">
                View all candidates
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
