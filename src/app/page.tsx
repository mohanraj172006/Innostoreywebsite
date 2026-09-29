"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Cpu, Cloud, Code2,
  Smartphone, BarChart3, Network, Sparkles,
  CheckCircle2, Building2, Star, Zap, Users, Award, Globe2,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import CinematicGoldBackground from "@/components/CinematicGoldBackground";

const testimonials = [
  {
    quote: "InnoStorey helped us architect a custom enterprise cloud app for our business. Their team delivered seamless performance and security.",
    author: "Priya Sharma",
    title: "Small Business Owner & Founder",
    stars: 5,
  },
  {
    quote: "The IoT automation solutions provided by InnoStorey transformed our operational workflow. Their technical expertise is world-class.",
    author: "R. K. Ramanathan",
    title: "Operations Director, Smart Industrial Solutions",
    stars: 5,
  },
  {
    quote: "Outstanding academic mentorship and industry training! The hands-on project experience from InnoStorey's Center of Excellence was invaluable.",
    author: "A. Arvind",
    title: "Engineering Graduate & Research Associate",
    stars: 5,
  },
];

const whyChooseUs = [
  {
    icon: <Cpu className="w-6 h-6 text-[#FFD700]" />,
    title: "Deep Tech & AI Integration",
    desc: "Deploying custom predictive models, natural language algorithms, and intelligent computer vision systems tailored to business goals.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-[#FFD700]" />,
    title: "Scalable Cloud Architecture",
    desc: "High-performance AWS and Azure cloud migration, containerization, DevOps automation, and robust multi-tier cybersecurity.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#FFD700]" />,
    title: "Enterprise Cybersecurity",
    desc: "Rigorous compliance management, proactive threat detection, end-to-end data encryption, and resilient system architecture.",
  },
  {
    icon: <Award className="w-6 h-6 text-[#FFD700]" />,
    title: "Academic & Research Excellence",
    desc: "Empowering universities, researchers, and students through our Center of Excellence and cutting-edge Li-Fi & drone safety research.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered", icon: <Zap className="w-5 h-5 text-[#FFD700]" /> },
  { value: "100+", label: "Students Mentored", icon: <Users className="w-5 h-5 text-[#FFD700]" /> },
  { value: "15+", label: "Technologies Mastered", icon: <Globe2 className="w-5 h-5 text-[#FFD700]" /> },
  { value: "98%", label: "Client Satisfaction", icon: <Star className="w-5 h-5 text-[#FFD700]" /> },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function HomePage() {
  return (
    <div className="relative bg-[#000] text-white overflow-hidden">

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-28 overflow-hidden bg-black">
        {/* Cinematic Neon Gold Flowing Metallic Ribbons Background */}
        <CinematicGoldBackground className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

        {/* Ambient orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse,rgba(255,215,0,0.06)_0%,transparent_70%)] pointer-events-none animate-drift z-[2]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-[2]" />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-neon border-[rgba(255,215,0,0.3)] mb-10 animate-border-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#FFD700] glow-sm">
              Next-Generation Technology Consultancy
            </span>
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 text-white"
          >
            Empowering<br />
            <span className="gold-gradient-text italic font-light">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A8A8A8] max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            At InnoStorey Innovations, we craft seamless, scalable, and secure cloud solutions
            tailored to the dynamic demands of modern enterprise — from startups to global corporations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <LiquidMetalButton
              label="Explore Our Services"
              href="/services"
            />
            <Link href="/contact" className="btn-neon text-xs py-3.5 px-8 rounded-full">
              Request a Consultation
            </Link>
            <LiquidMetalButton
              viewMode="icon"
              href="/contact"
            />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <div key={i} className="glass-neon rounded-xl p-4 text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-center mb-2 group-hover:text-[#FFF000] transition-colors duration-300">
                  {s.icon}
                </div>
                <div className="font-serif text-2xl font-light text-[#FFD700] glow-sm">{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#666] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════
          ABOUT / MISSION
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-[rgba(255,215,0,0.1)] relative overflow-hidden">
        {/* Ambient orb */}
        <div className="neon-orb neon-orb-gold-faint w-[500px] h-[500px] top-1/2 -right-48 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-[rgba(255,215,0,0.25)] shadow-[0_0_50px_rgba(255,215,0,0.08)]">
                <Image src="/images/MC-1.jpg" alt="InnoStorey Innovations" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,215,0,0.04)] to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 glass-neon p-5 rounded-xl hidden sm:flex items-center gap-4 border border-[rgba(255,215,0,0.3)]">
                <Building2 className="w-9 h-9 text-[#FFD700]" />
                <div>
                  <span className="block font-serif text-xl text-white">Pvt Ltd</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#666]">Incorporated Innovation</span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                label="ABOUT INNOSTOREY"
                title="A Dynamic Partner in Transformative Engineering"
                description="We are more than a technology company — we are a dynamic innovation partner committed to transforming ambitious ideas into high-impact digital realities."
                centered={false}
              />

              <p className="text-sm text-[#A8A8A8] leading-relaxed font-light">
                Since our inception, we have been driven by a single purpose: to empower businesses and communities
                with smart, scalable, and sustainable technology. Whether it&apos;s pioneering AI-powered applications,
                enabling seamless cloud integration, or designing IoT ecosystems — we bring creativity, expertise,
                and an unwavering commitment to excellence.
              </p>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {[
                  { icon: <Sparkles className="w-4 h-4 text-[#FFD700]" />, label: "Our Vision", text: "To be a global leader in transformative technology solutions that create a smarter, safer, and more sustainable future by leveraging innovation and collaboration." },
                  { icon: <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />, label: "Our Mission", text: "We strive to deliver intelligent systems, innovative applications, and impactful digital products by combining deep tech expertise with customer-centric values." },
                ].map((item) => (
                  <div key={item.label} className="glass-neon p-6 rounded-xl space-y-3 hover:-translate-y-1 transition-transform duration-300">
                    <h4 className="font-serif text-lg text-[#FFD700] font-light flex items-center gap-2">
                      {item.icon} {item.label}
                    </h4>
                    <p className="text-xs text-[#A8A8A8] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CORE SERVICES
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#000] relative overflow-hidden">
        <div className="neon-orb neon-orb-gold-faint w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="CORE EXPERTISE"
            title="Architecting Tomorrow's Digital Infrastructure"
            description="Our enterprise capabilities span artificial intelligence, cloud infrastructure, IoT devices, web solutions, and business intelligence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <ServiceCard title="AI & Custom Software Development" description="Advanced AI-powered software solutions including NLP, computer vision, and predictive modeling tailored to industry needs." image="/images/ai integration.jpg" icon={<Cpu className="w-5 h-5" />} category="ARTIFICIAL INTELLIGENCE" />
            <ServiceCard title="IoT & Smart Automation" description="Interconnected IoT ecosystems for smart home and industrial automation, real-time device monitoring, and edge telemetry." image="/images/iot2.png" icon={<Network className="w-5 h-5" />} category="SMART DEVICES" />
            <ServiceCard title="Cloud Computing & Cybersecurity" description="Scalable cloud migration, multi-cloud governance, DevOps automated pipelines, and multi-layered cyber defense strategies." image="/images/cloud security.jpg" icon={<Cloud className="w-5 h-5" />} category="CLOUD & SECURITY" />
            <ServiceCard title="Web Development Services" description="Creating responsive, secure, and ultra-fast corporate websites tailored for exceptional user experience and business growth." image="/images/Web-development.jpg" icon={<Code2 className="w-5 h-5" />} category="WEB ENGINEERING" />
            <ServiceCard title="Mobile App Development" description="Designing and building native iOS/Android and cross-platform Flutter/React Native mobile applications for on-the-go connectivity." image="/images/app-development.jpg" icon={<Smartphone className="w-5 h-5" />} category="MOBILE APPS" />
            <ServiceCard title="Data Analytics & BI Tools" description="Extracting actionable business intelligence, interactive executive dashboards, and ML-driven predictive analytics." image="/images/data ana.jpg" icon={<BarChart3 className="w-5 h-5" />} category="DATA SCIENCE" />
          </div>

          <div className="mt-16 text-center">
            <Link href="/services" className="btn-neon text-[10px] py-3 px-7">
              View All Solutions & Programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PORTFOLIO
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-[rgba(255,215,0,0.08)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="SELECTED CASE STUDIES"
            title="Pioneering Engineering Projects"
            description="Explore our proven track record of enterprise solution delivery, IoT infrastructure deployments, and digital products."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <ProjectCard title="AI Healthcare Platform" description="A revolutionary AI-powered diagnostic platform integrating patient clinical data, medical imaging analysis, and real-time clinical decision support." image="/images/SMART HEALTH.jpg" category="HEALTHCARE AI" technologies={["AI/ML", "Python", "Computer Vision", "Cloud API"]} outcomes="Improved diagnostic precision and streamlined hospital workflows." />
            <ProjectCard title="Smart City Automation" description="Urban IoT automation including intelligent traffic flow optimization, energy-efficient smart street lights, and municipal environmental sensors." image="/images/SMART CITY1.jpg" category="SMART CITY IOT" technologies={["IoT Sensors", "MQTT", "Edge Computing", "Dashboard"]} outcomes="Reduced municipal carbon footprint and enhanced public safety." />
            <ProjectCard title="Responsive Corporate Website" description="A high-performance corporate portal built with modern web architecture, responsive visual design, animation systems, and SEO optimization." image="/images/RES BUSINESS.jpg" category="WEB ARCHITECTURE" technologies={["React", "Next.js", "Tailwind CSS", "Framer Motion"]} outcomes="Increased organic search reach and client inquiry conversion." />
            <ProjectCard title="Custom E-Commerce Platform" description="Full-featured e-commerce ecosystem with real-time inventory management, secure multi-gateway checkout, and customer analytics." image="/images/ECOMMERCE.jpg" category="E-COMMERCE" technologies={["Node.js", "MySQL", "Payment API", "React"]} outcomes="Scalable transaction processing with zero checkout friction." />
          </div>

          <div className="mt-14 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#FFD700] hover:text-[#FFF000] transition-colors duration-200 group">
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#FFD700] group-hover:after:w-full after:transition-all after:duration-300 after:shadow-[0_0_6px_rgba(255,215,0,0.5)]">
                Explore All Engineering & Research Projects
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY INNOSTOREY
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#000] relative overflow-hidden">
        <div className="neon-orb neon-orb-gold-faint w-[500px] h-[500px] bottom-0 right-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="WHY INNOSTOREY"
            title="Uncompromising Standards of Engineering Excellence"
            description="We combine deep technical capabilities with strategic business acumen to ensure every deployment creates lasting enterprise value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="neon-card p-8 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(255,215,0,0.06)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(255,215,0,0.5)] group-hover:shadow-[0_0_14px_rgba(255,215,0,0.15)]">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-light text-white group-hover:text-[#FFD700] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A8A8A8] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-[rgba(255,215,0,0.08)] relative overflow-hidden">
        <div className="neon-orb neon-orb-gold-faint w-[400px] h-[300px] top-1/2 left-0 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            label="CLIENT TESTIMONIALS"
            title="Trusted by Visionary Organizations"
            description="Read what our enterprise clients, researchers, and academic partners say about their InnoStorey experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass-neon rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FFD700]" fill="#FFD700" />
                    ))}
                  </div>
                  <p className="text-sm text-[#A8A8A8] font-light leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[rgba(255,215,0,0.1)]">
                  <h4 className="font-serif text-base text-white font-light">{t.author}</h4>
                  <span className="text-[10px] text-[#FFD700] uppercase tracking-wider font-semibold">{t.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="py-28 bg-[#000] border-t border-[rgba(255,215,0,0.12)] relative overflow-hidden">
        {/* Neon grid bg */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        {/* Orbs */}
        <div className="neon-orb neon-orb-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-gold pointer-events-none" style={{ opacity: 0.07 }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-neon border border-[rgba(255,215,0,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#FFD700]">
                Start Your Journey
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
              Ready to Build<br />
              <span className="gold-gradient-text italic">Tomorrow&apos;s Solutions?</span>
            </h2>

            <p className="text-base text-[#A8A8A8] max-w-2xl mx-auto font-light leading-relaxed">
              Connect with our enterprise engineering team to discuss custom cloud architecture,
              AI models, IoT deployments, or academic programs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
              <LiquidMetalButton
                label="Get in Touch"
                href="/contact"
              />
              <Link href="/sales" className="btn-neon py-3.5 px-9 rounded-full text-xs">
                View Service Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
