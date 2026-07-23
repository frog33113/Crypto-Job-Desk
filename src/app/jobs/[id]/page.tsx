import { notFound } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const j = await pool.query("SELECT title, company FROM jobs WHERE id = $1", [id]);
  const job = j.rows[0];
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} at ${job.company} — Crypto Job Desk`,
    description: `Apply for ${job.title} at ${job.company} on Crypto Job Desk.`,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: `Apply for ${job.title} at ${job.company} on Crypto Job Desk.`,
      images: ["https://cryptojobdesk.xyz/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: "Crypto Job Desk",
      images: ["https://cryptojobdesk.xyz/og.png"],
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const r = await pool.query(
    `SELECT j.*, u.username as employer_username, u.avatar_url as employer_avatar
     FROM jobs j JOIN users u ON u.id = j.employer_id WHERE j.id = $1`,
    [id]
  );
  const job = r.rows[0];
  if (!job) notFound();

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[680px] mx-auto px-5 py-10">
          <Link href="/jobs" className="text-[#8a8a93] text-sm hover:text-white transition-colors mb-6 inline-block">
            ← Back to Jobs
          </Link>

          <div className="glass rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              {job.employer_avatar ? (
                <img src={job.employer_avatar} width={48} height={48} className="rounded-full" alt="" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1a1a20] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] font-bold">
                  {job.company.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <div className="text-[#8a8a93] text-sm">Posted by</div>
                <Link href={`/u/${job.employer_username}`} className="text-white hover:text-[#5b9dd9] transition-colors text-sm">
                  @{job.employer_username}
                </Link>
              </div>
            </div>

            <h1 className="text-white font-bold text-2xl tracking-tight">{job.title}</h1>
            <div className="text-[#8a8a93] text-sm mt-1">{job.company}</div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="tag">{job.job_type}</span>
              {job.remote && <span className="tag">Remote</span>}
              {job.location && <span className="tag">{job.location}</span>}
              {job.salary_range && <span className="tag">{job.salary_range}</span>}
            </div>

            {job.description && (
              <div className="mt-6">
                <h2 className="text-white font-semibold text-sm mb-2">Description</h2>
                <p className="text-[#b5b5bd] text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
            )}

            {job.requirements && (
              <div className="mt-5">
                <h2 className="text-white font-semibold text-sm mb-2">Requirements</h2>
                <p className="text-[#b5b5bd] text-sm leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
              </div>
            )}

            <div className="mt-7 pt-5 border-t border-[#1e1e24]">
              <a
                href={`https://x.com/${job.employer_username}`}
                target="_blank"
                className="btn btn-primary w-full"
              >
                Apply via X
              </a>
              <p className="text-[#55555d] text-xs text-center mt-3">
                You&apos;ll be redirected to the employer&apos;s X profile to DM them directly.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
