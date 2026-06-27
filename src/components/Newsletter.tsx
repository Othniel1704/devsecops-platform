"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

export default function Newsletter({
  source = "newsletter",
  title = "Reçois les prochains articles et outils",
  subtitle = "Un email occasionnel, zéro spam. Désinscription en un clic.",
  buttonLabel = "S'inscrire",
}: {
  source?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

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
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-2">
        <input
          type="email"
          required
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : buttonLabel}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-emerald-700">Merci, c&apos;est noté !</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">Erreur, réessaie.</p>
      )}
    </section>
  );
}
