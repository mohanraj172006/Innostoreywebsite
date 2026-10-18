"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  title: string;
  description?: string;
  image: string;
  duration?: string;
  level?: string;
  rating?: number;
  category?: string;
  link?: string;
  // legacy academics page props (displayed as meta info when description is absent)
  fees?: string;
  schedule?: string;
}

export default function CourseCard({
  title,
  description,
  image,
  duration = "8–12 Weeks",
  level = "All Levels",
  rating = 4.8,
  category = "COURSE",
  link = "#enroll-section",
  fees,
  schedule,
}: CourseCardProps) {
  const displayDescription = description || (fees ? `${fees}${schedule ? ` · ${schedule}` : ""}` : "");

  const handleEnrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (link === "#enroll-section" || link.endsWith("#enroll-section") || link === "/academics") {
      const target = document.getElementById("enroll-section");
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "#enroll-section");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="neon-card group flex flex-col justify-between"
    >
      {/* Image */}
      <div className="relative w-full h-44 bg-[#0A0A0A] overflow-hidden rounded-t-[15px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
        <div className="absolute inset-0 bg-[rgba(255,215,0,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="glass-neon text-[9px] font-bold uppercase tracking-[0.2em] text-[#FFD700] px-2.5 py-1 rounded-full border border-[rgba(255,215,0,0.35)]">
            {category}
          </span>
        </div>


      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-serif text-lg font-light text-white leading-snug group-hover:text-[#FFD700] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-[#A8A8A8] leading-relaxed font-light line-clamp-2">
          {displayDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[10px] text-[#666] font-medium pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#FFD700]" /> {duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-[#FFD700]" /> {level}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={link}
          onClick={handleEnrollClick}
          className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD700] group/cta cursor-pointer"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#FFD700] group-hover/cta:after:w-full after:transition-all after:duration-300 after:shadow-[0_0_6px_rgba(255,215,0,0.5)]">
            Enroll Now
          </span>
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_6px_rgba(255,215,0,0.5)]" />
    </motion.div>
  );
}
