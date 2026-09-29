"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon?: ReactNode;
  category?: string;
  link?: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  icon,
  category = "SERVICE",
  link = "/services",
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="neon-card group"
    >
      {/* Image area */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-[15px] bg-[#0A0A0A]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,215,0,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className="glass-neon text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD700] px-3 py-1.5 rounded-full border border-[rgba(255,215,0,0.35)]">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4">
        {/* Icon + Title row */}
        <div className="flex items-start gap-3">
          {icon && (
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center text-[#FFD700] transition-all duration-300 group-hover:border-[rgba(255,215,0,0.5)] group-hover:shadow-[0_0_12px_rgba(255,215,0,0.2)] group-hover:text-[#FFF000]">
              {icon}
            </div>
          )}
          <h3 className="font-serif text-xl font-light text-white leading-snug group-hover:text-[#FFD700] transition-colors duration-300">
            {title}
          </h3>
        </div>

        <p className="text-xs text-[#A8A8A8] leading-relaxed font-light">
          {description}
        </p>

        {/* CTA */}
        <Link
          href={link}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700] group/link"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#FFD700] after:shadow-[0_0_6px_rgba(255,215,0,0.5)] group-hover/link:after:w-full after:transition-all after:duration-300">
            Learn More
          </span>
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Bottom neon line on hover */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
    </motion.div>
  );
}
