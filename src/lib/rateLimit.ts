// Rate limiter en mémoire — suffisant pour un seul serveur/instance.
// Sur Vercel (plusieurs instances serverless), ce compteur n'est PAS partagé
// entre instances : il limite "au mieux" mais ne garantit pas une limite
// globale stricte. Pour une garantie stricte en production, remplacer par un
// store partagé (ex: Upstash Redis + @upstash/ratelimit).
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return { allowed: false };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
