"use client";

import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import CourseCard from "@/components/CourseCard";
import { Sparkles, Award, ShieldCheck, CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";
import PageHeroBackground from "@/components/PageHeroBackground";

const webDevCourses = [
  {
    title: "HTML5 Fundamentals",
    duration: "3 Months",
    fees: "₹1,200 / month",
    schedule: "3 Classes / Week",
    image: "/images/html.png",
    category: "WEB FOUNDATIONS",
  },
  {
    title: "CSS3 & Modern Styling",
    duration: "3 Months",
    fees: "₹1,200 / month",
    schedule: "3 Classes / Week",
    image: "/images/css3.png",
    category: "UI & STYLING",
  },
  {
    title: "JavaScript ES6+",
    duration: "4 Months",
    fees: "₹1,200 / month",
    schedule: "3 Classes / Week",
    image: "/images/js.jpg",
    category: "FRONTEND LOGIC",
  },
  {
    title: "PHP 7 & 8 Backend",
    duration: "4 Months",
    fees: "₹1,200 / month",
    schedule: "3 Classes / Week",
    image: "/images/php.jpg",
    category: "BACKEND DEV",
  },
  {
    title: "MySQLi Database Architecture",
    duration: "4 Months",
    fees: "₹1,200 / month",
    schedule: "3 Classes / Week",
    image: "/images/MySQL.png",
    category: "DATABASE",
  },
];

const careerCourses = [
  {
    title: "Advanced Photoshop & Graphic Design",
    duration: "3 Months",
    fees: "₹1,800 / month",
    schedule: "3 Classes / Week",
    image: "/images/ps.jpg",
    category: "CREATIVE DESIGN",
  },
  {
    title: "Python (Basics to Practical)",
    duration: "1 Month",
    fees: "₹1,800 / month",
    schedule: "4 Classes / Week",
    image: "/images/python.webp",
    category: "PROGRAMMING",
  },
  {
    title: "Internet Basics & Digital Literacy",
    duration: "1 Month",
    fees: "₹1,800 / month",
    schedule: "2 Classes / Week",
    image: "/images/internet.jpg",
    category: "DIGITAL LITERACY",
  },
  {
    title: "Software Installation & SysAdmin",
    duration: "1 Month",
    fees: "₹1,800 / month",
    schedule: "2 Classes / Week",
    image: "/images/Software-Installations.jpg",
    category: "SYSTEM CARE",
  },
  {
    title: "C Programming Core",
    duration: "1.5 Months",
    fees: "₹1,800 / month",
    schedule: "3 Classes / Week",
    image: "/images/C.jpg",
    category: "CORE CS",
  },
  {
    title: "C++ Programming & OOPs",
    duration: "1.5 Months",
    fees: "₹1,800 / month",
    schedule: "3 Classes / Week",
    image: "/images/cpp.jpg",
    category: "CORE CS",
  },
];

const iotCourses = [
  {
    title: "IoT Fundamentals",
    duration: "2 Months",
    fees: "₹2,000 / month",
    schedule: "3 Classes / Week",
    image: "/images/iot.jpg",
    category: "IOT HARDWARE",
  },
  {
    title: "Arduino Microcontroller Programming",
    duration: "1.5 Months",
    fees: "₹2,000 / month",
    schedule: "3 Classes / Week",
    image: "/images/arduino.jpg",
    category: "EMBEDDED C",
  },
  {
    title: "Raspberry Pi Industrial Projects",
    duration: "2 Months",
    fees: "₹2,000 / month",
    schedule: "3 Classes / Week",
    image: "/images/Raspberry-Pi.jpg",
    category: "SINGLE BOARD COMPUTERS",
  },
  {
    title: "IoT with AWS & Cloud Integration",
    duration: "2 Months",
    fees: "₹2,000 / month",
    schedule: "MQTT / Thingspeak / AWS",
    image: "/images/cloud-storage.jpg",
    category: "CLOUD IOT",
  },
  {
    title: "IoT Security Basics & Firmware Protection",
    duration: "1 Month",
    fees: "₹2,000 / month",
    schedule: "Device Security Intro",
    image: "/images/IOT_security.jpg",
    category: "HARDWARE SECURITY",
  },
];

const schoolCourses = [
  {
    title: "School Computer Subject Tutoring",
    duration: "Ongoing",
    fees: "₹1,300 - ₹1,600 / month",
    schedule: "ICSE / CBSE / State Board",
    image: "/images/Basic-Computer.jpg",
    category: "K-12 ACADEMICS",
  },
  {
    title: "Junior Basic Computer Course",
    duration: "Ongoing",
    fees: "₹1,300 - ₹1,400 / month",
    schedule: "Level-I to Level-III+",
    image: "/images/junior basic.jpg",
    category: "FOUNDATIONAL SKILLS",
  },
];

export default function AcademicsPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <PageHeroBackground variant="academics" className="absolute inset-0 w-full h-full pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            ACADEMIC EXCELLENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Center of Excellence <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">& Professional Certifications</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Bridging academia and industry through hands-on technical training, web development certifications, IoT labs, and foundational computer science courses.
          </p>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="py-6 bg-[#FFD700]/10 border-b border-[#FFD700]/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left text-xs text-[#F5D76E]">
          <Award className="w-5 h-5 text-[#FFD700] shrink-0" />
          <span>
            <strong>Special Offer:</strong> Get an instant <strong>10% discount</strong> on one-time course payment. All programs include an official <strong>InnoStorey Completion Certificate</strong>.
          </span>
        </div>
      </section>

      {/* 1. Software Development & Web Technologies */}
      <section className="py-20 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CATEGORY I"
            title="Software Development & Web Technologies"
            description="Master modern frontend development, backend logic, and database management."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webDevCourses.map((c, idx) => (
              <CourseCard key={idx} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Career-Oriented Certifications */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CATEGORY II"
            title="Career-Oriented & Short-Term Certifications"
            description="Boost your employability with specialized skills in Python, Graphic Design, and Systems."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerCourses.map((c, idx) => (
              <CourseCard key={idx} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. IoT & Embedded Systems */}
      <section className="py-20 bg-[#000000] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CATEGORY III"
            title="IoT & Embedded Systems Lab"
            description="Hands-on training with microcontrollers, Arduino, Raspberry Pi, and Cloud IoT protocols."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iotCourses.map((c, idx) => (
              <CourseCard key={idx} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. School Level */}
      <section className="py-20 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="CATEGORY IV"
            title="School-Level & Foundational Computer Courses"
            description="Nurturing young minds with essential computer literacy, coding fundamentals, and ICSE/CBSE subject support."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {schoolCourses.map((c, idx) => (
              <CourseCard key={idx} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Get a Certificate CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#080808] to-[#000000] border-t border-[#FFD700]/15 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,215,0,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="neon-card glass-shine p-10 sm:p-14 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/25 flex items-center justify-center animate-pulse-gold">
                <GraduationCap className="w-8 h-8 text-[#FFD700]" />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700]">CERTIFICATE SERVICES</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
                Earn Your InnoStorey <span className="gold-gradient-text italic">Certificate</span>
              </h2>
              <p className="text-sm text-[#999999] font-light leading-relaxed max-w-xl mx-auto">
                Completed a workshop or training session? Register for your official InnoStorey completion certificate and download it once it&apos;s available.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {[
                { icon: ShieldCheck, label: "Secure Registration" },
                { icon: Award,        label: "Official Certificate" },
                { icon: CheckCircle2, label: "Instant Code Generation" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-[#777] bg-[#111] border border-[#222] rounded-full px-4 py-2">
                  <Icon className="w-3.5 h-3.5 text-[#FFD700]" />
                  {label}
                </div>
              ))}
            </div>
            <Link
              id="get-a-certificate-btn"
              href="/certificates"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#FFF000] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.25)]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Get a Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Callout */}
      <section id="enroll-section" className="py-20 bg-[#000000] text-center border-t border-[#FFD700]/15 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <Sparkles className="w-8 h-8 text-[#FFD700] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F5F5F5]">
            Ready to Enroll in a Course?
          </h2>
          <p className="text-sm text-[#999999] font-light">
            Fill out our official registration form to reserve your seat in the upcoming batch.
          </p>
          <a
            href="https://forms.gle/cFbWFrGunQ1CDktw5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#FFD700] text-[#050505] font-semibold text-xs uppercase tracking-widest hover:bg-[#F5D76E] transition-all duration-300 shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Open Online Registration Form</span>
          </a>
        </div>
      </section>

    </div>
  );
}
