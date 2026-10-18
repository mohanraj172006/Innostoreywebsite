/**
 * Supabase client — PUBLIC (browser-safe, anon key only)
 * Use this in Client Components and for public read operations.
 *
 * Created lazily to avoid build-time failures when env vars are absent.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _publicClient: SupabaseClient | null = null;

export function getSupabasePublic(): SupabaseClient {
  if (_publicClient) return _publicClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase public environment variables. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  _publicClient = createClient(supabaseUrl, supabaseAnonKey);
  return _publicClient;
}

/** @deprecated Use getSupabasePublic() instead */
export const supabasePublic = {
  get client() { return getSupabasePublic(); }
};
