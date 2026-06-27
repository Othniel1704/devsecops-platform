import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase"; // décommenter une fois Supabase configuré

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  // Étape suivante : insérer dans Supabase une fois la table "subscribers" créée.
  // const { error } = await supabase.from("subscribers").insert({ email });
  // if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  console.log("Nouvelle inscription :", email);
  return NextResponse.json({ ok: true });
}
