"use client";

import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import PageHeroBackground from "@/components/PageHeroBackground";

export default function LeadershipPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="leadership" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            EXECUTIVE LEADERSHIP
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Meet the Minds Shaping <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Tomorrow's Technology</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Our company leadership brings together industry veterans, visionary founders, research scientists, and passionate technical mentors.
          </p>
        </div>
      </section>

      {/* Founders & Executive Leadership Section */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="EXECUTIVE LEADERSHIP"
            title="Our Prestigious Leadership"
            description="Guiding InnoStorey Innovations with visionary strategy, technological mastery, and a relentless commitment to digital excellence."
          />

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard
              name="Mr. G. Mohanraj"
              role="Founder & Director"
              image="/images/mohanraj_cropped.jpg"
              bio="Visionary leader steering enterprise cloud strategy, IoT product engineering, and AI research initiatives. Passionate about empowering regional tech ecosystems."
              isFounder={true}
              badge="Founder"
              linkedin="https://www.linkedin.com/in/mohan-raj-g-1b0ba6299"
              email="mohanrajg172006@gmail.com"
            />
            <TeamCard
              name="Ms. M. D. Kiruthiga"
              role="Managing Partner & CRDO"
              image="/images/kiruthiga_managing_partner.jpg"
              bio="Spearheading corporate research initiatives, partner ecosystem development, and R&D operations. Driving high-impact technological breakthroughs and institutional synergies."
              isFounder={true}
              badge="Managing Partner"
              linkedin="https://www.linkedin.com/in/innostorey-innovations-127b83332"
              email="innostoreyinnovations@gmail.com"
            />
            <TeamCard
              name="Ms. R. Raja Priscilla"
              role="CEO & Head of Digital Presence"
              image="/images/priscilla_ceo.jpg"
              bio="Leading InnoStorey's executive operations, brand governance, and global digital presence. Passionate about scaling forward-thinking digital platforms and impactful technology programs."
              isFounder={true}
              badge="CEO"
              linkedin="https://www.linkedin.com/in/raja-priscilla-r-7954ab373"
              email="rajapriscilla14@gmail.com"
            />
          </div>
        </div>
      </section>

      {/* Engineering & Innovation Leadership Section */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ENGINEERING & OPERATIONS"
            title="Technical & Innovation Leadership"
            description="Leading interdisciplinary research, operational excellence, technology incubation, and student innovation laboratories."
          />

          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
              <TeamCard
                name="Ms. S. Kaleeswari"
                role="Academic Programs Lead"
                image="/images/kaleeswari_director_v2.jpg"
                bio="Leading InnoStorey's academic initiatives, student incubation programs, hands-on engineering workshops, and prototype development across emerging domains."
                isFounder={true}
                badge="Academic Lead"
                linkedin="https://www.linkedin.com/in/innostorey-innovations-127b83332"
                email="innostoreyinnovations@gmail.com"
              />
            </div>
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]">
              <TeamCard
                name="Ms. C. Sharanya"
                role="Technical Operational Lead"
                image="/images/sharanya_technical_lead_v3.jpg"
                bio="Overseeing technical operations, project delivery workflows, and engineering quality assurance. Coordinating cross-functional teams to ensure seamless execution of enterprise solutions."
                isFounder={true}
                badge="Operational Lead"
                linkedin="https://www.linkedin.com/in/sharanya-chandrasekar10"
                email="innostoreyinnovations@gmail.com"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
