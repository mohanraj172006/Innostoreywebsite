"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Send, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/SocialIcons";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import PageHeroBackground from "@/components/PageHeroBackground";

interface ContactDetail {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: { text: string; href: string | null }[];
}

const contactInfo: ContactDetail[] = [
  {
    icon: MapPin,
    label: "Corporate Address",
    items: [
      { text: "1/183 Muthalamman Kovil Street, Valayankulam, Madurai-625022, Tamil Nadu, India.", href: null },
    ],
  },
  {
    icon: Mail,
    label: "Email Inquiries",
    items: [
      { text: "info@innostorey.in", href: "mailto:info@innostorey.in" },
      { text: "innostoreyinnovations@gmail.com", href: "mailto:innostoreyinnovations@gmail.com" },
    ],
  },
  {
    icon: Phone,
    label: "Phone Lines",
    items: [
      { text: "+91 63831 09121", href: "tel:+916383109121" },
      { text: "+91 93843 38182", href: "tel:+919384338182" },
    ],
  },
  {
    icon: Globe,
    label: "Official Website",
    items: [
      { text: "www.innostorey.in", href: "https://www.innostorey.in" },
    ],
  },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/innostorey-innovations-127b83332", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://www.instagram.com/inno_storey_innovations?igsh=aGd4ano3ZWN2dnht", icon: InstagramIcon, label: "Instagram" },
  { href: "https://youtube.com/@innostoreyinnovations?si=osO20nLlKB7vFACF", icon: YoutubeIcon, label: "YouTube" },
  { href: "https://www.facebook.com/innostorey", icon: FacebookIcon, label: "Facebook" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    // Client-side validation
    if (!trimmedName) {
      setFeedback({ type: "error", text: "Please enter your name." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setFeedback({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    if (!trimmedMessage) {
      setFeedback({ type: "error", text: "Please enter your message." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: formState.phone.trim(),
          subject: formState.subject.trim(),
          message: trimmedMessage,
        }),
      });

      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        // Failed to parse JSON response
      }

      if (response.ok && data?.success) {
        setFeedback({
          type: "success",
          text: "Thanks for reaching out! We will get back to you soon.",
        });
        setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          text: data?.message || "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      console.error("[Contact Form] Network or submission error:", err);
      setFeedback({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "neon-input text-xs";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] font-bold text-[#666] mb-2";

  return (
    <div className="bg-[#000] text-white min-h-screen">

      {/* ── Page Header ── */}
      <section className="py-24 md:py-32 bg-[#000] border-b border-[rgba(255,215,0,0.1)] text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="contact" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-label justify-center mb-6">Get In Touch</div>
            <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl mb-6">
              Connect With <span className="gold-gradient-text italic">InnoStorey</span>
            </h1>
            <p className="text-base text-[#A8A8A8] max-w-2xl mx-auto font-light leading-relaxed">
              Whether you&apos;re interested in enterprise cloud solutions, academic programs, research collaboration,
              or custom software engineering — we welcome your inquiry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 bg-[#000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 glass-neon-strong rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden"
            >
              {/* Top neon line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,215,0,0.4)] to-transparent" />

              <div>
                <div className="section-label mb-3">Transmit Inquiry</div>
                <h2 className="font-serif text-3xl font-light text-white">Send Us a Direct Message</h2>
              </div>

              {feedback && (
                <div className={`p-4 rounded-xl border text-xs font-medium flex items-start gap-3 ${
                  feedback.type === "success"
                    ? "bg-[rgba(255,215,0,0.07)] border-[rgba(255,215,0,0.4)] text-[#FFD700]"
                    : "bg-red-950/30 border-red-500/40 text-red-300"
                }`}>
                  {feedback.type === "success" ? <Sparkles className="w-4 h-4 shrink-0 mt-0.5" /> : <span className="w-4 h-4 shrink-0 mt-0.5 text-red-400">✕</span>}
                  <span>{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>Your Name *</label>
                    <input id="contact-name" type="text" name="name" value={formState.name} onChange={handleChange} required placeholder="e.g. Rajesh Kumar" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>Your Email *</label>
                    <input id="contact-email" type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="e.g. rajesh@example.com" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>Phone Number</label>
                    <input id="contact-phone" type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder="+91 63831 09121" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className={labelClass}>Inquiry Subject</label>
                    <input id="contact-subject" type="text" name="subject" value={formState.subject} onChange={handleChange} placeholder="e.g. AI Cloud Integration" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>Your Message *</label>
                  <textarea id="contact-message" name="message" rows={5} value={formState.message} onChange={handleChange} required placeholder="Tell us about your technical requirements, project timeline, or questions..." className={`${inputClass} resize-none`} />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <LiquidMetalButton
                    type="submit"
                    disabled={isSubmitting}
                    label={isSubmitting ? "Transmitting..." : "Send Message"}
                    icon={<Send className="w-4 h-4 text-[#FFD700]" />}
                  />
                  <span className="text-[11px] text-[#777] font-light">
                    Direct encryption enabled. Typical response &lt; 24h.
                  </span>
                </div>
              </form>
            </motion.div>

            {/* ── Contact Info ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6 flex flex-col"
            >
              {/* Info card */}
              <div className="glass-neon rounded-3xl p-8 space-y-7 flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,215,0,0.3)] to-transparent" />
                <div>
                  <div className="section-label mb-2">Headquarters</div>
                  <h3 className="font-serif text-2xl font-light text-white">Corporate Contact Details</h3>
                </div>

                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, items }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center text-[#FFD700] shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <strong className="block text-[10px] uppercase tracking-[0.2em] text-[#666] mb-1">{label}</strong>
                        <div className="flex flex-col gap-0.5">
                          {items.map((item, idx) =>
                            item.href ? (
                              <a
                                key={idx}
                                href={item.href}
                                className="text-xs text-[#A8A8A8] hover:text-[#FFD700] transition-colors duration-200"
                              >
                                {item.text}
                              </a>
                            ) : (
                              <span key={idx} className="text-xs text-[#A8A8A8] leading-relaxed">
                                {item.text}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div className="pt-5 border-t border-[rgba(255,215,0,0.1)] space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#666]">Follow Our Channels</span>
                  <div className="flex items-center gap-2.5">
                    {socialLinks.map(({ href, icon: Icon, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="w-10 h-10 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-[#666] hover:border-[rgba(255,215,0,0.5)] hover:text-[#FFD700] hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] hover:-translate-y-0.5 transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office hours */}
              <div className="glass-neon rounded-2xl p-6 flex items-center gap-4 border border-[rgba(255,215,0,0.2)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center text-[#FFD700] shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-white font-light">Madurai Technology Center</h4>
                  <p className="text-xs text-[#A8A8A8] mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              {/* CTA */}
              <div className="glass-neon rounded-2xl p-6 text-center space-y-3 border border-[rgba(255,215,0,0.15)]">
                <CheckCircle2 className="w-8 h-8 text-[#FFD700] mx-auto" />
                <p className="text-xs text-[#A8A8A8]">Average response time: <strong className="text-[#FFD700]">Within 24 hours</strong></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
