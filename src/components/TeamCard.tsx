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
}

export default function TeamCard({
  name,
  role,
  image,
  bio,
  linkedin,
  email,
  isFounder = false,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`neon-card group overflow-hidden ${
        isFounder
          ? "border-[rgba(255,215,0,0.35)] shadow-[0_0_25px_rgba(255,215,0,0.08)]"
          : ""
      }`}
    >
      {/* Founder badge */}
      {isFounder && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-[8px] uppercase font-bold tracking-[0.2em] text-black px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FFF000] to-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.5)]">
          <Sparkles className="w-2.5 h-2.5" /> Founder
        </div>
      )}

      {/* Photo */}
      <div className="relative w-full h-64 overflow-hidden bg-[#0A0A0A] rounded-t-[15px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-600 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        {/* Gold tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,215,0,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Info */}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="font-serif text-xl font-light text-white group-hover:text-[#FFD700] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFD700] mt-1">
            {role}
          </p>
        </div>

        {bio && (
          <p className="text-xs text-[#A8A8A8] leading-relaxed font-light line-clamp-3">
            {bio}
          </p>
        )}

        {/* Social links */}
        <div className="flex items-center gap-3 pt-1 border-t border-[#222]">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#222] text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all duration-300"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#222] text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Neon bottom line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
    </motion.div>
  );
}
