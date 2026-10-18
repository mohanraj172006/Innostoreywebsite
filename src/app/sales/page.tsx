"use client";

import SectionHeader from "@/components/SectionHeader";
import PricingCard from "@/components/PricingCard";
import PageHeroBackground from "@/components/PageHeroBackground";

const webPackages = [
  {
    title: "Basic Corporate Website",
    subtitle: "Ideal for startups, small businesses, and professional portfolios.",
    category: "WEB DEVELOPMENT",
    features: [
      "5 Custom Responsive Pages",
      "Modern Luxury Design System",
      "Contact Form with Email Notifications",
      "Basic On-Page SEO Setup",
      "Mobile & Tablet Optimization",
    ],
    ctaText: "Get Started",
  },
  {
    title: "Dynamic Business Portal",
    subtitle: "Tailored for growing enterprises requiring content management and databases.",
    category: "WEB DEVELOPMENT",
    isPopular: true,
    features: [
      "Custom Admin Dashboard & CMS",
      "Database Integration (MySQL / PostgreSQL)",
      "User Authentication & Roles",
      "API Integrations & Analytics",
      "Priority Maintenance & Security",
    ],
    ctaText: "Get a Quote",
  },
  {
    title: "E-Commerce Solution",
    subtitle: "Complete digital store front with payment processing.",
    category: "WEB DEVELOPMENT",
    features: [
      "Dynamic Product Catalog & Filters",
      "Payment Gateway Integration (UPI, Cards, NetBanking)",
      "Real-time Inventory & Order Tracking",
      "Discount Coupon & Tax Engine",
      "24/7 Server Deployment Support",
    ],
    ctaText: "Enquire Now",
  },
];

const studentPackages = [
  {
    title: "School Level Projects",
    subtitle: "Science fair projects & computer science foundational kits.",
    category: "STUDENT & ACADEMIC",
    features: [
      "Working Hardware / Software Model",
      "Step-by-Step Project Explanation",
      "Printable Project Chart & File",
      "Basic Coding Demonstration",
    ],
    ctaText: "Get Project",
  },
  {
    title: "Engineering Mini Projects",
    subtitle: "Hands-on projects for B.Tech, BE, and Polytechnic students.",
    category: "STUDENT & ACADEMIC",
    isPopular: true,
    features: [
      "Complete Source Code & Circuit Diagram",
      "Arduino / Microcontroller Programming",
      "Full Project Report (IEEE Format)",
      "Viva Questions & Guidance",
    ],
    ctaText: "Start Building",
  },
  {
    title: "Hackathon Ready Kits",
    subtitle: "High-impact prototypes for national and international hackathons.",
    category: "STUDENT & ACADEMIC",
    features: [
      "AI / IoT Hardware Prototype",
      "Cloud API Integration & Dashboards",
      "Pitch Deck / Presentation Slides",
      "Real-Time Mentorship Support",
    ],
    ctaText: "Order Now",
  },
];

const iotPackages = [
  {
    title: "Smart Home Kit",
    subtitle: "Custom automation for residential lighting and appliance control.",
    category: "IOT & AUTOMATION",
    features: [
      "Smartphone App Remote Control",
      "Wi-Fi & Bluetooth Switching Modules",
      "Energy Consumption Monitoring",
      "Schedule Timers & Voice Control Support",
    ],
    ctaText: "Order Now",
  },
  {
    title: "Industrial IoT (IIoT) System",
    subtitle: "Enterprise telemetry and predictive maintenance for factories.",
    category: "IOT & AUTOMATION",
    isPopular: true,
    features: [
      "Multi-Sensor Industrial Telemetry",
      "Cloud Telemetry Dashboard (AWS/Thingspeak)",
      "Real-Time Threat & Anomaly Alerts",
      "Edge Computing Integration",
    ],
    ctaText: "Request Demo",
  },
  {
    title: "Smart Agriculture Kit",
    subtitle: "Automated soil moisture sensing and solar pump controller.",
    category: "IOT & AUTOMATION",
    features: [
      "Soil Moisture & Temperature Sensors",
      "Automated Water Pump Trigger",
      "Solar Panel Power System",
      "Weather Alert Integration",
    ],
    ctaText: "Get Kit",
  },
];

const institutionalWorkshopPackages = [
  {
    title: "Technical Awareness Workshop",
    subtitle: "An introduction to emerging technologies for students.",
    category: "WORKSHOP • 1 DAY",
    features: [
      "Expert-led technical sessions",
      "Live demonstrations and guided activities",
      "Technology tools and practical exercises",
      "Digital participation certificates",
    ],
    ctaText: "Enquire Now",
  },
  {
    title: "IoT & Robotics Workshop",
    subtitle: "Build and demonstrate working technology prototypes.",
    category: "HANDS-ON • 2 DAYS",
    isPopular: true,
    features: [
      "Arduino, ESP32 and sensor interfacing",
      "Robotics and automation fundamentals",
      "Cloud dashboards and device connectivity",
      "Mini-project development and demonstration",
    ],
    ctaText: "Start Building",
  },
  {
    title: "AI & Innovation Bootcamp",
    subtitle: "Transform ideas into functional project prototypes.",
    category: "BOOTCAMP • 3 DAYS",
    features: [
      "AI, machine learning and Python fundamentals",
      "Team-based innovation challenges",
      "Guided prototype development",
      "Project presentation and technical feedback",
    ],
    ctaText: "Book Bootcamp",
  },
];

const institutionalTrainingPackages = [
  {
    title: "Foundation Skills Programme",
    subtitle: "Core programming and technology fundamentals for student cohorts.",
    category: "TRAINING • 4 WEEKS",
    features: [
      "Programming and technology fundamentals",
      "Guided laboratory exercises",
      "Assignments and practical assessments",
      "Introduction to mini-project development",
    ],
    ctaText: "Explore Program",
  },
  {
    title: "Professional Skills Programme",
    subtitle: "Domain-specific technical training with industry-oriented mini-projects.",
    category: "TRAINING • 8 WEEKS",
    isPopular: true,
    features: [
      "Domain-specific technical training",
      "Hands-on laboratory sessions",
      "Industry-oriented mini-projects",
      "Technical mentoring and project reviews",
    ],
    ctaText: "Get Training Plan",
  },
  {
    title: "Advanced Project Development",
    subtitle: "Comprehensive implementation of advanced working prototypes and project evaluation.",
    category: "CAPSTONE • 12 WEEKS",
    features: [
      "Advanced technology implementation",
      "Working prototype development",
      "Testing, debugging and documentation",
      "Final demonstration and project evaluation",
    ],
    ctaText: "Build Your Project",
  },
];

const institutionalCollaborationPackages = [
  {
    title: "FDP & Technical Upskilling",
    subtitle: "Suggested duration: 2–5 days of intensive educator skill enhancement.",
    category: "FACULTY DEVELOPMENT • 2–5 DAYS",
    features: [
      "AI, IoT, robotics and emerging technologies",
      "Hands-on technical sessions",
      "Research and prototype development",
      "Faculty learning outcomes and assessment",
    ],
    ctaText: "Request FDP Proposal",
  },
  {
    title: "Innovation & Research Programme",
    subtitle: "Customised semester or annual engagement for institutional innovation.",
    category: "INSTITUTIONAL PARTNERSHIP",
    isPopular: true,
    features: [
      "Student innovation and project mentoring",
      "Hackathon preparation and technical guidance",
      "Prototype and proof-of-concept development",
      "Innovation lab and research collaboration",
    ],
    ctaText: "Partner With Us",
  },
];

export default function SalesPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="sales" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            COMMERCIAL CATALOG
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Solution Packages & <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Pricing Specifications</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Transparent, enterprise-grade engineering packages designed for businesses, academic researchers, and student innovators.
          </p>
        </div>
      </section>

      {/* 1. Web Designing Services */}
      <section className="py-20 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="WEB & ENTERPRISE"
            title="Web Development Packages"
            description="From corporate identity sites to complex e-commerce platforms."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {webPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Student & Hackathon Projects */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ACADEMIC & INNOVATION"
            title="Student & Hackathon Project Packages"
            description="Turn academic requirements and hackathon challenges into award-winning prototypes."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. IoT & Automation Solutions */}
      <section className="py-20 bg-[#000000] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="HARDWARE & TELEMETRY"
            title="IoT & Automation Solutions"
            description="Pre-packaged smart hardware and industrial IoT systems."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {iotPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Institutional Workshop Packages */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="INSTITUTIONAL PACKAGES • 01"
            title="Institutional Workshop Packages"
            description="Hands-on technical sessions, IoT prototyping, and AI bootcamps designed for academic institutions and student cohorts."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutionalWorkshopPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Institutional Technical/Placement Training Packages */}
      <section className="py-20 bg-[#000000] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="INSTITUTIONAL PACKAGES • 02"
            title="Institutional Technical & Placement Training Packages"
            description="Intensive multi-week skill acceleration programmes bridging academic foundations with enterprise-ready technical competence."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutionalTrainingPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Faculty Development & Institutional Collaboration */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="INSTITUTIONAL PACKAGES • 03"
            title="Faculty Development & Institutional Collaboration"
            description="Dedicated educator upskilling FDP programmes, research collaboration, and annual innovation lab partnerships."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutionalCollaborationPackages.map((p, idx) => (
              <PricingCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
