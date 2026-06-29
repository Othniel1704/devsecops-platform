"use client";

import { useState } from "react";

export default function Newsletter({
  source = "newsletter",
  title = "Reçois les prochains articles et outils",
  subtitle = "Un email occasionnel, zéro spam. Désinscription en un clic.",
  buttonLabel = "S'inscrire gratuitement",
}: {
  source?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      style={{
        position: "relative",
        borderRadius: "20px",
        padding: "3rem 2rem",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(167,139,250,0.06) 100%)",
        border: "1px solid var(--border-strong)",
        textAlign: "center",
      }}
    >
      {/* Background shimmer line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)",
        }}
      />
      {/* Decorative orbs */}
      <div aria-hidden className="orb orb-cyan" style={{ width: 200, height: 200, top: -60, left: -40, opacity: 0.2 }} />
      <div aria-hidden className="orb orb-violet" style={{ width: 160, height: 160, bottom: -40, right: -20, opacity: 0.18 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: "linear-gradient(135deg, var(--cyan), var(--violet))",
            marginBottom: "1rem",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080c14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7L12 13 2 7" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.375rem",
            color: "var(--text-primary)",
            margin: "0 0 0.5rem",
          }}
        >
          {title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: "0 0 1.75rem" }}>
          {subtitle}
        </p>

        {status === "success" ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: "12px",
              color: "var(--emerald)",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            ✓ Merci, c&apos;est bien noté !
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.625rem",
              justifyContent: "center",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              required
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark"
              style={{ minWidth: "220px", flex: "1" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "0.625rem 1.25rem",
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                color: "#080c14",
                fontWeight: 700,
                fontSize: "0.875rem",
                borderRadius: "10px",
                border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                fontFamily: "'Space Grotesk', sans-serif",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
            >
              {status === "loading" ? "..." : buttonLabel}
            </button>
          </form>
        )}

        {status === "error" && (
          <p style={{ marginTop: "0.75rem", color: "#f87171", fontSize: "0.8125rem" }}>
            Une erreur est survenue, réessaie.
          </p>
        )}
      </div>
    </section>
  );
}
