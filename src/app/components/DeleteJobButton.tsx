"use client";
import { useState } from "react";

export default function DeleteJobButton({ jobId }: { jobId: number }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this job?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      window.location.reload();
    } catch {
      alert("Could not delete job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[13px] text-red-400/80 hover:text-red-300 transition-colors"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
