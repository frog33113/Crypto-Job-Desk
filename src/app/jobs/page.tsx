"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";

type Job = {
  id: number;
  title: string;
  company: string;
  description: string | null;
  requirements: string | null;
  salary_range: string | null;
  location: string | null;
  remote: boolean;
  job_type: string;
  created_at: string;
  employer_username: string;
  employer_avatar: string | null;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[1080px] mx-auto px-5 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="chrome-text text-3xl font-bold tracking-tight">Jobs</h1>
            <Link href="/post-job" className="btn btn-primary text-[13px] py-2 px-4">
              Post a Job
            </Link>
          </div>

          {loading ? (
            <p className="text-[#55555d] text-sm">Loading...</p>
          ) : jobs.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center max-w-[440px] mx-auto">
              <p className="text-white font-medium text-lg">No jobs posted yet.</p>
              <p className="text-[#8a8a93] text-sm mt-2">
                Be the first to post a job and find great crypto talent.
              </p>
              <Link href="/post-job" className="btn btn-primary mt-6 inline-flex">
                Post a Job
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="glass glass-hover rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {job.employer_avatar ? (
                        <img src={job.employer_avatar} width={40} height={40} className="rounded-full" alt="" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-[#2e2e38] flex items-center justify-center text-[#5b9dd9] text-sm font-bold">
                          {job.company.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="text-white font-semibold text-lg">{job.title}</div>
                        <div className="text-[#8a8a93] text-sm">{job.company}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {job.salary_range && (
                        <div className="text-white font-medium text-sm">{job.salary_range}</div>
                      )}
                      <div className="text-[#55555d] text-xs mt-1">
                        {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {job.description && (
                    <p className="text-[#b5b5bd] text-sm mt-4 leading-relaxed">{job.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <span className="tag">{job.job_type}</span>
                    {job.remote && <span className="tag">Remote</span>}
                    {job.location && <span className="tag">{job.location}</span>}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#1e1e24] flex items-center justify-between">
                    <Link href={"/u/" + job.employer_username} className="text-[#8a8a93] text-sm hover:text-white transition-colors">
                      Posted by @{job.employer_username}
                    </Link>
                    <a href="#" className="btn btn-secondary text-[13px] py-2 px-4">
                      Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
