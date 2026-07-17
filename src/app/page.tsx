export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "80px auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>cryptowork</h1>
      <p>Find jobs among verified people in crypto Twitter.</p>
      <a href="/api/auth/login"
         style={{ display: "inline-block", marginTop: 16, padding: "12px 24px",
                  background: "black", color: "white", borderRadius: 8, textDecoration: "none" }}>
        Sign in with X
      </a>
      <p style={{ marginTop: 24 }}>
        <a href="/candidates">Browse candidates</a>
      </p>
    </main>
  );
}
