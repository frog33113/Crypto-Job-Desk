import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import Header from "../components/Header";
import { getCurrentUser } from "@/lib/auth";

async function createJob(formData: FormData) {
  "use server";
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return;
  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return;

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  if (!title || !company) return;

  await pool.query(
    `INSERT INTO jobs (employer_id, title, company, description, requirements, salary_range, location, remote, job_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      userId,
      title,
      company,
      formData.get("description") || null,
      formData.get("requirements") || null,
      formData.get("salary_range") || null,
      formData.get("location") || null,
      formData.get("remote") === "on",
      formData.get("job_type") || "full-time",
    ]
  );
  redirect("/jobs");
}

export default async function PostJobPage() {
  const user = await getCurrentUser();
  if (!user)
    return (
      <>
        <Header />
        <div className="synth-bg min-h-screen flex items-center justify-center">
          <div className="glass rounded-2xl p-10 text-center max-w-[400px]">
            <p className="text-white font-medium text-lg">Not authorized</p>
            <p className="text-[#8a8a93] text-sm mt-2">Sign in with X to post a job.</p>
            <a href="/api/auth/login" className="btn btn-primary mt-5 inline-flex">Sign in</a>
          </div>
        </div>
      </>
    );

  const field = (name: string, placeholder: string, required = false) => (
    <div>
      <label className="text-sm text-[#b5b5bd] mb-1.5 block">{placeholder}</label>
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all"
      />
    </div>
  );

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[600px] mx-auto px-5 py-10">
          <h1 className="chrome-text text-2xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-[#8a8a93] text-sm mt-1">Reach crypto-native talent directly.</p>

          <form action={createJob} className="mt-8 space-y-5">
            {field("title", "Job Title (e.g. Solidity Engineer)", true)}
            {field("company", "Company Name", true)}
            {field("salary_range", "Salary Range (e.g. $120K-$180K)")}
            {field("location", "Location (e.g. Remote, NYC, EU)")}
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Job Type</label>
              <select
                name="job_type"
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 transition-all"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
              <input type="checkbox" name="remote" defaultChecked className="accent-[#5b9dd9]" />
              Remote OK
            </label>
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Description</label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities, and what makes it exciting..."
                rows={5}
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all resize-y"
              />
            </div>
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Requirements</label>
              <textarea
                name="requirements"
                placeholder="List required skills, experience, and qualifications..."
                rows={4}
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 focus:shadow-[0_0_16px_rgba(91,157,217,0.12)] transition-all resize-y"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Post Job</button>
          </form>
        </main>
      </div>
    </>
  );
}
