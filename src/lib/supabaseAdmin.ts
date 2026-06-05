import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 * The service-role key bypasses Row Level Security and must NEVER be exposed
 * to the browser — this file is server-only.
 *
 * Returns null when the env vars aren't configured yet, so the app still
 * builds/runs and the API can return a friendly "not configured" message.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export const ORDERS_TABLE = "orders";
