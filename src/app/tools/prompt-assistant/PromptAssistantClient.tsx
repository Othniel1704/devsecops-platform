"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const TEMPLATES = [
  { value: "api-route", label: "Route API sécurisée" },
  { value: "formulaire", label: "Formulaire avec validation" },
  { value: "auth", label: "Fonction d'authentification" },
  { value: "base-de-donnees", label: "Accès base de données sécurisé" },
];

export default function PromptAssistantClient() {
  const [template, setTemplate] = useState(TEMPLATES[0].value);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCode("");
    setCopied(false);
    try {
      const res = await fetch("/api/prompt-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template, description }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de la génération.");
      } else {
        setCode(json.code);
      }
    } catch {
      setError("Erreur réseau ou serveur indisponible.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
          <Badge tone="violet">IA</Badge>
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
          Assistant IA de prompt sécurisé
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
          Génère du code TypeScript conforme aux recommandations de sécurité de l&apos;OWASP. Choisis un cas d&apos;usage, décris le besoin et laisse l&apos;IA coder de manière sécurisée.
        </p>
      </div>

      <Card style={{ padding: "2rem", marginBottom: "2.5rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Template de sécurité
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="input-dark"
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                  paddingRight: "2.5rem"
                }}
              >
                {TEMPLATES.map((t) => (
                  <option key={t.value} value={t.value} style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                    {t.label}
                  </option>
                ))}
              </select>
              <div style={{ position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)", display: "flex", alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Description de la fonctionnalité
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex: une route API Next.js qui reçoit un email et l'enregistre en base de données avec validation"
              className="input-dark"
              style={{ resize: "vertical", fontFamily: "inherit" }}
            />
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <Button type="submit" disabled={loading}>
              {loading ? "Génération du code..." : "Générer avec Claude"}
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

      {code && (
        <Card style={{ padding: "1.5rem", position: "relative", border: "1px solid rgba(167, 139, 250, 0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
              Code sécurisé généré
            </h2>
            <Button onClick={handleCopy} variant="ghost" style={{ padding: "4px 10px", fontSize: "0.75rem", height: "auto" }}>
              {copied ? "Copié !" : "Copier le code"}
            </Button>
          </div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8125rem",
              lineHeight: 1.6,
              color: "#e2e8f0",
              background: "rgba(0,0,0,0.3)",
              padding: "1.25rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              maxHeight: "450px",
              overflowY: "auto"
            }}
          >
            {code}
          </pre>
        </Card>
      )}
    </Container>
  );
}
