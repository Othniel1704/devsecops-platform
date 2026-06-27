import { NextResponse } from "next/server";
import { rateLimit, getClientKey } from "@/lib/rateLimit";

// Génère du code à partir de templates sécurisés, via l'API Anthropic.
// Nécessite la variable d'environnement ANTHROPIC_API_KEY côté serveur
// (jamais exposée au client : cette route tourne uniquement côté serveur).

const TEMPLATES: Record<string, string> = {
  "api-route": `Tu génères une route API Next.js (App Router, TypeScript) sécurisée.
Règles obligatoires : valider et typer toutes les entrées, ne jamais
concaténer des entrées utilisateur dans une requête SQL ou une commande
shell, renvoyer des messages d'erreur génériques au client (jamais la trace
d'erreur brute), et ajouter des commentaires expliquant chaque contrôle de
sécurité.`,
  formulaire: `Tu génères un formulaire React (TypeScript) avec validation
côté client ET côté serveur. Règles obligatoires : valider le format de
chaque champ, échapper toute donnée avant affichage, gérer explicitement les
états de chargement et d'erreur.`,
  auth: `Tu génères une fonction d'authentification (TypeScript). Règles
obligatoires : ne jamais stocker de mot de passe en clair (hash avec
bcrypt/argon2), comparer les secrets avec une fonction à temps constant,
invalider les sessions correctement, et commenter chaque choix de sécurité.`,
  "base-de-donnees": `Tu génères du code d'accès base de données
(TypeScript). Règles obligatoires : utiliser systématiquement des requêtes
préparées/paramétrées, jamais de concaténation de chaînes dans le SQL,
limiter les privilèges supposés du compte applicatif.`,
};

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!rateLimit(`prompt:${clientKey}`, 5, 60_000).allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes, réessaie dans une minute." },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Cet outil n'est pas encore configuré : il manque la clé API côté serveur (ANTHROPIC_API_KEY). Ajoute-la dans les variables d'environnement pour l'activer.",
      },
      { status: 503 }
    );
  }

  let template: string;
  let description: string;
  try {
    const body = await request.json();
    template = String(body.template ?? "");
    description = String(body.description ?? "").slice(0, 1000);
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const systemPrompt = TEMPLATES[template];
  if (!systemPrompt) {
    return NextResponse.json({ error: "Template inconnu." }, { status: 400 });
  }
  if (!description.trim()) {
    return NextResponse.json({ error: "Décris ce que le code doit faire." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: description }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "L'API de génération a renvoyé une erreur. Réessaie plus tard." },
        { status: 502 }
      );
    }

    const json = await res.json();
    const text = json.content?.[0]?.text ?? "";
    return NextResponse.json({ code: text });
  } catch {
    return NextResponse.json(
      { error: "Impossible de contacter l'API de génération." },
      { status: 502 }
    );
  }
}
