/**
 * Admin API — Upload certificate PDF
 * POST /api/admin/certificates/upload
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { CertificateRegistration } from "@/lib/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function verifyAdmin(req: NextRequest): Promise<{ ok: boolean; error?: string }> {
  if (!ADMIN_EMAIL) return { ok: false, error: "Admin email not configured." };
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return { ok: false, error: "Unauthorized — missing auth token." };

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { ok: false, error: "Unauthorized — invalid session." };
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase())
    return { ok: false, error: "Forbidden — insufficient privileges." };
  return { ok: true };
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const registrationId = String(formData.get("id") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!registrationId || !/^[0-9a-f-]{36}$/.test(registrationId)) {
    return NextResponse.json({ error: "Invalid registration ID." }, { status: 400 });
  }

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum size is 10 MB." }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  type RegRow = Pick<CertificateRegistration, "id" | "registration_code" | "certificate_path" | "certificate_status">;

  const { data: reg, error: regError } = await supabase
    .from("certificate_registrations")
    .select("id, registration_code, certificate_path, certificate_status")
    .eq("id", registrationId)
    .maybeSingle<RegRow>();

  if (regError || !reg) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  const oldPath = reg.certificate_path;
  const timestamp = Date.now();
  const storagePath = `${reg.registration_code}/${timestamp}.pdf`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(storagePath, arrayBuffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    console.error("[CertUpload] Storage upload error:", uploadError.message);
    return NextResponse.json(
      { error: "File upload failed. Please try again." },
      { status: 500 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData = {
    certificate_path:   storagePath,
    certificate_status: "Available",
  } as unknown as never;

  const { error: updateError } = await supabase
    .from("certificate_registrations")
    .update(updateData)
    .eq("id", registrationId);

  if (updateError) {
    console.error("[CertUpload] DB update error:", updateError.message);
    await supabase.storage.from("certificates").remove([storagePath]);
    return NextResponse.json(
      { error: "Database update failed. The upload has been reversed." },
      { status: 500 }
    );
  }

  if (oldPath && oldPath !== storagePath) {
    const { error: removeError } = await supabase.storage
      .from("certificates")
      .remove([oldPath]);
    if (removeError) {
      console.warn("[CertUpload] Could not remove old file:", oldPath, removeError.message);
    }
  }

  return NextResponse.json(
    { success: true, storagePath, registrationCode: reg.registration_code },
    { status: 200 }
  );
}
