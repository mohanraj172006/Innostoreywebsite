"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  registerNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  collegeName: string;
  workshopSession: string;
}

interface FieldErrors {
  registerNumber?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  collegeName?: string;
  workshopSession?: string;
}

interface SuccessData {
  registrationCode: string;
  fullName: string;
  workshopSession: string;
}

// ─── Initial state ────────────────────────────────────────────────────────────
const EMPTY_FORM: FormState = {
  registerNumber: "",
  fullName: "",
  phoneNumber: "",
  email: "",
  collegeName: "",
  workshopSession: "",
};

// ─── Label component ──────────────────────────────────────────────────────────
function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#A8A8A8] mb-2"
    >
      {children} <span className="text-[#FFD700]">*</span>
    </label>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RegisterCertificatePage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [copied, setCopied] = useState(false);
  const submitRef = useRef(false); // Prevent double submit

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (globalError) setGlobalError(null);
  };

  const copyCode = async () => {
    if (!success?.registrationCode) return;
    try {
      await navigator.clipboard.writeText(success.registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = success.registrationCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitRef.current) return;

    setFieldErrors({});
    setGlobalError(null);
    setSubmitting(true);
    submitRef.current = true;

    try {
      const res = await fetch("/api/certificates/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registerNumber:  form.registerNumber.trim(),
          fullName:        form.fullName.trim(),
          phoneNumber:     form.phoneNumber.trim(),
          email:           form.email.trim(),
          collegeName:     form.collegeName.trim(),
          workshopSession: form.workshopSession.trim(),
        }),
      });

      const data = await res.json();

      if (res.status === 422 && data.errors) {
        setFieldErrors(data.errors);
        return;
      }

      if (res.status === 409) {
        setGlobalError(data.error ?? "A registration already exists for this student and workshop.");
        return;
      }

      if (!res.ok || !data.success) {
        setGlobalError(data.error ?? "Registration failed. Please try again.");
        return;
      }

      setSuccess({
        registrationCode: data.registrationCode,
        fullName:         data.fullName,
        workshopSession:  data.workshopSession,
      });
    } catch {
      setGlobalError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
      submitRef.current = false;
    }
  };

  // ─── Success Screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="bg-[#000000] text-[#F5F5F5] min-h-screen py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="neon-card p-8 sm:p-12 text-center space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center animate-pulse-gold">
                <CheckCircle2 className="w-10 h-10 text-[#FFD700]" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-white">
                Registration{" "}
                <span className="gold-gradient-text italic">Successful!</span>
              </h1>
              <p className="text-sm text-[#999] font-light leading-relaxed max-w-md mx-auto">
                Your certificate registration has been received successfully.
                Please save your registration code to check your certificate
                status and download your certificate when it becomes available.
              </p>
            </div>

            {/* Registration code */}
            <div className="bg-[#0A0A0A] border border-[#FFD700]/30 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666]">
                Your Registration Code
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFD700] glow-sm tracking-wider">
                {success.registrationCode}
              </div>
              <div className="text-xs text-[#555]">
                {success.fullName} · {success.workshopSession}
              </div>
            </div>

            {/* Status note */}
            <div className="flex items-start gap-3 bg-[#111]/80 border border-[#FFD700]/15 rounded-xl p-4 text-left">
              <AlertCircle className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
              <p className="text-xs text-[#777] font-light leading-relaxed">
                Your certificate is currently{" "}
                <strong className="text-[#FFD700]">Pending</strong>. It will
                become available once an InnoStorey administrator uploads and
                assigns it to your registration. You will be able to download it
                using the code above.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="copy-registration-code-btn"
                onClick={copyCode}
                className="btn-neon flex-1 py-3.5 text-xs justify-center"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFD700]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Registration Code
                  </>
                )}
              </button>
              <Link
                href="/certificates/download"
                className="btn-neon-solid flex-1 py-3.5 text-xs justify-center"
              >
                <Download className="w-4 h-4" />
                Go to Download Certificate
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Registration Form ──────────────────────────────────────────────────────
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        <PageHeroBackground
          variant="academics"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/certificates"
              className="inline-flex items-center gap-1.5 text-xs text-[#666] hover:text-[#FFD700] transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Certificate Portal
            </Link>
            <div className="block mb-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30">
                CERTIFICATE REGISTRATION
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#F5F5F5] leading-tight mb-4">
              Register Your{" "}
              <span className="gold-gradient-text italic font-normal">Certificate</span>
            </h1>
            <p className="text-sm text-[#999999] max-w-2xl mx-auto font-light leading-relaxed">
              Please complete the form below with your correct details to register
              for your certificate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Global error */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300 font-light">{globalError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              id="certificate-registration-form"
              onSubmit={handleSubmit}
              noValidate
              className="neon-card p-8 sm:p-10 space-y-6"
            >
              {/* Icon header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-[#FFD700]" />
                </div>
                <span className="text-sm text-[#666]">Fill in all fields below</span>
              </div>

              {/* ── Register Number ──────────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="registerNumber">Register Number</FieldLabel>
                <input
                  id="registerNumber"
                  name="registerNumber"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your register number"
                  value={form.registerNumber}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.registerNumber ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.registerNumber ? "err-registerNumber" : undefined}
                  aria-invalid={!!fieldErrors.registerNumber}
                />
                {fieldErrors.registerNumber && (
                  <p id="err-registerNumber" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.registerNumber}
                  </p>
                )}
              </div>

              {/* ── Full Name ────────────────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.fullName ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
                  aria-invalid={!!fieldErrors.fullName}
                />
                {fieldErrors.fullName && (
                  <p id="err-fullName" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              {/* ── Phone Number ─────────────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.phoneNumber ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.phoneNumber ? "err-phoneNumber" : undefined}
                  aria-invalid={!!fieldErrors.phoneNumber}
                />
                {fieldErrors.phoneNumber && (
                  <p id="err-phoneNumber" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.phoneNumber}
                  </p>
                )}
              </div>

              {/* ── Email ────────────────────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.email ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.email ? "err-email" : undefined}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <p id="err-email" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* ── College Name ─────────────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="collegeName">College Name</FieldLabel>
                <input
                  id="collegeName"
                  name="collegeName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Enter your college name"
                  value={form.collegeName}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.collegeName ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.collegeName ? "err-collegeName" : undefined}
                  aria-invalid={!!fieldErrors.collegeName}
                />
                {fieldErrors.collegeName && (
                  <p id="err-collegeName" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.collegeName}
                  </p>
                )}
              </div>

              {/* ── Workshop / Session ───────────────────────────────────── */}
              <div>
                <FieldLabel htmlFor="workshopSession">Workshop / Session</FieldLabel>
                <input
                  id="workshopSession"
                  name="workshopSession"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter the workshop or session name"
                  value={form.workshopSession}
                  onChange={handleChange}
                  className={`neon-input ${fieldErrors.workshopSession ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : ""}`}
                  aria-describedby={fieldErrors.workshopSession ? "err-workshopSession" : undefined}
                  aria-invalid={!!fieldErrors.workshopSession}
                />
                {fieldErrors.workshopSession && (
                  <p id="err-workshopSession" className="mt-1.5 text-xs text-red-400">
                    {fieldErrors.workshopSession}
                  </p>
                )}
              </div>

              {/* ── Submit ───────────────────────────────────────────────── */}
              <button
                id="submit-registration-btn"
                type="submit"
                disabled={submitting}
                className="btn-neon-solid w-full py-4 text-xs justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    Submit Registration
                  </>
                )}
              </button>

              {/* Required note */}
              <p className="text-center text-[10px] text-[#444] font-light">
                All fields marked <span className="text-[#FFD700]">*</span> are required.
                Your data is stored securely and never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
