import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("u") || "candidate";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#060608",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(42,42,50,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,50,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.6,
          }}
        />
        {/* gradient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 400px at 50% 40%, rgba(91,157,217,0.25), transparent 60%)",
          }}
        />

        {/* card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 40,
            padding: "48px 56px",
            background: "linear-gradient(180deg, rgba(22,22,28,0.95) 0%, rgba(12,12,16,0.95) 100%)",
            border: "1px solid rgba(42,42,50,0.8)",
            borderRadius: 24,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.3)",
          }}
        >
          {/* icon */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(180deg, #1a1a20 0%, #0c0c10 100%)",
              border: "1px solid #2e2e38",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
              <path d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z" fill="#5b9dd9" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: -0.02,
                lineHeight: 1.1,
              }}
            >
              @{username}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: "1px solid #2a2a32",
                  background: "rgba(12,12,16,0.6)",
                  width: "fit-content",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                  <path d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z" fill="#5b9dd9" />
                </svg>
                <span style={{ color: "#b5b5bd", fontSize: 16, fontFamily: "monospace" }}>Ethos Verified</span>
              </div>
              <div style={{ color: "#8a8a93", fontSize: 18, marginTop: 4 }}>
                Crypto-native talent · On-chain trust
              </div>
            </div>
          </div>
        </div>

        {/* brand */}
        <div style={{ position: "absolute", bottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
            <path d="M17.68 0L20 12.72L32 0L24.4 16L40 16L24.4 20L40 24L24.4 24L32 40L20 27.28L17.68 40L16 24L0 24L16 20L0 16L16 16L17.68 0Z" fill="#5b9dd9" />
          </svg>
          <span style={{ color: "#8a8a93", fontSize: 18, fontWeight: 500 }}>Crypto Job Desk</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
