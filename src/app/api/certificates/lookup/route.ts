/**
 * GET /api/certificates/lookup?code=CERT-2026-XXXXXX
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { CertificateRegistration } from "@/lib/types";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

function isValidCodeFormat(code: string): boolean {
  return /^(ISI|CERT)-\d{4}-[A-Z0-9]{4,6}$/.test(code);
}

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many lookup attempts. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase() ?? "";

  if (!code) {
    return NextResponse.json({ error: "Registration code is required." }, { status: 400 });
  }

  if (!isValidCodeFormat(code)) {
    return NextResponse.json(
      { error: "Invalid registration code format. Expected: ISI-YYYY-XXXX" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  type LookupRow = Pick<CertificateRegistration, "id" | "registration_code" | "full_name" | "workshop_session" | "certificate_status">;

  const { data, error } = await supabase
    .from("certificate_registrations")
    .select("id, registration_code, full_name, workshop_session, certificate_status")
    .eq("registration_code", code)
    .maybeSingle<LookupRow>();

  if (error) {
    console.error("[CertLookup] DB error:", error.code, error.message);
    return NextResponse.json(
      { error: "Lookup failed. Please try again later." },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({ found: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      found: true,
      registrationCode: data.registration_code,
      fullName: data.full_name,
      workshopSession: data.workshop_session,
      status: data.certificate_status,
    },
    { status: 200 }
  );
}
