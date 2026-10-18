"use client";

import SectionHeader from "@/components/SectionHeader";
import { ShieldCheck, Lock, FileText, CheckCircle } from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

export default function TermsPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="terms" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            LEGAL & GOVERNANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Terms of Service & <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Privacy Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Please read these terms and privacy guidelines carefully. By accessing or using the services of InnoStorey Innovations Pvt Ltd, you agree to be bound by these policies.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Terms of Service */}
          <div className="glass p-8 md:p-12 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)] pb-4">
              <FileText className="w-6 h-6 text-[#FFD700]" />
              <h2 className="font-serif text-3xl font-light text-[#F5F5F5]">
                Terms of Service
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[#999999] leading-relaxed font-light">
              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">1. Use of Our Services</h3>
                <p>Our software, cloud platforms, and academic offerings are intended for enterprise, professional, and educational use. You agree not to misuse our offerings or access them using unauthorized automated means.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">2. Intellectual Property</h3>
                <p>All content, source code, research papers, course materials, logos, and trademarks on this site are owned exclusively by InnoStorey Innovations Pvt Ltd. You may not reproduce, redistribute, or reverse engineer any materials without explicit prior written consent.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">3. Limitation of Liability</h3>
                <p>InnoStorey Innovations Pvt Ltd shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, to the maximum extent permitted by applicable law.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">4. Modifications & Updates</h3>
                <p>We reserve the right to update or modify these terms at any time without prior notice. Continued use of our website or services indicates your acceptance of the revised terms.</p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="glass-neon glass-shine relative p-8 md:p-12 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)] pb-4">
              <Lock className="w-6 h-6 text-[#FFD700]" />
              <h2 className="font-serif text-3xl font-light text-[#F5F5F5]">
                Privacy Policy
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[#999999] leading-relaxed font-light">
              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">1. Information We Collect</h3>
                <p>We may collect personal details such as your name, email address, phone number, organization, and message contents when you submit inquiry forms or register for academic programs.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">2. How We Use Your Information</h3>
                <p>We use your information strictly to respond to inquiries, provide requested services, manage course registrations, and improve our offerings. We do not sell, trade, or share your data with unauthorized third parties.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">3. Data Security Precautions</h3>
                <p>We implement rigorous technical and organizational security measures, including data encryption and secure server infrastructure, to prevent unauthorized access, disclosure, or loss of personal data.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">4. Cookies & Analytics</h3>
                <p>We may use cookies to enhance website performance and navigation experience. You can disable cookies through your browser settings, though some interactive features may have limited functionality.</p>
              </div>

              <div>
                <h3 className="text-base text-[#F5F5F5] font-serif font-normal mb-2">5. Your Data Rights</h3>
                <p>You reserve the right to request access to, correction of, or deletion of your personal data stored by us. For any privacy requests, please email us directly at <a href="mailto:info@innostorey.in" className="text-[#FFD700] underline">info@innostorey.in</a> or <a href="mailto:innostoreyinnovations@gmail.com" className="text-[#FFD700] underline">innostoreyinnovations@gmail.com</a>.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
