"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sparkles, ChevronDown } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
}

const primaryNavLinks: NavLinkItem[] = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Academics",  href: "/academics" },
  { label: "Projects",   href: "/projects" },
  { label: "Sales",      href: "/sales" },
  { label: "Careers",    href: "/careers" },
  { label: "Contact",    href: "/contact" },
];

const moreNavLinks: NavLinkItem[] = [
  { label: "Leadership", href: "/leadership" },
  { label: "FAQ",        href: "/faq" },
  { label: "Terms",      href: "/terms" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMoreActive = moreNavLinks.some((l) => pathname === l.href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 sm:py-4 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* ── Brand Logo ── */}
        <Link
          href="/"
          className="pointer-events-auto group flex items-center focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-normal text-white tracking-wide transition-all duration-300 group-hover:text-[#FFD700]">
            Inno<span className="text-[#FFD700] glow-sm">Storey</span>
          </span>
        </Link>

        {/* ── Desktop Capsule Pill Navigation with Glowing Top Lamp ── */}
        <div className="hidden lg:flex items-center justify-center pointer-events-auto">
          <nav
            aria-label="Main Navigation"
            className={`relative flex items-center p-1.5 rounded-full transition-all duration-300 overflow-visible ${
              isScrolled
                ? "bg-[#0c0c0e]/95 border border-[rgba(255,215,0,0.25)] shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(255,215,0,0.1)] backdrop-blur-xl"
                : "bg-[#0e0e11]/85 border border-[rgba(255,215,0,0.18)] shadow-[0_8px_28px_rgba(0,0,0,0.8),0_0_15px_rgba(255,215,0,0.06)] backdrop-blur-md"
            }`}
          >
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-250 select-none z-10 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#A8A8A8] hover:text-[#FFF000]"
                  }`}
                >
                  {/* Sliding Active Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-[#18150c] border border-[rgba(255,215,0,0.38)] shadow-[inset_0_1px_2px_rgba(255,215,0,0.25),0_2px_12px_rgba(0,0,0,0.7)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}

                  {/* Glowing Top Lamp Bar above the Active Tab */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-lamp"
                      className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-8 sm:w-9 h-[4px] rounded-full bg-gradient-to-r from-[#FFE066] via-[#FFFFFF] to-[#FFE066] shadow-[0_0_8px_2px_#FFF000,0_0_18px_5px_rgba(255,215,0,0.75),0_0_35px_10px_rgba(255,215,0,0.35)] z-20 pointer-events-none"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    >
                      {/* Downward diffused spotlight beam radiating onto the tab */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-7 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.4)_0%,rgba(255,215,0,0.12)_45%,transparent_75%)] pointer-events-none blur-[2px]" />
                    </motion.div>
                  )}

                  <span
                    className="relative z-10"
                    style={{
                      textShadow: isActive
                        ? "0 0 12px rgba(255, 215, 0, 0.45), 0 1px 2px rgba(0,0,0,0.8)"
                        : "none",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}

            {/* "More" dropdown for secondary pages */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`relative flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium transition-colors duration-250 select-none z-10 ${
                  isMoreActive
                    ? "text-white font-semibold"
                    : "text-[#A8A8A8] hover:text-[#FFF000]"
                }`}
                aria-expanded={moreDropdownOpen}
              >
                {/* Active Pill if one of moreNavLinks is currently active */}
                {isMoreActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-[#18150c] border border-[rgba(255,215,0,0.38)] shadow-[inset_0_1px_2px_rgba(255,215,0,0.25),0_2px_12px_rgba(0,0,0,0.7)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}

                {/* Top Lamp if active */}
                {isMoreActive && (
                  <motion.div
                    layoutId="navbar-active-lamp"
                    className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-8 sm:w-9 h-[4px] rounded-full bg-gradient-to-r from-[#FFE066] via-[#FFFFFF] to-[#FFE066] shadow-[0_0_8px_2px_#FFF000,0_0_18px_5px_rgba(255,215,0,0.75),0_0_35px_10px_rgba(255,215,0,0.35)] z-20 pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-7 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.4)_0%,rgba(255,215,0,0.12)_45%,transparent_75%)] pointer-events-none blur-[2px]" />
                  </motion.div>
                )}

                <span className="relative z-10">More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 relative z-10 transition-transform duration-250 ${
                    moreDropdownOpen ? "rotate-180 text-[#FFD700]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-3 w-44 rounded-2xl bg-[#0c0c0e]/95 border border-[rgba(255,215,0,0.25)] shadow-[0_16px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(255,215,0,0.1)] backdrop-blur-xl p-1.5 z-30"
                  >
                    {moreNavLinks.map((item) => {
                      const isItemActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                            isItemActive
                              ? "bg-[rgba(255,215,0,0.12)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]"
                              : "text-[#A8A8A8] hover:bg-[rgba(255,215,0,0.06)] hover:text-[#FFF000]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isItemActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_6px_#FFD700]" />
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        {/* ── Right CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#FFD700] border border-[rgba(255,215,0,0.35)] bg-[#0d0d10]/90 backdrop-blur-md shadow-[0_0_12px_rgba(255,215,0,0.12)] hover:border-[#FFD700] hover:text-[#FFF000] hover:shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>Consult</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#0d0d10]/90 border border-[rgba(255,215,0,0.3)] text-[#FFD700] hover:border-[#FFD700] hover:shadow-[0_0_14px_rgba(255,215,0,0.3)] transition-all duration-300 touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden mt-3 w-full max-w-md mx-auto pointer-events-auto rounded-3xl bg-[#0c0c0e]/95 border border-[rgba(255,215,0,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,215,0,0.15)] backdrop-blur-2xl p-5 overflow-hidden"
          >
            <div className="space-y-1 max-h-[75vh] overflow-y-auto pr-1">
              <div className="section-label mb-4">Navigation</div>
              {[...primaryNavLinks, ...moreNavLinks].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#18150c] border border-[rgba(255,215,0,0.4)] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : "text-[#A8A8A8] hover:bg-[rgba(255,215,0,0.06)] hover:text-[#FFF000] border border-transparent"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#FFF000] shadow-[0_0_8px_#FFD700]" />
                    )}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-neon-solid w-full text-center py-3 text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Request a Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
