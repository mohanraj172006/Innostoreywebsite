"use client";

import Image from "next/image";
import { Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LinkedinIcon } from "./SocialIcons";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedin?: string;
  email?: string;
  isFounder?: boolean;
  badge?: string;
}

export default function TeamCard({
  name,
  role,
  image,
  bio,
  linkedin,
  email,
  isFounder = false,
  badge,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`neon-card group flex flex-col w-full rounded-2xl overflow-hidden h-[500px] sm:h-[530px] ${
        isFounder || badge
          ? "border-[rgba(255,215,0,0.35)] shadow-[0_0_25px_rgba(255,215,0,0.08)]"
          : ""
      }`}
    >
      {/* Photo — top 70% of card */}
      <div className="relative w-full flex-[7] overflow-hidden bg-[#0A0A0A]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="eager"
          className="object-cover object-top transition-transform duration-600 ease-out group-hover:scale-105"
        />
        {/* Subtle gradient at image bottom only */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111111] to-transparent" />
        {/* Gold tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,215,0,0.07)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Founder / Executive badge */}
        {(isFounder || badge) && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 text-[8px] uppercase font-bold tracking-[0.2em] text-black px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FFF000] to-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.5)]">
            <Sparkles className="w-2.5 h-2.5" /> {badge || "Founder"}
          </div>
        )}
      </div>

      {/* Info — bottom 30% */}
      <div className="flex-[3] p-4 sm:p-5 flex flex-col justify-between bg-[#0D0D0D] border-t border-[#1A1A1A]">
        <div className="space-y-1.5">
          <h3 className="font-serif text-lg font-light text-white group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
            {name}
          </h3>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD700]">
            {role}
          </p>
          {bio && (
            <p className="text-[11px] text-[#888888] leading-relaxed font-light line-clamp-2 mt-1.5">
              {bio}
            </p>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#222] mt-3">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#222] text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all duration-300"
            >
              <LinkedinIcon className="w-3 h-3" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#222] text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all duration-300"
            >
              <Mail className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Neon bottom line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
    </motion.div>
  );
}
