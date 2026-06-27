import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// En l'absence de clés (avant configuration de Supabase), le client est créé
// avec des valeurs vides : il ne plantera pas le build, mais les appels échoueront
// jusqu'à ce que .env.local soit rempli.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
