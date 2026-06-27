"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
        setError(json.error ?? "Erreur inconnue.");
      } else {
        setData(json);
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    data && data.score >= 70
      ? "text-emerald-700"
      : data && data.score >= 40
      ? "text-amber-600"
      : "text-red-600";

  return (
    <Container size="narrow" className="py-16">
      <h1 className="text-2xl font-bold text-slate-900">
        Scanner de headers de sécurité
      </h1>
      <p className="mt-2 text-slate-600">
        Analyse passive uniquement : on lit les headers de la réponse HTTP
        publique d&apos;une URL. Aucune tentative d&apos;intrusion, de scan de
        ports ou d&apos;exploitation.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-wrap gap-2">
        <input
          type="url"
          required
          placeholder="https://exemple.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Analyse..." : "Scanner"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {data && (
        <div className="mt-8">
          <div className="flex items-baseline gap-3">
            <span className={`text-3xl font-bold ${scoreColor}`}>{data.score}/100</span>
            <span className="text-sm text-slate-500">
              {data.url} — HTTP {data.status}
            </span>
          </div>

          <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200">
            {data.results.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{r.label}</p>
                  {r.value && (
                    <p className="mt-0.5 truncate text-xs text-slate-500">{r.value}</p>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.present
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {r.present ? "Présent" : "Absent"}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-slate-400">
            Ce score reflète uniquement la présence de headers de sécurité
            courants. Il ne constitue pas un audit de sécurité complet.
          </p>
        </div>
      )}
    </Container>
  );
}
