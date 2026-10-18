"use client";

import SectionHeader from "@/components/SectionHeader";
import AccordionItem from "@/components/Accordion";
import Link from "next/link";
import { HelpCircle, Mail } from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

const faqItems = [
  {
    question: "What core services does InnoStorey Innovations offer?",
    answer: "InnoStorey Innovations Pvt Ltd offers full-spectrum enterprise technology services, including Custom Artificial Intelligence (AI) Development, Cloud Architecture & Security, IoT & Smart Device Automation, Web Development, Mobile Applications (iOS/Android), Data Science & Business Intelligence, and Academic Certifications through our Center of Excellence.",
    isOpenDefault: true,
  },
  {
    question: "How can I request a quote or project consultation?",
    answer: "You can request a free project consultation by submitting the contact form on our website, emailing us directly at info@innostorey.in or innostoreyinnovations@gmail.com, or calling our engineering team at +91 6383109121 or +91 9384338182.",
  },
  {
    question: "Do you offer official academic training and certifications?",
    answer: "Yes! Our Center of Excellence provides certified hands-on training in Web Technologies (HTML, CSS3, JS, PHP, MySQLi), Python Programming, Advanced Photoshop, C/C++, IoT & Embedded Systems, and Foundational CS. All courses include a completion certificate and a 10% discount on lump-sum payments.",
  },
  {
    question: "Can InnoStorey handle enterprise-level deployments?",
    answer: "Absolutely. We specialize in designing robust, scalable multi-cloud infrastructure (AWS/Azure), high-concurrency database backends, industrial IoT telemetry networks, and zero-trust cybersecurity solutions for enterprise clients and institutions.",
  },
  {
    question: "Where is InnoStorey Innovations located?",
    answer: "Our corporate office and Center of Excellence are located at 1/183 Muthalamman Kovil Street, Valayankulam, Madurai-625022, Tamil Nadu, India.",
  },
  {
    question: "What project packages do you provide for engineering & school students?",
    answer: "We provide complete hardware and software project kits, IEEE research paper implementation support, Arduino & Raspberry Pi hardware kits, and hackathon-ready prototypes equipped with full source code, circuit diagrams, reports, and viva guidance.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="faq" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            HELP CENTER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Questions & Answers</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Find immediate answers regarding our enterprise services, academic certifications, research projects, and corporate consultations.
          </p>
        </div>
      </section>

      {/* Accordions List */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <SectionHeader
            label="KNOWLEDGE BASE"
            title="Common Inquiries"
            description="Click on any question to view detailed information."
          />

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <HelpCircle className="w-10 h-10 text-[#FFD700] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
            Still Have Questions?
          </h2>
          <p className="text-sm text-[#999999] font-light">
            Our technical support and advisory team is standing by to help you with any custom requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-lg"
            >
              Get in Touch
            </Link>
            <a
              href="mailto:info@innostorey.in"
              className="px-8 py-3.5 rounded-full bg-[#111111] text-[#FFD700] border border-[#FFD700]/30 font-semibold text-xs uppercase tracking-widest hover:bg-[#FFD700] hover:text-[#050505] transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email info@innostorey.in</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
