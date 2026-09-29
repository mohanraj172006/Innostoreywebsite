import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import {
  Code2,
  Cloud,
  ShieldCheck,
  Smartphone,
  Network,
  Cpu,
  BarChart3,
  GraduationCap,
  Presentation,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import BackgroundPaths from "@/components/BackgroundPaths";

export default function ServicesPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Hero Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <BackgroundPaths className="absolute inset-0 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            CAPABILITIES & EXPERTISE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Enterprise Solutions & <br />
            <span className="gold-gradient-text italic font-normal">Technology Mentorship</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            We deliver tailored software development, AI model integration, IoT ecosystems, cloud security, and academic lectures to drive long-term digital growth.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 md:py-32 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="FULL CAPABILITY CATALOG"
            title="Tailored Engineering for Enterprise & Education"
            description="Explore our specialized services built with precision, security, and scalable performance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Web Development"
              description="Creating responsive, secure, and scalable websites tailored for exceptional user experience, high SEO rankings, and conversion."
              image="/images/Web-development.jpg"
              icon={<Code2 className="w-6 h-6" />}
              category="WEB ENGINEERING"
            />

            <ServiceCard
              title="Cloud Services & Migration"
              description="Seamless AWS and Azure cloud migration, containerized infrastructure, automated DevOps pipelines, and continuous cloud optimization."
              image="/images/cloud-computing7.jpg"
              icon={<Cloud className="w-6 h-6" />}
              category="CLOUD & INFRASTRUCTURE"
            />

            <ServiceCard
              title="Cybersecurity & Defense"
              description="Protecting digital assets with multi-layered security strategies, penetration testing, compliance audits, and real-time threat intelligence."
              image="/images/cyber.jpg"
              icon={<ShieldCheck className="w-6 h-6" />}
              category="SECURITY & COMPLIANCE"
            />

            <ServiceCard
              title="App Development"
              description="Intuitive mobile applications for iOS and Android with sleek interfaces, offline support, and high-speed API backends."
              image="/images/app-development.jpg"
              icon={<Smartphone className="w-6 h-6" />}
              category="MOBILE DEVELOPMENT"
            />

            <ServiceCard
              title="IoT Integration"
              description="Connect devices and smart hardware for automated telemetry, industrial IoT monitoring, and secure device-to-cloud communication."
              image="/images/iot.jpg"
              icon={<Network className="w-6 h-6" />}
              category="SMART DEVICES & IOT"
            />

            <ServiceCard
              title="AI Integration"
              description="Innovate workflows with custom artificial intelligence models, computer vision algorithms, NLP chatbots, and predictive analytics."
              image="/images/ai integration.jpg"
              icon={<Cpu className="w-6 h-6" />}
              category="ARTIFICIAL INTELLIGENCE"
            />

            <ServiceCard
              title="Analytics & BI Dashboards"
              description="Data insights through custom dashboards, real-time reporting metrics, ETL pipelines, and executive business intelligence visualizers."
              image="/images/data-analytics.jpg"
              icon={<BarChart3 className="w-6 h-6" />}
              category="DATA SCIENCE"
            />

            <ServiceCard
              title="Technology Mentorship Program"
              description="Our mentorship program connects ambitious students with industry professionals, offering career guidance, code reviews, and hands-on project exposure."
              image="/images/Mentorship.jpg"
              icon={<GraduationCap className="w-6 h-6" />}
              category="ACADEMIC MENTORSHIP"
            />

            <ServiceCard
              title="Guest Lectures & Industry Workshops"
              description="Our senior engineers deliver guest lectures and hands-on tech workshops at top universities, sharing real-world insights and inspiring future innovators."
              image="/images/aqi.jpg"
              icon={<Presentation className="w-6 h-6" />}
              category="KNOWLEDGE SHARING"
            />
          </div>
        </div>
      </section>

      {/* Commitment to Excellence Banner */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-neon glass-shine relative p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700]">
                OUR GUARANTEE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
                Our Unwavering Commitment to Excellence
              </h2>
              <p className="text-sm text-[#999999] leading-relaxed font-light">
                We believe that technology should be a catalyst for progress. By fostering collaboration and leveraging the latest advancements, we ensure our clients and students remain ahead in an ever-changing digital landscape.
              </p>
            </div>
            <div>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-xl flex items-center gap-2"
              >
                <span>Let's Collaborate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
