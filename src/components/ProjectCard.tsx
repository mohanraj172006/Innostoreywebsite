"use client";

import Image from "next/image";
import { ExternalLink, CheckCircle2, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category?: string;
  technologies?: string[];
  features?: string[];
  outcomes?: string;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  category = "FEATURED PROJECT",
  technologies = [],
  features = [],
  outcomes,
  link = "/contact",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="neon-card group flex flex-col justify-between"
    >
      {/* Image */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-[15px] bg-[#0A0A0A]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,215,0,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="glass-neon text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD700] px-3 py-1.5 rounded-full border border-[rgba(255,215,0,0.35)]">
            {category}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col gap-4 flex-1">
        <h3 className="font-serif text-xl font-light text-white leading-snug group-hover:text-[#FFD700] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-xs text-[#A8A8A8] leading-relaxed font-light">
          {description}
        </p>

        {/* Tech stack */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FFD700] bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] px-2.5 py-1 rounded-md"
              >
                <Cpu className="w-2.5 h-2.5" /> {tech}
              </span>
            ))}
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-1.5">
            {features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#A8A8A8]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Outcomes */}
        {outcomes && (
          <p className="text-xs text-[#FFD700] font-medium border-l-2 border-[#FFD700] pl-3">
            {outcomes}
          </p>
        )}

        {/* CTA */}
        <Link
          href={link}
          className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700] hover:text-[#FFF000] transition-colors duration-200 group/cta"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#FFD700] after:shadow-[0_0_6px_rgba(255,215,0,0.5)] group-hover/cta:after:w-full after:transition-all after:duration-300">
            View Project
          </span>
          <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </div>

      {/* Neon bottom line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
    </motion.div>
  );
}
