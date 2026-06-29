import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!isConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ [Supabase] Warning: Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Database integrations (e.g. newsletter subscriptions) will run in mock mode."
  );
}

// Fallback client structure to gracefully handle calls when credentials are not configured.
const fallbackClient = {
  from: () => ({
    insert: async (data: any) => {
      console.warn(
        "⚠️ [Supabase] Database insert intercepted by fallback client (unconfigured environment). Attempted insert of:",
        data
      );
      return {
        error: {
          code: "SUPABASE_NOT_CONFIGURED",
          message: "Supabase credentials are not configured in local environment variables.",
        },
      };
    },
    select: () => ({
      single: async () => ({
        data: null,
        error: {
          code: "SUPABASE_NOT_CONFIGURED",
          message: "Supabase credentials are not configured in local environment variables.",
        },
      }),
    }),
  }),
} as any;

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : fallbackClient;
