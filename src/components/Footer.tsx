import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/SocialIcons";

const socialLinks = [
  { href: "https://www.linkedin.com/in/innostorey-innovations-127b83332", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://www.instagram.com/inno_storey_innovations?igsh=aGd4ano3ZWN2dnht", icon: InstagramIcon, label: "Instagram" },
  { href: "https://youtube.com/@innostoreyinnovations?si=osO20nLlKB7vFACF", icon: YoutubeIcon, label: "YouTube" },
  { href: "https://www.facebook.com/innostorey", icon: FacebookIcon, label: "Facebook" },
];

const companyLinks = [
  { href: "/about",      label: "About InnoStorey" },
  { href: "/services",   label: "Core Services" },
  { href: "/academics",  label: "Center of Excellence" },
  { href: "/leadership", label: "Leadership & Founders" },
  { href: "/careers",    label: "Careers & Hiring" },
];

const resourceLinks = [
  { href: "/sales",    label: "Sales & Pricing" },
  { href: "/projects", label: "Featured Projects" },
  { href: "/faq",      label: "Help & FAQ" },
  { href: "/contact",  label: "Consultation Request" },
  { href: "/terms",    label: "Terms & Privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#000] border-t border-[rgba(255,215,0,0.12)] text-[#A8A8A8] relative overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,215,0,0.5)] to-transparent shadow-[0_0_8px_rgba(255,215,0,0.3)]" />
      {/* Ambient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[radial-gradient(ellipse,rgba(255,215,0,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

          {/* ── Brand ── */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image
                  src="/images/IS PNG 1.png"
                  alt="InnoStorey Innovations Logo"
                  fill
                  sizes="44px"
                  className="object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.45)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="block font-serif text-lg tracking-[0.15em] uppercase text-white group-hover:text-[#FFD700] transition-colors duration-300">
                  INNO<span className="text-[#FFD700]">STOREY</span>
                </span>
                <span className="block text-[9px] tracking-[0.25em] text-[#A8A8A8] uppercase">
                  INNOVATIONS PVT LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#A8A8A8] leading-relaxed max-w-sm font-light">
              Empowering global enterprises through intelligent cloud integration, AI ecosystems, smart IoT devices, and cutting-edge software engineering.
            </p>

            <div className="flex items-center gap-2.5 text-[10px] text-[#FFD700] glow-sm font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certified Enterprise Innovation Partner
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Company Links ── */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD700] glow-sm border-b border-[rgba(255,215,0,0.15)] pb-2">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="gold-link text-xs">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD700] glow-sm border-b border-[rgba(255,215,0,0.15)] pb-2">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="gold-link text-xs">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFD700] glow-sm border-b border-[rgba(255,215,0,0.15)] pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                <span className="text-[#A8A8A8] leading-relaxed">
                  1/183 Muthalamman Kovil Street, Valayankulam, Madurai-625022.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:info@innostorey.in" className="gold-link">
                    info@innostorey.in
                  </a>
                  <a href="mailto:innostoreyinnovations@gmail.com" className="gold-link">
                    innostoreyinnovations@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+916383109121" className="gold-link">+91 63831 09121</a>
                  <a href="tel:+919384338182" className="gold-link">+91 93843 38182</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-[rgba(255,215,0,0.08)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#444]">
          <p>© 2026–2027 InnoStorey Innovations Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#FFD700] transition-colors duration-200">
              Terms of Service
            </Link>
            <span className="text-[#222]">•</span>
            <Link href="/terms" className="hover:text-[#FFD700] transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-[#222]">•</span>
            <Link href="/contact" className="hover:text-[#FFD700] transition-colors duration-200 flex items-center gap-1">
              Contact <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
