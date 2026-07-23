import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import Header from "../../components/Header";
import { getCurrentUser } from "@/lib/auth";
import Footer from "../../components/Footer";

async function updateJob(id: number, formData: FormData) {
  "use server";
  const xId = (await cookies()).get("x_id")?.value;
  if (!xId) return;
  const u = await pool.query("SELECT id FROM users WHERE x_id = $1", [xId]);
  const userId = u.rows[0]?.id;
  if (!userId) return;

  const j = await pool.query("SELECT employer_id FROM jobs WHERE id = $1", [id]);
  const job = j.rows[0];
  if (!job || job.employer_id !== userId) return;

  await pool.query(
    `UPDATE jobs SET title=$1, company=$2, description=$3, requirements=$4, salary_range=$5, location=$6, remote=$7, job_type=$8 WHERE id=$9`,
    [
      (formData.get("title") as string) || "",
      (formData.get("company") as string) || "",
      (formData.get("description") as string) || null,
      (formData.get("requirements") as string) || null,
      (formData.get("salary_range") as string) || null,
      (formData.get("location") as string) || null,
      formData.get("remote") === "on",
      (formData.get("job_type") as string) || "full-time",
      id,
    ]
  );
  redirect("/jobs");
}

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return (
      <>
        <Header />
        <div className="synth-bg min-h-screen flex items-center justify-center">
          <p className="text-white">Not authorized</p>
        </div>
      </>
    );
  }

  const j = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
  const job = j.rows[0];
  if (!job || job.employer_id !== user.id) notFound();

  const field = (name: string, placeholder: string, value: string) => (
    <div>
      <label className="text-sm text-[#b5b5bd] mb-1.5 block">{placeholder}</label>
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        required={name === "title" || name === "company"}
        className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 transition-all"
      />
    </div>
  );

  return (
    <>
      <Header />
      <div className="synth-bg min-h-screen">
        <main className="max-w-[600px] mx-auto px-5 py-10">
          <h1 className="chrome-text text-2xl font-bold tracking-tight">Edit Job</h1>
          <p className="text-[#8a8a93] text-sm mt-1">Update your job posting.</p>

          <form action={updateJob.bind(null, Number(id))} className="mt-8 space-y-5">
            {field("title", "Job Title", job.title)}
            {field("company", "Company Name", job.company)}
            {field("salary_range", "Salary Range", job.salary_range || "")}
            {field("location", "Location", job.location || "")}
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Job Type</label>
              <select
                name="job_type"
                defaultValue={job.job_type || "full-time"}
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 transition-all"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-[#b5b5bd] cursor-pointer">
              <input type="checkbox" name="remote" defaultChecked={job.remote} className="accent-[#5b9dd9]" />
              Remote OK
            </label>
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Description</label>
              <textarea
                name="description"
                placeholder="Describe the role..."
                rows={5}
                defaultValue={job.description || ""}
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 transition-all resize-y"
              />
            </div>
            <div>
              <label className="text-sm text-[#b5b5bd] mb-1.5 block">Requirements</label>
              <textarea
                name="requirements"
                placeholder="List required skills..."
                rows={4}
                defaultValue={job.requirements || ""}
                className="w-full px-3.5 py-3 bg-[#111114] border border-[#2a2a32] rounded-lg text-white text-sm outline-none focus:border-[#5b9dd9]/50 transition-all resize-y"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Save changes</button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
