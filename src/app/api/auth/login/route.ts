import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.APP_URL || "http://127.0.0.1:3000";

export async function GET(req: NextRequest) {
  const clientId = process.env.X_CLIENT_ID!;
  const redirectUri = BASE + "/api/auth/callback";
  const scope = "users.read tweet.read offline.access";
  const state = Math.random().toString(36).slice(2);
  const url =
    "https://x.com/i/oauth2/authorize?response_type=code" +
    "&client_id=" + clientId +
    "&redirect_uri=" + encodeURIComponent(redirectUri) +
    "&scope=" + encodeURIComponent(scope) +
    "&state=" + state +
    "&code_challenge=challenge" +
    "&code_challenge_method=plain";
  return NextResponse.redirect(url);
}
