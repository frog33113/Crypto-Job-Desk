import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

function getBase(req: NextRequest) {
  const host = req.headers.get("host") || "127.0.0.1:3000";
  const proto = host.startsWith("127.0.0.1") || host.startsWith("localhost") ? "http" : "https";
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  const ip = getClientIP(req);
  const lim = rateLimit(ip);
  if (!lim.ok) return new NextResponse("Too many requests", { status: 429 });

  const code = req.nextUrl.searchParams.get("code");
  if (!code) return new NextResponse("No code", { status: 400 });

  const BASE = getBase(req);
  const clientId = process.env.X_CLIENT_ID!;
  const clientSecret = process.env.X_CLIENT_SECRET!;
  const redirectUri = BASE + "/api/auth/callback";

  const tokenRes = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: "challenge",
    }),
  });
  const token = await tokenRes.json();
  if (!token.access_token) return new NextResponse("Token failed: " + JSON.stringify(token), { status: 400 });

  const userRes = await fetch("https://api.x.com/2/users/me?user.fields=profile_image_url,username,name", {
    headers: { Authorization: "Bearer " + token.access_token },
  });
  const userData = await userRes.json();
  const u = userData.data;
  if (!u) return new NextResponse("No user: " + JSON.stringify(userData), { status: 400 });

  let ethosScore: number | null = null;
  let ethosVerified: string | null = null;
  let ethosProfileUrl: string | null = null;
  try {
    const ethosRes = await fetch("https://api.ethos.network/api/v2/users/by/x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountIdsOrUsernames: [u.username] }),
    });
    const ethosData = await ethosRes.json();
    const e = Array.isArray(ethosData) ? ethosData[0] : null;
    if (e) {
      ethosScore = e.score ?? null;
      ethosVerified = e.humanVerificationStatus ?? null;
      ethosProfileUrl = e.links?.profile ?? null;
    }
  } catch {}

  await pool.query(
    `INSERT INTO users (x_id, username, display_name, avatar_url, ethos_score, ethos_verified, ethos_profile_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (x_id) DO UPDATE SET username=$2, display_name=$3, avatar_url=$4, ethos_score=$5, ethos_verified=$6, ethos_profile_url=COALESCE($7, users.ethos_profile_url)`,
    [u.id, u.username, u.name, u.profile_image_url, ethosScore, ethosVerified, ethosProfileUrl]
  );

  const res = NextResponse.redirect(BASE + "/check-profile");
  res.cookies.set("x_id", u.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: BASE.startsWith("https"),
  });
  return res;
}
