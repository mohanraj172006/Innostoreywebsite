/**
 * Supabase Admin client — SERVICE ROLE (server-side ONLY)
 * NEVER import this in Client Components or pages with "use client".
 * Only use in API Route Handlers (src/app/api/**\/route.ts).
 *
 * The client is created lazily so that build-time static analysis
 * does not fail when environment variables are absent.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseAdmin(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local"
    );
  }

  // Create an isolated client with service_role privileges.
  // We do NOT cache a single client instance here to ensure user auth sessions
  // (e.g. from signInWithPassword or auth methods) can NEVER pollute the service-role client.
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
