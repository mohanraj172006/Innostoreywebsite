/**
 * Database schema SQL for certificate_registrations table.
 * Run this in your Supabase SQL Editor to create the required table,
 * indexes, and Row Level Security policies.
 *
 * INSTRUCTIONS:
 *  1. Open your Supabase project dashboard.
 *  2. Navigate to SQL Editor.
 *  3. Paste the entire contents of this file and click "Run".
 */

-- ─── 1. ENABLE UUID EXTENSION (already enabled by default in Supabase) ─────
create extension if not exists "pgcrypto";

-- ─── 2. CREATE MAIN TABLE ────────────────────────────────────────────────────
create table if not exists certificate_registrations (
  id                  uuid primary key default gen_random_uuid(),
  registration_code   text unique not null,
  register_number     text not null,
  full_name           text not null,
  phone_number        text not null,
  email               text not null,
  college_name        text not null,
  workshop_session    text not null,
  certificate_path    text,                           -- private storage object path, nullable until uploaded
  certificate_status  text not null default 'Pending' check (certificate_status in ('Pending', 'Available')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table certificate_registrations is
  'Stores student certificate registrations. certificate_path is a private Supabase Storage path populated by an admin after uploading the PDF.';

-- ─── 3. UNIQUE CONSTRAINT: one registration per (register_number, workshop_session) ─
-- Prevents the same student registering for the same workshop twice.
-- A student can still register for different workshops.
create unique index if not exists uq_cert_reg_student_workshop
  on certificate_registrations (lower(register_number), lower(workshop_session));

-- ─── 4. INDEXES ──────────────────────────────────────────────────────────────
create index if not exists idx_cert_reg_code      on certificate_registrations (registration_code);
create index if not exists idx_cert_reg_email     on certificate_registrations (email);
create index if not exists idx_cert_reg_status    on certificate_registrations (certificate_status);
create index if not exists idx_cert_reg_created   on certificate_registrations (created_at desc);

-- ─── 5. UPDATED_AT TRIGGER ───────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cert_reg_updated_at on certificate_registrations;
create trigger trg_cert_reg_updated_at
  before update on certificate_registrations
  for each row execute function set_updated_at();

-- ─── 6. ENABLE ROW LEVEL SECURITY ────────────────────────────────────────────
alter table certificate_registrations enable row level security;

-- ─── 7. RLS POLICIES ─────────────────────────────────────────────────────────
-- Drop existing policies first (idempotent re-run safety)
drop policy if exists "deny_all_anon"          on certificate_registrations;
drop policy if exists "admin_all"              on certificate_registrations;

-- 7a. DENY all anonymous access by default (belt + suspenders — RLS being enabled already blocks by default)
--     Explicitly documented so intent is clear.

-- 7b. ADMIN / SERVER-SIDE ACCESS
-- Allow the service_role full access (used by server-side API Route Handlers)
drop policy if exists "service_role_all" on certificate_registrations;
create policy "service_role_all" on certificate_registrations
  for all to service_role using (true) with check (true);

-- NOTE: Public registration INSERT and public lookup SELECT are handled exclusively
-- through server-side API Route Handlers that use the service-role client.
-- Direct anon key access is blocked by RLS default deny.

-- ─── 8. CONFIRM ──────────────────────────────────────────────────────────────
-- pg_tables has the rowsecurity column; information_schema.tables does not.
select
  tablename,
  rowsecurity
from pg_tables
where tablename = 'certificate_registrations';
