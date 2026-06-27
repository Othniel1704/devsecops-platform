"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCode("");
    try {
      const res = await fetch("/api/prompt-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template, description }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur inconnue.");
      } else {
        setCode(json.code);
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size="narrow" className="py-16">
      <h1 className="text-2xl font-bold text-slate-900">
        Assistant de prompt de code sécurisé
      </h1>
      <p className="mt-2 text-slate-600">
        Choisis un template, décris le besoin, l&apos;assistant génère du code
        suivant des règles de sécurité prédéfinies.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Template</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            {TEMPLATES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Décris ce que le code doit faire
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="ex: une route qui reçoit un email et l'enregistre dans la table subscribers"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Génération..." : "Générer"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {code && (
        <pre className="mt-8 overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100">
          {code}
        </pre>
      )}
    </Container>
  );
}
