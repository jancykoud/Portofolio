/**
 * Sliding-window rate limiter kept in memory.
 * Limitation: on serverless platforms each instance has its own memory, so the
 * limit is per instance. For a global limit, back this with Redis (Upstash) —
 * see docs/ARCHITECTURE.md.
 */
type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0]!)) / 1000);
    return { ok: false as const, retryAfter };
  }
  recent.push(now);
  buckets.set(key, recent);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true as const, remaining: limit - recent.length };
}

export function clientIp(headers: Headers) {
  return (
    headers.get("x-nf-client-connection-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/** Rejects cross-site browser requests (no Origin header = non-browser, allowed but rate limited). */
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(req.url).host || new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
