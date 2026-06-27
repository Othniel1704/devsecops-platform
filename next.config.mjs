/** @type {import('next').NextConfig} */

// CSP volontairement documentée plutôt que copiée sans réflexion :
// - 'unsafe-inline' sur script-src est nécessaire pour le script d'hydratation
//   inline de Next.js (App Router). Pour une CSP stricte avec nonce, voir le
//   middleware Next.js officiel ("Content Security Policy" dans la doc Next.js)
//   — volontairement non ajouté ici pour garder ce starter simple à lire.
// - connect-src autorise Supabase et l'API Anthropic, seules destinations
//   réseau utilisées par ce projet.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co https://api.anthropic.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
