/**
 * GET /api/certificates/download?code=CERT-2026-XXXXXX
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { CertificateRegistration } from "@/lib/types";

const SIGNED_URL_EXPIRES_IN = 60;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
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
    return NextResponse.json({ error: "Too many download requests. Please wait." }, { status: 429 });
  }

  const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase() ?? "";

  if (!code || !isValidCodeFormat(code)) {
    return NextResponse.json({ error: "Invalid registration code." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  type DownloadRow = Pick<CertificateRegistration, "registration_code" | "full_name" | "certificate_status" | "certificate_path">;

  const { data, error } = await supabase
    .from("certificate_registrations")
    .select("registration_code, full_name, certificate_status, certificate_path")
    .eq("registration_code", code)
    .maybeSingle<DownloadRow>();

  if (error) {
    console.error("[CertDownload] DB error:", error.code, error.message);
    return NextResponse.json({ error: "Download request failed. Please try again." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  if (data.certificate_status !== "Available") {
    return NextResponse.json(
      { error: "Certificate is not yet available for download." },
      { status: 403 }
    );
  }

  if (!data.certificate_path) {
    console.error("[CertDownload] Status is Available but certificate_path is null for code:", code);
    return NextResponse.json(
      { error: "Certificate file is temporarily unavailable. Please contact support." },
      { status: 503 }
    );
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from("certificates")
    .createSignedUrl(data.certificate_path, SIGNED_URL_EXPIRES_IN, {
      download: `InnoStorey_Certificate_${data.full_name.replace(/\s+/g, "_")}.pdf`,
    });

  if (signedError || !signedData?.signedUrl) {
    console.error("[CertDownload] Signed URL error:", signedError?.message);
    return NextResponse.json(
      { error: "Could not generate download link. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      signedUrl: signedData.signedUrl,
      expiresIn: SIGNED_URL_EXPIRES_IN,
    },
    { status: 200 }
  );
}
