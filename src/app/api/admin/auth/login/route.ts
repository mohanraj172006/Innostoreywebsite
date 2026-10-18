/**
 * Admin API — Auth: Sign in / Sign out
 * POST /api/admin/auth/login   { email, password }
 * POST /api/admin/auth/logout
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabasePublic } from "@/lib/supabase-public";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export async function POST(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // ─── LOGOUT ─────────────────────────────────────────────────────────────
  if (url.endsWith("/logout")) {
    return NextResponse.json({ success: true });
  }

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email    = String(body.email    ?? "").trim().toLowerCase();
  const password = String(body.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  if (!ADMIN_EMAIL || email !== ADMIN_EMAIL.toLowerCase()) {
    // Return the same generic error as a wrong password to avoid user enumeration
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const supabase = getSupabasePublic();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    console.error("[AdminAuth] Login failed:", error?.message);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  return NextResponse.json(
    {
      accessToken: data.session.access_token,
      email: data.user?.email,
    },
    { status: 200 }
  );
}
