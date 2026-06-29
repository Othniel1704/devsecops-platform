"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type HeaderResult = {
  label: string;
  present: boolean;
  value: string | null;
  weight: number;
};

type ScanResponse = {
  url: string;
  status: number;
  score: number;
  results: HeaderResult[];
};

export default function SecurityScannerClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ScanResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/security-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors du scan.");
      } else {
        setData(json);
      }
    } catch {
      setError("Erreur réseau ou serveur inaccessible.");
    } finally {
      setLoading(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--emerald)";
    if (score >= 50) return "var(--amber)";
    return "#ef4444";
  };

  return (
    <Container size="narrow" className="py-16">
      {/* Back button */}
      <Link
        href="/tools"
        className="back-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "var(--text-secondary)",
          textDecoration: "none",
          marginBottom: "2rem",
          transition: "color 0.2s",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Retour aux outils
      </Link>

      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <Badge tone="cyan">Sécurité</Badge>
        </div>
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
          Scanner de headers de sécurité
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
          Analyse passive : analyse des en-têtes HTTP publics renvoyés par un serveur. Utile pour identifier les protections CSP, HSTS, X-Frame-Options manquantes.
        </p>
      </div>

      <Card style={{ padding: "1.75rem", marginBottom: "2.5rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Adresse URL à scanner
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <input
              type="url"
              required
              placeholder="https://exemple.fr"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-dark"
              style={{ flex: 1, minWidth: "220px" }}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Analyse en cours..." : "Lancer l'analyse"}
            </Button>
          </div>
        </form>

        {error && (
          <div
            style={{
              marginTop: "1.25rem",
              padding: "0.875rem 1rem",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "8px",
              color: "#f87171",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </Card>

      {data && (
        <div>
          {/* Summary Score Card */}
          <Card style={{ padding: "2rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
                  Score de sécurité global
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{ fontSize: "3rem", fontWeight: 700, color: getScoreColor(data.score), fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data.score}
                  </span>
                  <span style={{ fontSize: "1.125rem", color: "var(--text-muted)", fontWeight: 500 }}>/ 100</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600, margin: 0 }}>
                  {data.url}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem", margin: 0 }}>
                  Statut HTTP : <span style={{ color: "var(--cyan)", fontWeight: 600 }}>{data.status}</span>
                </p>
              </div>
            </div>

            {/* Score Bar */}
            <div className="score-bar-track" style={{ marginTop: "1.5rem" }}>
              <div
                className="score-bar-fill"
                style={{
                  width: `${data.score}%`,
                  background: `linear-gradient(90deg, ${getScoreColor(data.score)}, var(--violet))`
                }}
              />
            </div>
          </Card>

          {/* Results List */}
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Détail des en-têtes analysés
          </h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", padding: 0, margin: 0, listStyle: "none" }}>
            {data.results.map((r) => (
              <li key={r.label}>
                <Card style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                      {r.label}
                    </p>
                    {r.value ? (
                      <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.375rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.value}
                      </p>
                    ) : (
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.375rem", margin: 0 }}>
                        Non configuré (-{r.weight} pts)
                      </p>
                    )}
                  </div>
                  <Badge tone={r.present ? "emerald" : "amber"}>
                    {r.present ? "Présent" : "Absent"}
                  </Badge>
                </Card>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
            Ce scan passif vérifie uniquement la présence des principaux en-têtes HTTP de protection recommandés par l&apos;OWASP. Il ne constitue pas un audit de vulnérabilité complet de l&apos;application.
          </p>
        </div>
      )}
    </Container>
  );
}
