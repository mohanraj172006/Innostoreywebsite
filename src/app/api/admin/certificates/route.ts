/**
 * Admin API — Certificate Registrations list
 * GET /api/admin/certificates
 *
 * Query params:
 *   ?page=1&limit=20&search=...&status=Pending|Available&session=...
 *
 * Protected: requires valid Supabase Auth session cookie AND
 * the authenticated user's email must equal ADMIN_EMAIL env var.
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const PAGE_SIZE = 20;

async function verifyAdmin(req: NextRequest): Promise<{ ok: boolean; error?: string }> {
  if (!ADMIN_EMAIL) {
    return { ok: false, error: "Admin email not configured on server." };
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return { ok: false, error: "Unauthorized — missing auth token." };
  }

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { ok: false, error: "Unauthorized — invalid or expired session." };
  }

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return { ok: false, error: "Forbidden — insufficient privileges." };
  }

  return { ok: true };
}

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const page   = Math.max(1, parseInt(params.get("page")  ?? "1", 10));
  const limit  = Math.min(100, parseInt(params.get("limit") ?? String(PAGE_SIZE), 10));
  const search = (params.get("search") ?? "").trim();
  const status = params.get("status") ?? "";
  const session = (params.get("session") ?? "").trim();
  const offset = (page - 1) * limit;

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("certificate_registrations")
    .select("id, registration_code, register_number, full_name, college_name, workshop_session, email, certificate_status, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(
      `registration_code.ilike.%${search}%,register_number.ilike.%${search}%,full_name.ilike.%${search}%`
    );
  }

  if (status === "Pending" || status === "Available") {
    query = query.eq("certificate_status", status);
  }

  if (session) {
    query = query.ilike("workshop_session", `%${session}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[AdminList] DB error:", error.message);
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }

  return NextResponse.json({
    registrations: data ?? [],
    total: count ?? 0,
    page,
    limit,
  });
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid registration ID." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // 1. Fetch certificate_path if any, to clean up storage
  const { data: reg, error: fetchError } = await supabase
    .from("certificate_registrations")
    .select("id, certificate_path, registration_code")
    .eq("id", id)
    .maybeSingle<{ id: string; certificate_path: string | null; registration_code: string }>();

  if (fetchError || !reg) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  // 2. Remove certificate from storage if uploaded
  if (reg.certificate_path) {
    const { error: storageError } = await supabase.storage
      .from("certificates")
      .remove([reg.certificate_path]);

    if (storageError) {
      console.warn("[AdminDelete] Failed to delete file from storage:", reg.certificate_path, storageError.message);
    }
  }

  // 3. Delete row from database
  const { error: deleteError } = await supabase
    .from("certificate_registrations")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("[AdminDelete] DB delete error:", deleteError.message);
    return NextResponse.json({ error: "Failed to delete registration." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    deletedId: id,
    registrationCode: reg.registration_code,
  });
}
