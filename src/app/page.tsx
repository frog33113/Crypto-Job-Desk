import Header from "./components/Header";

const features = [
  {
    title: "Ethos-verified",
    desc: "Trust scoring on every profile. Hire people, not anonymous handles.",
  },
  {
    title: "Crypto-native",
    desc: "Roles built for crypto — protocols, DAOs, funds, infra. No legacy HR.",
  },
  {
    title: "No recruiters",
    desc: "Direct hires only. Candidates talk to teams, not agencies.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[960px] mx-auto px-5 pt-24 pb-20">
        <h1 className="text-5xl font-semibold tracking-tight text-white leading-[1.05] max-w-[680px]">
          Jobs, filtered by on-chain trust.
        </h1>
        <p className="text-[#8a8a93] text-lg mt-5 max-w-[540px] leading-relaxed">
          Crypto Job Desk is a job board for crypto Twitter. Every candidate is
          verified through Ethos — so you hire people, not anonymous handles.
        </p>
        <div className="mt-9 flex items-center gap-4">
          <a href="/api/auth/login" className="btn btn-primary">
            Sign in with X
          </a>
          <a href="/candidates" className="btn btn-secondary">
            Browse candidates
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#141416] border border-[#26262b] rounded-xl p-5"
            >
              <div className="text-white font-medium">{f.title}</div>
              <p className="text-[#8a8a93] text-sm mt-2 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-[#26262b] pt-10 text-center">
          <p className="text-[#8a8a93] text-sm">
            Looking to hire? Post a role or browse candidates verified by Ethos.
          </p>
          <a href="/candidates" className="btn btn-secondary mt-4 inline-flex">
            See candidates
          </a>
        </div>
      </main>
    </>
  );
}
