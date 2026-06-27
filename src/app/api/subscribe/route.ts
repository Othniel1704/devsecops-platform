import { NextResponse } from "next/server";
import { rateLimit, getClientKey } from "@/lib/rateLimit";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!rateLimit(`subscribe:${clientKey}`, 5, 60_000).allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes, réessaie dans une minute." },
      { status: 429 }
    );
  }

  let email: string;
  let source: string;
  try {
    const body = await request.json();
    email = String(body.email ?? "").trim().toLowerCase();
    source = String(body.source ?? "newsletter").slice(0, 50);
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  // On insère uniquement l'email (seule colonne garantie de la table). Pour
  // tracer l'origine, ajouter une colonne "source text" puis insérer { email, source }.
  const { error } = await supabase.from("subscribers").insert({ email });
  if (error) {
    // 23505 = violation de contrainte unique : email déjà inscrit. On traite
    // ce cas comme un succès idempotent plutôt qu'une erreur.
    if (error.code !== "23505") {
      // Détail journalisé côté serveur uniquement, jamais renvoyé au client.
      console.error("[subscribe] erreur Supabase :", error.message);
      return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
  }

  // Pas de log d'email en clair en production : on ne journalise qu'un
  // événement sans donnée personnelle.
  console.log(`[subscribe] nouvelle inscription (source=${source})`);

  return NextResponse.json({ ok: true });
}
