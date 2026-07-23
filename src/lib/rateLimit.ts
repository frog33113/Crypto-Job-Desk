// Simple in-memory rate limiter for API routes.
// On Vercel serverless, each instance has its own memory —
// this is a best-effort limiter, not a hard guarantee.
// For production-grade limiting, use Vercel KV or Upstash Ratelimit.

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute per IP

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0 };
  }

  return { ok: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export function getClientIP(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
