"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import { Sparkles, Shield, Compass, Lightbulb, Award } from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";
import NeuralCircuitBackground from "@/components/NeuralCircuitBackground";

const coreValues = [
  { letter: "I", title: "Integrity", desc: "Uncompromising ethics and complete transparency in every partner relationship." },
  { letter: "N", title: "Novelty", desc: "Pioneering creative tech solutions that challenge conventional boundaries." },
  { letter: "N", title: "Nurture", desc: "Fostering client growth, student mentorship, and continuous talent development." },
  { letter: "O", title: "Optimization", desc: "Refining workflows and systems for maximum operational performance." },
  { letter: "V", title: "Visionary", desc: "Anticipating emerging technology trends to keep our partners ahead." },
  { letter: "A", title: "Agility", desc: "Adapting swiftly to evolving market demands and technical challenges." },
  { letter: "T", title: "Trust", desc: "Building long-term relationships rooted in technical reliability and security." },
  { letter: "E", title: "Excellence", desc: "Delivering world-class quality and rigor across all engineering outputs." },
];

const coreAspects = [
  {
    icon: <Compass className="w-6 h-6 text-[#FFD700]" />,
    title: "Client-Centric Philosophy",
    desc: "We co-design every architectural blueprint alongside our clients to ensure perfect alignment with strategic business goals.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-[#FFD700]" />,
    title: "Continuous Innovation",
    desc: "Our dedicated research labs constantly experiment with AI models, IoT telemetry, Li-Fi communications, and cloud tooling.",
  },
  {
    icon: <Shield className="w-6 h-6 text-[#FFD700]" />,
    title: "Security & Resilience",
    desc: "Security is baked into every line of code, cloud configuration, and database layer we design.",
  },
  {
    icon: <Award className="w-6 h-6 text-[#FFD700]" />,
    title: "Academic Collaboration",
    desc: "Through our Center of Excellence, we bridge academia and industry by delivering real-world technical skills to future engineers.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Hero Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="about" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            CORPORATE OVERVIEW
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Pioneering the Next Era of <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Technology & Innovation</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            InnoStorey Innovations Pvt Ltd is a premier enterprise technology consultancy and research company delivering intelligent cloud, AI, IoT, and software development solutions.
          </p>
        </div>
      </section>

      {/* Our Journey & Story */}
      <section className="py-24 md:py-32 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionHeader
                label="OUR FOUNDATION"
                title="Building a Legacy of Tech Transformation"
                description="Founded with a passion for cutting-edge technology and a dedication to solving complex real-world challenges through intelligent engineering."
                centered={false}
              />

              <div className="space-y-4 text-sm text-[#D8D8D8]/80 leading-relaxed font-light">
                <p>
                  At InnoStorey Innovations Pvt Ltd, we believe that technology is the ultimate catalyst for human and industrial progress. From our headquarters in Madurai, Tamil Nadu, we serve global enterprise clients, government initiatives, academic institutions, and ambitious startups.
                </p>
                <p>
                  Our multidisciplinary team unites experienced cloud architects, AI researchers, IoT hardware engineers, and software developers. We work closely with our partners to deeply understand their unique challenges and tailor innovative solutions that future-proof their success in an ever-evolving digital landscape.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[rgba(255,255,255,0.05)]">
                <div>
                  <span className="font-serif text-4xl text-[#FFD700] font-light block mb-1">100%</span>
                  <span className="text-xs text-[#999999] uppercase tracking-wider">Commitment to Quality</span>
                </div>
                <div>
                  <span className="font-serif text-4xl text-[#FFD700] font-light block mb-1">24/7</span>
                  <span className="text-xs text-[#999999] uppercase tracking-wider">Enterprise Architecture Support</span>
                </div>
              </div>
            </div>

            {/* Image - InnoStorey Logo with Neural Circuit Background */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="lg:col-span-6 relative"
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-2 rounded-3xl bg-[radial-gradient(ellipse,rgba(255,215,0,0.18)_0%,transparent_70%)] blur-xl pointer-events-none z-0" />

              <div className="relative w-full h-[450px] md:h-[520px] rounded-2xl overflow-hidden border border-[rgba(255,215,0,0.35)] shadow-[0_0_60px_rgba(255,215,0,0.15)] z-10">
                {/* Animated Neural Circuit Background */}
                <div className="absolute inset-0 bg-[#050505]">
                  <NeuralCircuitBackground className="absolute inset-0 w-full h-full" />
                </div>

                {/* Corner bracket decorations */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[rgba(255,215,0,0.7)] z-20" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[rgba(255,215,0,0.7)] z-20" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[rgba(255,215,0,0.7)] z-20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[rgba(255,215,0,0.7)] z-20" />

                {/* Logo centered */}
                <div className="absolute inset-0 flex items-center justify-center z-20 p-8">
                  <div className="relative w-full max-w-[340px]">
                    {/* Logo glow halo */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(255,215,0,0.12)_0%,transparent_70%)] blur-2xl rounded-full scale-150" />
                    <Image
                      src="/images/IS PNG 1.png"
                      alt="InnoStorey Innovations Pvt Ltd"
                      width={340}
                      height={300}
                      className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_28px_rgba(255,215,0,0.5)]"
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20" />

                {/* Subtle gold vignette edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] z-20 pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Leadership & Founders */}
      <section className="py-24 md:py-32 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="FOUNDERSHIP"
            title="Guided by Visionary Leadership"
            description="Our leadership combines decades of industry insight, technical excellence, and dedication to academic innovation."
          />

          <div className="max-w-md mx-auto">
            <TeamCard
              name="Mr. G. Mohanraj"
              role="Founder & Director"
              image="/images/mohanraj_cropped.jpg"
              bio="Visionary tech leader driving strategic cloud transformation, IoT ecosystem design, and enterprise AI innovation across multi-national projects."
              isFounder={true}
              linkedin="https://www.linkedin.com/in/mohan-raj-g-1b0ba6299"
              email="mohanrajg172006@gmail.com"
            />
          </div>
        </div>
      </section>

      {/* Core Aspects */}
      <section className="py-24 md:py-32 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CORE ASPECTS"
            title="The Pillars of Our Success"
            description="Four fundamental tenets govern every project we undertake, ensuring technical precision and strategic value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreAspects.map((aspect, idx) => (
              <div
                key={idx}
                className="glass-neon glass-shine relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#FFD700]/20 flex items-center justify-center">
                  {aspect.icon}
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#F5F5F5] pt-2">
                  {aspect.title}
                </h3>
                <p className="text-xs text-[#999999] leading-relaxed font-light">
                  {aspect.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values: I.N.N.O.V.A.T.E. */}
      <section className="py-24 md:py-32 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="OUR CORE VALUES"
            title="The I.N.N.O.V.A.T.E. Framework"
            description="Our operational philosophy is embodied by eight core principles that define our workplace culture and customer service."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="glass-neon glass-shine relative p-6 rounded-2xl transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl font-bold text-[#FFD700] opacity-80 group-hover:opacity-100 transition-opacity">
                    {val.letter}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FFD700]/30 group-hover:text-[#FFD700] transition-colors" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#F5F5F5] group-hover:text-[#FFD700] transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-[#999999] leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2035 Blueprint */}
      <section className="py-24 md:py-32 bg-[#050505] border-t border-[rgba(255,215,0,0.12)] relative overflow-hidden">
        {/* Ambient subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,215,0,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="ROADMAP & STRATEGY"
            title="Vision 2035 Blueprint"
            description="Our structured fifteen-year roadmap charting our research initiatives, patent developments, and global Centers of Excellence."
          />

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-neon-strong rounded-3xl p-8 sm:p-12 border border-[rgba(255,215,0,0.25)] relative overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.08)]"
            >
              {/* Top glowing line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

              {/* Main Description */}
              <p className="text-sm sm:text-base text-[#D0D0D0] leading-relaxed font-light mb-8">
                Our strategic fifteen-year roadmap outlines concrete blueprints to lead research globally. By 2035, InnoStorey plans to have established thirty regional Centers of Excellence, filed over a hundred international hardware-software patents, and successfully powered digital frameworks for over a thousand enterprise corporations.
              </p>

              {/* Strategic Focus Elements */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#FFD700]">
                  STRATEGIC FOCUS ELEMENTS:
                </h4>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] mt-2 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-light">
                      Deploying deep AI automation clusters within the manufacturing and logistics channels.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] mt-2 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-light">
                      Filing 100+ global patents spanning edge-computing and smart cyber-cybernetics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] mt-2 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-light">
                      Upskilling 100,000+ engineers in high-demand deep tech fields.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Footer bar */}
              <div className="pt-8 mt-10 border-t border-[rgba(255,215,0,0.12)] flex items-center justify-between text-[10px] tracking-[0.25em] uppercase">
                <span className="text-[#777] font-semibold">INNOSTOREY GROUP</span>
                <span className="text-[#FFD700] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> TRUSTED BLUEPRINT
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-[#000000] text-center border-t border-[#FFD700]/15">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
            Want to Collaborate with InnoStorey?
          </h2>
          <p className="text-sm text-[#999999] font-light max-w-xl mx-auto">
            Discover how our technology expertise and academic mentorship can transform your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-lg"
          >
            Connect With Our Team
          </Link>
        </div>
      </section>

    </div>
  );
}
