import Link from "next/link";

const links = [
  { href: "/blog",        label: "Blog" },
  { href: "/tools",       label: "Outils" },
  { href: "/boilerplate", label: "Boilerplate" },
  { href: "/ressources",  label: "Ressources" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-surface)",
        marginTop: "5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "3rem 1.25rem 2rem",
        }}
      >
        {/* Main footer row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
              }}
            >
              DevSec<span style={{ color: "var(--cyan)" }}>AI</span>
            </span>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                lineHeight: "1.6",
              }}
            >
              Coder vite avec l&apos;IA, rester sécurisé et conforme RGPD/OWASP.
              Guides, outils et boilerplate pour développeurs sérieux.
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            margin: "2rem 0 1.5rem",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} DevSecOps &amp; AI-Driven Development. Tous droits réservés.
          </p>
          <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", maxWidth: "420px" }}>
            Les outils fournissent des points de départ informatifs et ne constituent pas
            un avis juridique ou un audit de sécurité complet.
          </p>
        </div>
      </div>
    </footer>
  );
}
