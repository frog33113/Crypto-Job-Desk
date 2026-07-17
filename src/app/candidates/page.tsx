"use client";
import { useEffect, useState } from "react";

type Cand = {
  username: string; avatar_url: string | null; ethos_score: number | null;
  ethos_verified: string | null; role: string | null; skills: string | null;
  region: string | null; remote: boolean; experience: string | null; bio: string | null;
};

export default function Candidates() {
  const [list, setList] = useState<Cand[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/candidates?q=" + encodeURIComponent(q))
      .then((r) => r.json())
      .then(setList);
  }, [q]);

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Crypto Twitter candidates</h1>
      <input
        placeholder="Search role or skill..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 20, fontSize: 16 }}
      />
      {list.length === 0 && <p>No candidates yet.</p>}
      {list.map((c) => (
        <div key={c.username} style={{ border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {c.avatar_url && <img src={c.avatar_url} width={40} height={40} style={{ borderRadius: "50%" }} alt="" />}
            <div>
              <strong>@{c.username}</strong>
              {c.ethos_score != null && (
                <span style={{ marginLeft: 8, color: "#1d9bf0" }}>
                  Ethos {c.ethos_score} {c.ethos_verified === "VERIFIED" ? "✓" : ""}
                </span>
              )}
            </div>
          </div>
          <p style={{ margin: "8px 0" }}><b>{c.role || "—"}</b> · {c.region || ""} {c.remote ? "· remote" : ""}</p>
          <p style={{ color: "#555", fontSize: 14 }}>{c.skills}</p>
          {c.bio && <p style={{ fontSize: 14 }}>{c.bio}</p>}
        </div>
      ))}
    </main>
  );
}
