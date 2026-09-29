"use client";

import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  subtitle?: string;
  price?: string;
  features: string[];
  ctaText?: string;
  isPopular?: boolean;
  category?: string;
}

export default function PricingCard({
  title,
  subtitle,
  price,
  features,
  ctaText = "Get Started",
  isPopular = false,
  category = "SOLUTION PACKAGE",
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-350 group overflow-hidden ${
        isPopular
          ? "bg-[#0D0D0D] border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.2),0_0_80px_rgba(255,215,0,0.06)] scale-[1.02]"
          : "bg-[#111111] border-[#222222] hover:border-[rgba(255,215,0,0.45)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,215,0,0.12)] hover:-translate-y-2"
      }`}
    >
      {/* Ambient orb */}
      <div
        className={`absolute w-48 h-48 rounded-full -bottom-16 -right-16 pointer-events-none filter blur-[60px] transition-opacity duration-500 ${
          isPopular ? "opacity-20 bg-[radial-gradient(circle,rgba(255,215,0,0.8)_0%,transparent_70%)]" : "opacity-0 group-hover:opacity-10 bg-[radial-gradient(circle,rgba(255,215,0,0.8)_0%,transparent_70%)]"
        }`}
      />
      {/* Shine sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,215,0,0.3)] to-transparent" />
      </div>

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-[0.2em] text-black px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFF000] via-[#FFD700] to-[#F5A623] shadow-[0_0_20px_rgba(255,215,0,0.5)]">
          <Sparkles className="w-2.5 h-2.5" /> Best Choice
        </div>
      )}

      <div className="space-y-6">
        {/* Category */}
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFD700]">
          {category}
        </span>

        {/* Title & subtitle */}
        <div>
          <h3 className="font-serif text-2xl font-light text-white">{title}</h3>
          {subtitle && <p className="text-xs text-[#666] mt-1 leading-relaxed">{subtitle}</p>}
        </div>

        {/* Price */}
        {price && (
          <div className="flex items-baseline gap-1 border-t border-[#222] pt-4">
            <span className="text-3xl font-bold text-[#FFD700] glow-sm">{price}</span>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-[#A8A8A8]">
              <Check className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/contact"
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            isPopular
              ? "btn-neon-solid"
              : "btn-neon"
          }`}
        >
          {ctaText}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
