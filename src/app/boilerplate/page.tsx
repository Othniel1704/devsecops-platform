import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Boilerplate Next.js + Supabase",
  description:
    "Starter de production Next.js + Supabase avec authentification, sécurité et conformité RGPD déjà configurées.",
};

function IconCheck({ color = "var(--emerald)" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M3.5 9.5L7 13L14.5 5.5" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L4 6v6c0 5 3.6 8.8 8 10 4.4-1.2 8-5 8-10V6L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7L12 13 2 7" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconBalance() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v18M3 9l4 8-4 2M21 9l-4 8 4 2M3 9h18" />
    </svg>
  );
}

const features = [
  { Icon: IconRocket, text: "Next.js (App Router) + TypeScript + Tailwind, prêt pour la production" },
  { Icon: IconLock,   text: "Authentification Supabase préconfigurée (email + magic link)" },
  { Icon: IconShield, text: "Headers de sécurité (CSP, HSTS, X-Frame-Options...) déjà en place" },
  { Icon: IconBalance,text: "Politique de confidentialité et bannière cookies de base incluses" },
  { Icon: IconMail,   text: "Capture d'emails connectée à une table Supabase" },
  { Icon: IconBook,   text: "Structure de blog en Markdown prête à l'emploi" },
];

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;

export default function BoilerplatePage() {
  return (
    <Container size="narrow" className="py-16">
      {/* Eyebrow */}
      <Badge tone="violet">Boilerplate</Badge>

      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          margin: "1rem 0 1rem",
          lineHeight: 1.15,
        }}
      >
        Starter Next.js + Supabase,{" "}
        <span className="gradient-text">sécurisé et conforme RGPD</span>
      </h1>

      <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        Le même niveau d&apos;exigence que ce site, packagé pour démarrer un nouveau projet
        en quelques minutes plutôt qu&apos;en quelques jours.
      </p>

      {/* Feature card */}
      <div
        style={{
          borderRadius: "20px",
          border: "1px solid var(--border-strong)",
          overflow: "hidden",
          background: "var(--bg-surface)",
        }}
      >
        {/* Gradient top line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, var(--cyan), var(--violet))" }} />

        <div style={{ padding: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1.25rem",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Ce qui est inclus
          </p>

          <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", padding: 0, margin: 0, listStyle: "none" }}>
            {features.map((f) => (
              <li
                key={f.text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                <f.Icon />
                {f.text}
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid var(--border)",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                  letterSpacing: "-0.03em",
                }}
              >
                49€
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Paiement unique · Mises à jour incluses
              </p>
            </div>

            {checkoutUrl ? (
              <Button href={checkoutUrl}>Acheter maintenant →</Button>
            ) : (
              <Badge tone="amber">Bientôt disponible</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Waitlist */}
      {!checkoutUrl && (
        <div style={{ marginTop: "2.5rem" }}>
          <Newsletter
            source="boilerplate-waitlist"
            title="Sois prévenu·e à la sortie"
            subtitle="Le boilerplate n'est pas encore en vente — inscris-toi pour être averti·e dès qu'il est disponible."
            buttonLabel="Me prévenir"
          />
        </div>
      )}
    </Container>
  );
}
