"use client";

import { useState } from "react";

export default function Newsletter() {
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
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-md border border-gray-200 p-6">
      <h2 className="font-semibold">Reçois les prochains articles et outils</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          required
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : "S'inscrire"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-green-600">Merci, c'est noté !</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">Erreur, réessaie.</p>
      )}
    </section>
  );
}
