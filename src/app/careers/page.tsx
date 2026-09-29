"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Sparkles, Send } from "lucide-react";
import BackgroundPaths from "@/components/BackgroundPaths";

const positions = [
  {
    id: "ai-ml-dev",
    title: "Software Developer (AI/ML)",
    location: "Madurai / Hybrid",
    type: "Full-Time",
    desc: "We are seeking a talented AI/ML Engineer to design and deploy custom deep learning models, natural language algorithms, and computer vision systems.",
    reqs: [
      "Proficiency in Python, TensorFlow, PyTorch, and OpenCV",
      "Experience with RESTful API integration and cloud model deployment",
      "Strong understanding of neural network architectures and data pipelines",
      "Minimum 1-3 years of relevant software development experience",
    ],
  },
  {
    id: "iot-eng",
    title: "IoT Solutions Engineer",
    location: "Madurai",
    type: "Full-Time",
    desc: "Join our hardware lab to design interconnected IoT sensor systems, microcontroller firmware, and real-time telemetry protocols.",
    reqs: [
      "Hands-on experience with Arduino, ESP8266/ESP32, and Raspberry Pi",
      "Proficiency in Embedded C/C++ and Python programming",
      "Familiarity with MQTT, Thingspeak, AWS IoT Core, and MODBUS",
      "Strong circuit debugging and PCB layout comprehension",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud DevOps Engineer",
    location: "Remote / Hybrid",
    type: "Full-Time",
    desc: "Architect scalable multi-cloud infrastructure, automate CI/CD release pipelines, and enforce zero-trust cybersecurity policies.",
    reqs: [
      "Solid experience with AWS/Azure core infrastructure and IAM policies",
      "Proficiency in Docker containerization and Kubernetes cluster management",
      "Expertise in Infrastructure-as-Code tools like Terraform or Ansible",
      "Background in Linux system administration and bash scripting",
    ],
  },
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <BackgroundPaths className="absolute inset-0 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            JOIN OUR TEAM
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Build Tomorrow's <br />
            <span className="gold-gradient-text italic font-normal">Technology With Us</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            At InnoStorey Innovations, we nurture talent, encourage research curiosity, and solve real-world engineering challenges every single day.
          </p>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CURRENT OPPORTUNITIES"
            title="Open Positions"
            description="Explore our active engineering roles and apply to become part of our growing innovation team."
          />

          <div className="space-y-8 max-w-4xl mx-auto">
            {positions.map((pos) => (
              <div
                key={pos.id}
              className="glass-neon glass-shine relative p-8 rounded-2xl transition-all duration-300 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#F5F5F5]">
                      {pos.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-[#FFD700] mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {pos.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {pos.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPosition(pos.id)}
                    className="px-6 py-2.5 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-colors self-start sm:self-auto"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="text-sm text-[#999999] font-light leading-relaxed">
                  {pos.desc}
                </p>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-semibold text-[#FFD700] tracking-wider block">
                    Key Requirements:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pos.reqs.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#D8D8D8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-neon-strong glass-shine relative p-8 md:p-12 rounded-3xl shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700]">
                DIRECT APPLICATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
                Submit Your Resume
              </h2>
              <p className="text-xs text-[#999999] font-light">
                Fill out your details below or email directly to <a href="mailto:info@innostorey.com" className="text-[#FFD700] underline">info@innostorey.com</a>.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/40 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#FFD700] mx-auto" />
                <h3 className="font-serif text-2xl text-[#F5F5F5]">Application Received</h3>
                <p className="text-xs text-[#D8D8D8]">
                  Thank you for applying to InnoStorey Innovations! Our HR engineering team will review your application and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999999] mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Kumar"
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#F5F5F5] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999999] mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#F5F5F5] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999999] mb-2 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#F5F5F5] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#999999] mb-2 font-medium">
                      Target Position *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#F5F5F5] focus:outline-none focus:border-[#FFD700] transition-colors"
                    >
                      <option value="">Select an open position...</option>
                      {positions.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                      <option value="other">General Spontaneous Application</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#999999] mb-2 font-medium">
                    Cover Note / Experience Summary
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your relevant technical background and GitHub/Portfolio links..."
                    className="w-full px-4 py-3 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#F5F5F5] focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
