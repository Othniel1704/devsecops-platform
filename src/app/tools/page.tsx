import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Micro-outils",
  description:
    "Trois micro-outils gratuits pour développeurs : génération RGPD, scan de headers de sécurité, assistant de prompt sécurisé.",
};

function IconShield({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L4 6v6c0 5 3.6 8.8 8 10 4.4-1.2 8-5 8-10V6L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconSearch({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" strokeWidth="1.5" />
    </svg>
  );
}
function IconBrain({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3.5A2.5 2.5 0 0 0 6.5 6c0 .73.3 1.39.78 1.86A2.5 2.5 0 0 0 4.5 10a2.5 2.5 0 0 0 2.5 2.5v1A2.5 2.5 0 0 0 9.5 16H10" />
      <path d="M15 3.5A2.5 2.5 0 0 1 17.5 6c0 .73-.3 1.39-.78 1.86A2.5 2.5 0 0 1 19.5 10a2.5 2.5 0 0 1-2.5 2.5v1A2.5 2.5 0 0 1 14.5 16H14" />
      <path d="M12 3v13M9 16a3 3 0 0 0 6 0" />
    </svg>
  );
}

const tools = [
  {
    href: "/tools/rgpd-generator",
    Icon: IconShield,
    title: "Générateur RGPD",
    fullTitle: "Générateur de politique de confidentialité",
    description:
      "Génère une politique de confidentialité conforme pour un petit projet ou MVP. Réponse instantanée, sans compte.",
    tag: "RGPD",
    tagTone: "emerald" as const,
    accentColor: "var(--emerald)",
  },
  {
    href: "/tools/security-scanner",
    Icon: IconSearch,
    title: "Scanner de sécurité",
    fullTitle: "Scanner de vulnérabilités (headers HTTP)",
    description:
      "Analyse passive des headers de sécurité HTTP d'une URL publique. Score sur 100 pts, avec recommandations.",
    tag: "Sécurité",
    tagTone: "cyan" as const,
    accentColor: "var(--cyan)",
  },
  {
    href: "/tools/prompt-assistant",
    Icon: IconBrain,
    title: "Assistant de prompt",
    fullTitle: "Assistant de prompt de code sécurisé",
    description:
      "Génère du code TypeScript sécurisé via Claude AI, avec des templates OWASP intégrés pour API routes, formulaires, auth et DB.",
    tag: "IA",
    tagTone: "violet" as const,
    accentColor: "var(--violet)",
  },
];

export default function ToolsIndex() {
  return (
    <Container className="py-16">
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
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
          Micro-outils
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
          Outils gratuits pour développeurs
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, maxWidth: "520px" }}>
          Utilisables sans compte. Tous les résultats restent dans ton navigateur sauf mention contraire.
        </p>
      </div>

      {/* Tools grid */}
      <ul
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          padding: 0,
          margin: 0,
          listStyle: "none",
        }}
      >
        {tools.map((tool) => (
          <li key={tool.title}>
            <Link href={tool.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: `${tool.accentColor}14`,
                    border: `1px solid ${tool.accentColor}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  <tool.Icon color={tool.accentColor} />
                </div>

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.625rem" }}>
                  <h2
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {tool.fullTitle}
                  </h2>
                  <Badge tone={tool.tagTone}>{tool.tag}</Badge>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    margin: "0 0 1.5rem",
                    flex: 1,
                  }}
                >
                  {tool.description}
                </p>

                {/* CTA */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: tool.accentColor,
                    fontFamily: "'Space Grotesk', sans-serif",
                    marginTop: "auto",
                  }}
                >
                  Utiliser l&apos;outil →
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
