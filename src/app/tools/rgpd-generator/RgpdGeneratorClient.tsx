"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function RgpdGeneratorClient() {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [collectsCookies, setCollectsCookies] = useState(false);
  const [dataCollected, setDataCollected] = useState("");
  const [generated, setGenerated] = useState("");

  function generate() {
    const text = `Politique de confidentialité — ${companyName || "[Nom du projet]"}

Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR")}

1. Données collectées
${companyName || "Ce site"} collecte les données suivantes : ${
      dataCollected || "[à préciser]"
    }.

2. Cookies
${
  collectsCookies
    ? "Ce site utilise des cookies."
    : "Ce site n'utilise pas de cookies de suivi."
}

3. Contact
Pour toute question relative à vos données personnelles, contactez : ${
      contactEmail || "[email de contact]"
    }.

4. Vos droits
Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
suppression de vos données. Pour exercer ce droit, contactez-nous à l'adresse
ci-dessus.

Avis important : Ce document est un point de départ généré automatiquement et ne constitue pas un avis juridique.`;
    setGenerated(text);
  }

  function download() {
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "politique-de-confidentialite.txt";
    a.click();
    URL.revokeObjectURL(url);
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
          <Badge tone="emerald">RGPD</Badge>
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
          Générateur de politique de confidentialité
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
          Génère une politique de confidentialité conforme pour ton MVP ou projet. Tout reste dans ton navigateur, rien n&apos;est collecté ou envoyé.
        </p>
      </div>

      <Card style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Nom du projet / entreprise
            </label>
            <input
              type="text"
              placeholder="ex: Mon Super Projet"
              className="input-dark"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Email de contact
            </label>
            <input
              type="email"
              placeholder="ex: contact@monsite.fr"
              className="input-dark"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Données collectées
            </label>
            <input
              type="text"
              placeholder="ex: email, nom, adresse IP"
              className="input-dark"
              value={dataCollected}
              onChange={(e) => setDataCollected(e.target.value)}
            />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem", color: "var(--text-secondary)", width: "fit-content" }}>
            <input
              type="checkbox"
              checked={collectsCookies}
              onChange={(e) => setCollectsCookies(e.target.checked)}
              style={{
                accentColor: "var(--cyan)",
                width: "16px",
                height: "16px",
              }}
            />
            <span>Le site utilise des cookies de mesure d&apos;audience ou session</span>
          </label>

          <div style={{ marginTop: "0.5rem" }}>
            <Button onClick={generate}>Générer le document →</Button>
          </div>
        </div>
      </Card>

      {generated && (
        <Card style={{ background: "rgba(8, 12, 20, 0.4)", border: "1px dashed var(--border-strong)", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Document généré
          </h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              background: "rgba(0,0,0,0.2)",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              maxHeight: "360px",
              overflowY: "auto",
            }}
          >
            {generated}
          </pre>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.25rem" }}>
            <Button onClick={download} variant="primary">Télécharger (.txt)</Button>
            <Button onClick={() => {
              navigator.clipboard.writeText(generated);
              alert("Copié dans le presse-papiers !");
            }} variant="secondary">Copier le texte</Button>
          </div>
        </Card>
      )}
    </Container>
  );
}
