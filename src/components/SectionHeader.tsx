"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      {/* Label */}
      <div className={`flex items-center gap-3 mb-5 ${centered ? "justify-center" : ""}`}>
        <span className="w-8 h-px bg-[#FFD700] shadow-[0_0_6px_rgba(255,215,0,0.6)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700] glow-sm">
          {label}
        </span>
        <span className="w-8 h-px bg-[#FFD700] shadow-[0_0_6px_rgba(255,215,0,0.6)]" />
      </div>

      {/* Title */}
      <h2
        className={`font-serif text-4xl md:text-5xl font-light leading-tight mb-4 ${
          centered ? "max-w-3xl mx-auto" : "max-w-2xl"
        }`}
      >
        <span className="gold-gradient-text-2">{title}</span>
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`text-sm md:text-base text-[#A8A8A8] leading-relaxed font-light max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
