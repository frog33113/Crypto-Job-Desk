import Header from "./components/Header";

const features = [
  {
    title: "Ethos-verified",
    desc: "Trust scoring on every profile. Hire people, not handles.",
  },
  {
    title: "Crypto-native",
    desc: "Roles for protocols, DAOs, funds, infra. No legacy HR.",
  },
  {
    title: "No recruiters",
    desc: "Direct hires. Candidates talk to teams, not agencies.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[860px] mx-auto px-5 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 mono text-xs px-3 py-1 rounded-full border border-[#26262b] text-[#8a8a93] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b9dd9]" />
          Verified by Ethos
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-white leading-[1.1] max-w-[620px]">
          Jobs, filtered by on-chain trust.
        </h1>
        <p className="text-[#8a8a93] text-base mt-4 max-w-[520px] leading-relaxed">
          A job board for crypto Twitter. Every candidate is verified through
          Ethos — so you hire people, not anonymous handles.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a href="/api/auth/login" className="btn btn-primary">
            Sign in with X
          </a>
          <a href="/candidates" className="btn btn-secondary">
            Browse candidates
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#26262b] border border-[#26262b] rounded-xl overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="bg-[#0a0a0b] p-5">
              <div className="text-white font-medium text-[15px]">{f.title}</div>
              <p className="text-[#8a8a93] text-sm mt-2 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
