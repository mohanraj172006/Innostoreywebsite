"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Search,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowLeft,
  FileText,
} from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LookupResult {
  found: boolean;
  registrationCode?: string;
  fullName?: string;
  workshopSession?: string;
  status?: "Pending" | "Available";
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DownloadCertificatePage() {
  const [code, setCode]               = useState("");
  const [searching, setSearching]     = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult]           = useState<LookupResult | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // ─── Lookup ────────────────────────────────────────────────────────────────
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setSearching(true);
    setResult(null);
    setError(null);
    setDownloadError(null);

    try {
      const res = await fetch(
        `/api/certificates/lookup?code=${encodeURIComponent(trimmed)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Lookup failed. Please try again.");
        return;
      }

      setResult(data as LookupResult);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSearching(false);
    }
  };

  // ─── Download ──────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!result?.registrationCode) return;
    setDownloading(true);
    setDownloadError(null);

    try {
      const res = await fetch(
        `/api/certificates/download?code=${encodeURIComponent(result.registrationCode)}`
      );
      const data = await res.json();

      if (!res.ok || !data.signedUrl) {
        setDownloadError(data.error ?? "Download failed. Please try again.");
        return;
      }

      // Trigger download using the short-lived signed URL
      const anchor = document.createElement("a");
      anchor.href = data.signedUrl;
      anchor.download = `InnoStorey_Certificate_${result.fullName?.replace(/\s+/g, "_") ?? "Certificate"}.pdf`;
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch {
      setDownloadError("Network error. Please check your connection and try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
                CERTIFICATE DOWNLOAD
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#F5F5F5] leading-tight mb-4">
              Download Your{" "}
              <span className="gold-gradient-text italic font-normal">Certificate</span>
            </h1>
            <p className="text-sm text-[#999999] max-w-2xl mx-auto font-light leading-relaxed">
              Enter your certificate registration code to check whether your
              certificate is available for download.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Lookup Form ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              id="certificate-lookup-form"
              onSubmit={handleSearch}
              className="neon-card p-8 space-y-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#FFD700]" />
                </div>
                <span className="text-sm text-[#666]">Enter your registration code</span>
              </div>

              <div>
                <label
                  htmlFor="cert-code-input"
                  className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#A8A8A8] mb-2"
                >
                  Registration Code
                </label>
                <input
                  id="cert-code-input"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    if (error) setError(null);
                    if (result) setResult(null);
                  }}
                  placeholder="ISI-2026-XXXX"
                  className="neon-input font-mono tracking-widest"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="mt-1.5 text-[10px] text-[#444]">
                  Format: ISI-YYYY-XXXX
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-3"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                id="search-certificate-btn"
                type="submit"
                disabled={searching || !code.trim()}
                className="btn-neon-solid w-full py-3.5 text-xs justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {searching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching…
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Certificate
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ── Result ──────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* NOT FOUND */}
                {!result.found && (
                  <div className="neon-card p-8 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-[#666]" />
                    </div>
                    <h2 className="font-serif text-xl font-light text-white">
                      Not Found
                    </h2>
                    <p className="text-xs text-[#777] font-light leading-relaxed max-w-sm mx-auto">
                      No registration was found for this code. Please check the
                      code and try again.
                    </p>
                    <Link
                      href="/certificates/register"
                      className="btn-neon text-xs px-6 py-2.5 inline-flex"
                    >
                      Register Now
                    </Link>
                  </div>
                )}

                {/* PENDING */}
                {result.found && result.status === "Pending" && (
                  <div className="neon-card p-8 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center animate-pulse-gold">
                      <Clock className="w-7 h-7 text-[#FFD700]" />
                    </div>
                    <h2 className="font-serif text-xl font-light text-white">
                      Certificate Pending
                    </h2>
                    <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-[#555] uppercase tracking-widest">
                        Registration Found
                      </p>
                      <p className="font-serif text-lg text-white">{result.fullName}</p>
                      <p className="text-xs text-[#777]">{result.workshopSession}</p>
                    </div>
                    <p className="text-xs text-[#777] font-light leading-relaxed max-w-sm mx-auto">
                      Your registration was found, but your certificate is{" "}
                      <strong className="text-[#FFD700]">not available yet</strong>.
                      Please check again later.
                    </p>
                  </div>
                )}

                {/* AVAILABLE */}
                {result.found && result.status === "Available" && (
                  <div className="neon-card p-8 text-center space-y-5">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#FFD700]" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl font-light text-white">
                        Your certificate is ready!
                      </h2>
                      <p className="text-xs text-[#777]">
                        Click below to securely download your certificate.
                      </p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-xl p-4 space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-xs text-[#555] uppercase tracking-widest">
                          Certificate Details
                        </span>
                      </div>
                      <p className="font-serif text-lg text-white">{result.fullName}</p>
                      <p className="text-xs text-[#777]">{result.workshopSession}</p>
                      <p className="text-[10px] text-[#444] font-mono mt-1">
                        {result.registrationCode}
                      </p>
                    </div>

                    {/* Download error */}
                    <AnimatePresence>
                      {downloadError && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2 bg-red-900/20 border border-red-500/30 rounded-xl p-3 text-left"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-red-300">{downloadError}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      id="download-certificate-btn"
                      onClick={handleDownload}
                      disabled={downloading}
                      className="btn-neon-solid w-full py-4 text-xs justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {downloading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Preparing Download…
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Certificate PDF
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-[#444]">
                      The download link expires in 60 seconds for your security.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-[10px] text-[#444]"
          >
            Don&apos;t have a registration code?{" "}
            <Link href="/certificates/register" className="text-[#FFD700] hover:underline">
              Register here
            </Link>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
