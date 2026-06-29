import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Ressources recommandées",
  description: "Outils et hébergeurs recommandés pour développeurs.",
};

function IconGlobe({ color = "var(--cyan)" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconServer({ color = "var(--violet)" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" />
      <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" />
    </svg>
  );
}
function IconInfo({ color = "rgba(251,191,36,0.9)" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7v4M8 5.5v.01" strokeWidth="2" />
    </svg>
  );
}

const resources = [
  {
    name: "Hostinger",
    Icon: IconGlobe,
    description:
      "Hébergement web abordable, bon point de départ pour un premier projet. Interface intuitive et tarifs compétitifs.",
    href: process.env.NEXT_PUBLIC_HOSTINGER_AFFILIATE_URL || "#",
    accent: "var(--cyan)",
  },
  {
    name: "Infomaniak",
    Icon: IconServer,
    description:
      "Hébergeur basé en Europe, orienté confidentialité et conformité RGPD. Idéal pour des projets respectueux des données.",
    href: process.env.NEXT_PUBLIC_INFOMANIAK_AFFILIATE_URL || "#",
    accent: "var(--violet)",
  },
];

export default function RessourcesPage() {
  return (
    <Container size="narrow" className="py-16">
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "0.75rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Ressources
        </span>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Ressources recommandées
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0 }}>
          Une sélection courte d&apos;outils réellement utilisés, pas une liste à rallonge.
        </p>
      </div>

      {/* Affiliation notice */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          background: "rgba(251,191,36,0.07)",
          border: "1px solid rgba(251,191,36,0.2)",
          marginBottom: "2.5rem",
          fontSize: "0.8125rem",
          color: "rgba(251,191,36,0.9)",
          lineHeight: "1.6",
        }}
      >
        <span style={{ flexShrink: 0, marginTop: 1 }}><IconInfo /></span>
        <span>
          Certains liens ci-dessous sont des liens d&apos;affiliation : si tu achètes via ce lien,
          ce site touche une commission, sans coût supplémentaire pour toi.
        </span>
      </div>

      {/* Resources list */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: 0, margin: 0, listStyle: "none" }}>
        {resources.map((r) => (
          <li key={r.name}>
            <Card>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `${r.accent}14`,
                    border: `1px solid ${r.accent}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <r.Icon />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="resource-link"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.0625rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {r.name} ↗
                    </a>
                    <Badge tone="amber">Affiliation</Badge>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                    {r.description}
                  </p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
}
