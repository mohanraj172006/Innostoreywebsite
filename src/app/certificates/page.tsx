"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Download, FileCheck, ArrowRight } from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

export default function CertificatesPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      {/* ── Page Hero ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        <PageHeroBackground
          variant="academics"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
              CERTIFICATE SERVICES
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
              Certificate{" "}
              <span className="gold-gradient-text italic font-normal">Portal</span>
            </h1>
            <p className="text-base sm:text-lg text-[#999999] max-w-2xl mx-auto font-light leading-relaxed">
              Register for your certificate or access your certificate online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#000000]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ambient glow */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,215,0,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* ── Card 1: Register ────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="neon-card glass-shine group flex flex-col p-8 gap-6"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center group-hover:border-[#FFD700]/50 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300">
                <FileCheck className="w-7 h-7 text-[#FFD700]" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD700]">
                  STEP 1
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Register Certificate
                </h2>
                <p className="text-sm text-[#999999] font-light leading-relaxed">
                  Submit your details to register for your workshop or session
                  certificate. Your unique registration code will be generated
                  instantly.
                </p>
              </div>

              {/* Highlights */}
              <ul className="space-y-2">
                {[
                  "Instant unique code generation",
                  "Secure & private registration",
                  "One code per workshop",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#888]">
                    <span className="w-1 h-1 rounded-full bg-[#FFD700] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/certificates/register"
                className="btn-neon-solid mt-auto w-full justify-center py-3.5 text-xs"
              >
                <Award className="w-4 h-4" />
                Register Now
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
            </motion.div>

            {/* ── Card 2: Download ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="neon-card glass-shine group flex flex-col p-8 gap-6"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center group-hover:border-[#FFD700]/50 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300">
                <Download className="w-7 h-7 text-[#FFD700]" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FFD700]">
                  STEP 2
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Download Certificate
                </h2>
                <p className="text-sm text-[#999999] font-light leading-relaxed">
                  Already registered? Enter your certificate registration code
                  to check availability and securely download your certificate PDF.
                </p>
              </div>

              {/* Highlights */}
              <ul className="space-y-2">
                {[
                  "Private & secure PDF download",
                  "No account required",
                  "Real-time status check",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#888]">
                    <span className="w-1 h-1 rounded-full bg-[#FFD700] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/certificates/download"
                className="btn-neon mt-auto w-full justify-center py-3.5 text-xs"
              >
                <Download className="w-4 h-4" />
                Download Certificate
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
            </motion.div>
          </div>

          {/* ── Info note ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <p className="text-xs text-[#555] font-light">
              Certificates are issued by InnoStorey Innovations Pvt Ltd after successful workshop completion.
              For support, contact{" "}
              <a
                href="mailto:info@innostorey.in"
                className="text-[#FFD700] hover:underline"
              >
                info@innostorey.in
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
