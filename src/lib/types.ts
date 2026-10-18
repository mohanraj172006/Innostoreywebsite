/**
 * TypeScript type definitions for the certificate_registrations Supabase table.
 * These types let us use the Supabase client with full type safety.
 */

export interface CertificateRegistration {
  id: string;
  registration_code: string;
  register_number: string;
  full_name: string;
  phone_number: string;
  email: string;
  college_name: string;
  workshop_session: string;
  certificate_path: string | null;
  certificate_status: "Pending" | "Available";
  created_at: string;
  updated_at: string;
}

export type CertRegistrationInsert = Omit<
  CertificateRegistration,
  "id" | "created_at" | "updated_at"
> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};
