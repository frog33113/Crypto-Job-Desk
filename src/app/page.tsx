import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[600px] mx-auto text-center mt-24 px-4">
        <h1 className="text-4xl font-bold text-white m-0">Crypto Job Desk</h1>
        <p className="text-[#aaa] text-lg mt-3">
          Find jobs among verified people in crypto Twitter.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <a
            href="/api/auth/login"
            className="px-6 py-3 bg-[#1d9bf0] text-white rounded-lg font-semibold hover:no-underline"
          >
            Sign in with X
          </a>
          <a
            href="/candidates"
            className="px-6 py-3 border border-[#333] text-white rounded-lg hover:no-underline"
          >
            Browse candidates
          </a>
        </div>
      </main>
    </>
  );
}
