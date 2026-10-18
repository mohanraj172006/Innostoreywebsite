/**
 * POST /api/certificates/register
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { CertificateRegistration } from "@/lib/types";

function generateRegistrationCode(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ISI-${year}-${suffix}`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^\+?[\d\s\-(]{7,20}$/.test(phone) && phone.replace(/\D/g, "").length >= 7;
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
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

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const registerNumber   = String(body.registerNumber   ?? "").trim();
  const fullName         = String(body.fullName         ?? "").trim();
  const phoneNumber      = String(body.phoneNumber      ?? "").trim();
  const email            = String(body.email            ?? "").trim().toLowerCase();
  const collegeName      = String(body.collegeName      ?? "").trim();
  const workshopSession  = String(body.workshopSession  ?? "").trim();

  const errors: Record<string, string> = {};
  if (!registerNumber || registerNumber.length > 50)
    errors.registerNumber = "Register number is required (max 50 characters).";
  if (!fullName || fullName.length < 2 || fullName.length > 120)
    errors.fullName = "Full name is required (2–120 characters).";
  if (!phoneNumber || !validatePhone(phoneNumber))
    errors.phoneNumber = "Enter a valid phone number (7–15 digits).";
  if (!email || !validateEmail(email) || email.length > 254)
    errors.email = "Enter a valid email address.";
  if (!collegeName || collegeName.length < 2 || collegeName.length > 200)
    errors.collegeName = "College name is required (2–200 characters).";
  if (!workshopSession || workshopSession.length < 2 || workshopSession.length > 200)
    errors.workshopSession = "Workshop / Session is required (2–200 characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const supabase = getSupabaseAdmin();

  // Duplicate check
  const { data: existing } = await supabase
    .from("certificate_registrations")
    .select("id, registration_code")
    .ilike("register_number", registerNumber)
    .ilike("workshop_session", workshopSession)
    .maybeSingle<Pick<CertificateRegistration, "id" | "registration_code">>();

  if (existing) {
    return NextResponse.json(
      {
        error:
          "A registration already exists for this register number and workshop. " +
          "Your registration code is: " + existing.registration_code,
        isDuplicate: true,
        registrationCode: existing.registration_code,
      },
      { status: 409 }
    );
  }

  // Generate unique code
  let registrationCode = "";
  let attempts = 0;
  while (attempts < 10) {
    const candidate = generateRegistrationCode();
    const { data: clash } = await supabase
      .from("certificate_registrations")
      .select("id")
      .eq("registration_code", candidate)
      .maybeSingle<Pick<CertificateRegistration, "id">>();
    if (!clash) {
      registrationCode = candidate;
      break;
    }
    attempts++;
  }

  if (!registrationCode) {
    console.error("[CertReg] Failed to generate unique code after 10 attempts");
    return NextResponse.json(
      { error: "Registration failed due to a server error. Please try again." },
      { status: 500 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertData: any = {
    registration_code:  registrationCode,
    register_number:    registerNumber,
    full_name:          fullName,
    phone_number:       phoneNumber,
    email,
    college_name:       collegeName,
    workshop_session:   workshopSession,
    certificate_status: "Pending",
  };

  const { data: inserted, error: insertError } = await supabase
    .from("certificate_registrations")
    .insert(insertData)
    .select("id, registration_code, full_name, workshop_session, created_at")
    .single<Pick<CertificateRegistration, "id" | "registration_code" | "full_name" | "workshop_session" | "created_at">>();

  if (insertError || !inserted) {
    console.error("[CertReg] Insert error:", insertError?.code, insertError?.message);
    if (insertError?.code === "23505") {
      return NextResponse.json(
        { error: "A registration for this student and workshop already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Registration could not be saved. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      registrationCode: inserted.registration_code,
      fullName: inserted.full_name,
      workshopSession: inserted.workshop_session,
    },
    { status: 201 }
  );
}
