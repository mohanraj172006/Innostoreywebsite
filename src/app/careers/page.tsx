"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  Cpu,
  Calendar,
  Lightbulb,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

interface Opportunity {
  id: string;
  title: string;
  category: "job" | "internship";
  roleType?: "engineering" | "trainer" | "internship";
  badge?: string;
  location: string;
  type: string;
  duration?: string;
  desc: string;
  reqs: string[];
  perks?: string[];
}

const opportunities: Opportunity[] = [
  // Trainer & Instructor Roles
  {
    id: "tech-trainer",
    title: "Technical Trainer",
    category: "job",
    roleType: "trainer",
    badge: "👨‍🏫 Technical Training",
    location: "Madurai / On-Site",
    type: "Full-Time / Part-Time",
    desc: "Lead high-impact hands-on training sessions in programming (Python, C/C++, Web Technologies), IoT microcontrollers, and robotics for student cohorts, college workshops, and aspiring engineers.",
    reqs: [
      "Strong domain knowledge in programming fundamentals, IoT protocols, robotics, or web stacks",
      "Demonstrated ability to lead practical lab sessions, project demos, and technical bootcamps",
      "Excellent communication and mentoring capabilities for varying learner levels",
      "Prior instructional experience in academic institutions or edtech centers is preferred",
    ],
    perks: ["Access to State-of-the-Art Labs", "Flexible Instructional Schedules", "Direct Impact on Student Careers"],
  },
  {
    id: "digital-instructor",
    title: "Digital Learning Instructor",
    category: "job",
    roleType: "trainer",
    badge: "💻 Digital Education",
    location: "Madurai / Hybrid",
    type: "Full-Time",
    desc: "Design and deliver engaging digital curriculum, online live classes, interactive multimedia learning modules, and foundational digital literacy programs across school and higher-education tracks.",
    reqs: [
      "Proven capability in curriculum structuring, instructional design, and digital content delivery",
      "Familiarity with LMS platforms, screencasting, and multimedia presentation tools",
      "Passion for simplifying complex technical ideas into intuitive, interactive digital lessons",
      "Bachelor's or Master's in Computer Science, IT, Education Technology, or related discipline",
    ],
    perks: ["Creative Curriculum Freedom", "Hybrid Work Flexibility", "EdTech Innovation Exposure"],
  },

  // Full-Time Engineering Roles
  {
    id: "ai-ml-dev",
    title: "Software Developer (AI/ML)",
    category: "job",
    roleType: "engineering",
    badge: "💼 Full-Time Engineering",
    location: "Madurai / Hybrid",
    type: "Full-Time",
    desc: "We are seeking a talented AI/ML Engineer to design and deploy custom deep learning models, natural language algorithms, and computer vision systems for industrial applications.",
    reqs: [
      "Proficiency in Python, TensorFlow, PyTorch, and OpenCV",
      "Experience with RESTful API integration and cloud model deployment",
      "Strong understanding of neural network architectures and data pipelines",
      "Minimum 1-3 years of relevant software development experience",
    ],
    perks: ["GPU Cluster Access", "Live R&D Deployment", "Competitive Growth"],
  },
  {
    id: "iot-eng",
    title: "IoT Solutions Engineer",
    category: "job",
    roleType: "engineering",
    badge: "💼 Full-Time Engineering",
    location: "Madurai",
    type: "Full-Time",
    desc: "Join our hardware lab to design interconnected IoT sensor systems, microcontroller firmware, and real-time telemetry protocols for industrial automation.",
    reqs: [
      "Hands-on experience with Arduino, ESP8266/ESP32, and Raspberry Pi",
      "Proficiency in Embedded C/C++ and Python programming",
      "Familiarity with MQTT, Thingspeak, AWS IoT Core, and MODBUS",
      "Strong circuit debugging and PCB layout comprehension",
    ],
    perks: ["Hardware Prototyping Lab", "Industrial Automation Projects", "Comprehensive Toolkit"],
  },
  {
    id: "cloud-devops",
    title: "Cloud DevOps Engineer",
    category: "job",
    roleType: "engineering",
    badge: "💼 Full-Time Engineering",
    location: "Remote / Hybrid",
    type: "Full-Time",
    desc: "Architect scalable multi-cloud infrastructure, automate CI/CD release pipelines, and enforce zero-trust cybersecurity policies across our microservices.",
    reqs: [
      "Solid experience with AWS/Azure core infrastructure and IAM policies",
      "Proficiency in Docker containerization and Kubernetes cluster management",
      "Expertise in Infrastructure-as-Code tools like Terraform or Ansible",
      "Background in Linux system administration and bash scripting",
    ],
    perks: ["Cloud Credits & Tooling", "Remote Flexibility", "Zero-Trust Architecture"],
  },

  // Internship Programs
  {
    id: "intern-aiml",
    title: "AI & Machine Learning Research Intern",
    category: "internship",
    roleType: "internship",
    badge: "🎓 Internship Program",
    location: "Madurai / Hybrid",
    type: "Internship",
    duration: "3 – 6 Months",
    desc: "Collaborate directly with our core engineering team on live machine learning projects, training neural networks, exploring computer vision models, and preparing datasets.",
    reqs: [
      "Strong foundational programming skills in Python",
      "Familiarity with libraries like NumPy, Pandas, Scikit-Learn, or PyTorch",
      "Enthusiasm for exploratory data analysis, LLMs, and model fine-tuning",
      "Students or recent graduates in CSE, IT, AI & Data Science, or related fields",
    ],
    perks: ["Industry Project Certificate", "Pre-Placement Offer (PPO) Eligibility", "Direct Technical Mentorship"],
  },
  {
    id: "intern-iot",
    title: "IoT & Embedded Systems Lab Intern",
    category: "internship",
    roleType: "internship",
    badge: "🎓 Internship Program",
    location: "Madurai (On-Site Lab)",
    type: "Internship",
    duration: "3 – 6 Months",
    desc: "Gain comprehensive hands-on hardware laboratory experience interfacing physical sensors, programming ESP32/Raspberry Pi boards, and building IoT cloud telemetry pipelines.",
    reqs: [
      "Working knowledge of Embedded C/C++ or MicroPython",
      "Familiarity with microcontrollers (ESP32, Arduino, STM32) and basic electronics",
      "Curiosity for sensor arrays, robotics hardware, and industrial telemetry protocols",
      "Students or recent graduates in ECE, EEE, Mechatronics, or CSE",
    ],
    perks: ["Hardware Lab Access", "Live Industrial Prototype Experience", "Verified Industrial Certificate"],
  },
  {
    id: "intern-web",
    title: "Full-Stack Web Development Intern",
    category: "internship",
    roleType: "internship",
    badge: "🎓 Internship Program",
    location: "Madurai / Hybrid",
    type: "Internship",
    duration: "3 – 6 Months",
    desc: "Build next-generation client interfaces, scalable REST APIs, and interactive dashboards utilizing Next.js, React, modern Tailwind/CSS systems, and databases.",
    reqs: [
      "Solid grounding in HTML5, CSS3, modern JavaScript, and React basics",
      "Familiarity with Git version control and responsive design best practices",
      "Eye for refined UI/UX aesthetics, animations, and micro-interactions",
      "Students or graduates looking to fast-track their engineering career",
    ],
    perks: ["Production Codebase Experience", "Portfolio Project Development", "PPO Opportunities"],
  },
  {
    id: "intern-robotics",
    title: "Robotics & Automation Intern",
    category: "internship",
    roleType: "internship",
    badge: "🎓 Internship Program",
    location: "Madurai (On-Site Lab)",
    type: "Internship",
    duration: "3 – 6 Months",
    desc: "Contribute to cutting-edge robotics kits, kinematic arm controls, motor drivers, sensor fusion algorithms, and practical automation modules in our state-of-the-art lab.",
    reqs: [
      "Understanding of motors, servo drives, microcontroller interfacing, and basic CAD",
      "Passion for building mechanical and autonomous robotics prototypes",
      "Active interest in robotics competitions and STEM education kits",
      "Enrolled in or completed Mechatronics, Mechanical, Robotics, or EEE",
    ],
    perks: ["Robotics Testbed Access", "Live Prototype Building", "Industrial Training Certificate"],
  },
];

const internshipBenefits = [
  {
    icon: Lightbulb,
    title: "Live Industrial Projects",
    desc: "Work on production-grade AI models, embedded IoT boards, and web platforms instead of toy assignments.",
  },
  {
    icon: Award,
    title: "Verified Credentials",
    desc: "Receive an official InnoStorey Innovations Industrial Training & Internship Certificate upon successful completion.",
  },
  {
    icon: Cpu,
    title: "Hardware & AI Lab Access",
    desc: "Full access to our physical hardware lab equipped with oscilloscopes, sensor arrays, microcontrollers, and edge GPUs.",
  },
  {
    icon: Briefcase,
    title: "Fast-Track PPO Pathway",
    desc: "Outstanding interns receive direct Pre-Placement Offers (PPO) for full-time associate engineer and trainer roles.",
  },
];

const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScLmRDDY_usFazwG_rJ9uvVB-YUNar_AzjLDRNaunI-KQPAkA/viewform";

export default function CareersPage() {
  const [filter, setFilter] = useState<"all" | "job" | "internship">("all");

  const filteredOpportunities = opportunities.filter((op) => {
    if (filter === "all") return true;
    return op.category === filter;
  });

  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="careers" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            JOIN OUR TEAM & ACADEMIC LABS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Build Tomorrow&apos;s <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Technology & Talent</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            At InnoStorey Innovations, we offer opportunities across software engineering, hardware IoT labs, technical training, digital instruction, and immersive internship programs.
          </p>
        </div>
      </section>

      {/* Internship Highlights Banner */}
      <section className="py-16 bg-[#050505] border-b border-[rgba(255,215,0,0.15)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#FFD700] px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 inline-block mb-3">
              ACADEMIC & INDUSTRIAL INCUBATION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Why Join InnoStorey Innovations?
            </h2>
            <p className="text-xs text-[#999999] mt-2 font-light">
              Empowering engineers, instructors, and student interns with state-of-the-art facilities, real client projects, and verified credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internshipBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-neon p-6 rounded-2xl border border-[rgba(255,215,0,0.15)] hover:border-[#FFD700]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <h3 className="font-serif text-lg text-white font-normal mb-2 group-hover:text-[#FFD700] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#999999] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CURRENT OPPORTUNITIES"
            title="Open Positions, Trainers & Internships"
            description="Explore our openings across engineering, technical training, digital learning instruction, and student internship tracks."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                filter === "all"
                  ? "bg-[#FFD700] text-[#050505] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                  : "bg-[#141414] text-[#A8A8A8] border border-[#262626] hover:text-[#FFD700] hover:border-[#FFD700]/40"
              }`}
            >
              All Opportunities ({opportunities.length})
            </button>
            <button
              onClick={() => setFilter("job")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                filter === "job"
                  ? "bg-[#FFD700] text-[#050505] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                  : "bg-[#141414] text-[#A8A8A8] border border-[#262626] hover:text-[#FFD700] hover:border-[#FFD700]/40"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Careers & Trainers ({opportunities.filter((o) => o.category === "job").length})</span>
            </button>
            <button
              onClick={() => setFilter("internship")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                filter === "internship"
                  ? "bg-[#FFD700] text-[#050505] shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                  : "bg-[#141414] text-[#A8A8A8] border border-[#262626] hover:text-[#FFD700] hover:border-[#FFD700]/40"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Internship Programs ({opportunities.filter((o) => o.category === "internship").length})</span>
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {filteredOpportunities.map((op) => {
              const isInternship = op.category === "internship";
              const isTrainer = op.roleType === "trainer";

              return (
                <div
                  key={op.id}
                  className="glass-neon glass-shine relative p-8 rounded-2xl transition-all duration-300 space-y-6 border border-[rgba(255,215,0,0.15)] hover:border-[#FFD700]/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-full border ${
                            isInternship
                              ? "bg-[rgba(255,215,0,0.12)] text-[#FFD700] border-[rgba(255,215,0,0.4)]"
                              : isTrainer
                              ? "bg-[rgba(245,215,110,0.15)] text-[#F5D76E] border-[rgba(245,215,110,0.45)]"
                              : "bg-[rgba(255,255,255,0.06)] text-[#E0E0E0] border-[rgba(255,255,255,0.2)]"
                          }`}
                        >
                          {op.badge || (isInternship ? "🎓 Internship Program" : "💼 Full-Time Position")}
                        </span>
                        {op.duration && (
                          <span className="text-[10px] text-[#FFD700] bg-[#FFD700]/10 px-2.5 py-0.5 rounded-full border border-[#FFD700]/25 flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3" /> {op.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#F5F5F5]">
                        {op.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#A8A8A8] pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFD700]" /> {op.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FFD700]" /> {op.type}
                        </span>
                      </div>
                    </div>

                    <a
                      href={APPLICATION_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 self-start sm:self-auto shrink-0 shadow-[0_0_12px_rgba(255,215,0,0.25)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] cursor-pointer inline-flex items-center justify-center gap-1.5 text-center group/btn"
                    >
                      <span>{isInternship ? "Apply for Internship" : isTrainer ? "Apply as Trainer" : "Apply Now"}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <p className="text-sm text-[#999999] font-light leading-relaxed">
                    {op.desc}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-semibold text-[#FFD700] tracking-wider block">
                      {isInternship
                        ? "Eligibility & Prerequisites:"
                        : isTrainer
                        ? "Instructional Competencies & Prerequisites:"
                        : "Key Requirements:"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {op.reqs.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#D8D8D8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {op.perks && (
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-[#888] tracking-wider mr-2">
                        Perks & Highlights:
                      </span>
                      {op.perks.map((perk, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] text-[#F5D76E] bg-[#FFD700]/10 border border-[#FFD700]/20 px-2.5 py-0.5 rounded-full"
                        >
                          ★ {perk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Portal CTA Section */}
      <section id="apply-form" className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-neon-strong glass-shine relative p-8 md:p-14 rounded-3xl shadow-2xl text-center space-y-8 border border-[rgba(255,215,0,0.25)] overflow-hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
              <Briefcase className="w-8 h-8 text-[#FFD700]" />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 inline-block">
                OFFICIAL APPLICATION PORTAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F5F5]">
                Submit Your Application
              </h2>
              <p className="text-sm text-[#A8A8A8] font-light leading-relaxed">
                Click below to complete our official application form on Google Forms for engineering roles, technical trainer & instructor openings, or internship programs.
              </p>
            </div>

            <div className="flex items-center justify-center pt-2">
              <a
                href={APPLICATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-[0_0_25px_rgba(255,215,0,0.35)] hover:shadow-[0_0_35px_rgba(255,215,0,0.6)] flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Fill Application Form</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-center gap-6 text-xs text-[#777]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700]" /> Fast-track evaluation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700]" /> Full-Time & Internship tracks
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700]" /> Direct recruitment team review
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
