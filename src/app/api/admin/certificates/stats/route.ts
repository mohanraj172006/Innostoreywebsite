/**
 * Admin API — Dashboard summary stats
 * GET /api/admin/certificates/stats
 *
 * Returns total, pending, available counts from the DB.
 * Protected by admin JWT.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

async function verifyAdmin(req: NextRequest): Promise<{ ok: boolean; error?: string }> {
  if (!ADMIN_EMAIL) return { ok: false, error: "Admin email not configured." };
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return { ok: false, error: "Unauthorized." };

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { ok: false, error: "Unauthorized — invalid session." };
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase())
    return { ok: false, error: "Forbidden." };
  return { ok: true };
}

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const [totalRes, pendingRes, availableRes] = await Promise.all([
    supabase.from("certificate_registrations").select("id", { count: "exact", head: true }),
    supabase.from("certificate_registrations").select("id", { count: "exact", head: true }).eq("certificate_status", "Pending"),
    supabase.from("certificate_registrations").select("id", { count: "exact", head: true }).eq("certificate_status", "Available"),
  ]);

  if (totalRes.error || pendingRes.error || availableRes.error) {
    return NextResponse.json({ error: "Failed to fetch stats." }, { status: 500 });
  }

  return NextResponse.json({
    total:     totalRes.count     ?? 0,
    pending:   pendingRes.count   ?? 0,
    available: availableRes.count ?? 0,
  });
}
