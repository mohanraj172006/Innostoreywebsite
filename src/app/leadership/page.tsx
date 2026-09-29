import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import BackgroundPaths from "@/components/BackgroundPaths";

const teamMembers = [
  {
    name: "S. Vignesh",
    role: "Senior Cloud & DevOps Architect",
    image: "/images/team1.jpg",
    bio: "Specializing in multi-cloud infrastructure, Kubernetes orchestration, and enterprise CI/CD pipelines.",
    email: "vignesh@innostorey.com",
    linkedin: "https://www.linkedin.com/in/innostorey-innovations-127b83332",
  },
  {
    name: "R. Anitha",
    role: "AI & Data Science Lead",
    image: "/images/team2.jpg",
    bio: "Expert in deep neural networks, computer vision, medical image diagnostic models, and natural language processing.",
    email: "anitha@innostorey.com",
    linkedin: "https://www.linkedin.com/in/innostorey-innovations-127b83332",
  },
  {
    name: "M. Karthik",
    role: "IoT & Embedded Hardware Engineer",
    image: "/images/iot2.png",
    bio: "Focusing on microcontroller firmware development, telemetry protocols, Li-Fi hardware integration, and industrial automation.",
    email: "karthik@innostorey.com",
    linkedin: "https://www.linkedin.com/in/innostorey-innovations-127b83332",
  },
  {
    name: "P. Divya",
    role: "Academic Programs & Mentorship Lead",
    image: "/images/Mentorship.jpg",
    bio: "Managing Center of Excellence curricula, university guest workshops, student hackathon mentorship, and course certifications.",
    email: "academics@innostorey.com",
    linkedin: "https://www.linkedin.com/in/innostorey-innovations-127b83332",
  },
];

export default function LeadershipPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <BackgroundPaths className="absolute inset-0 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            EXECUTIVE LEADERSHIP
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Meet the Minds Shaping <br />
            <span className="gold-gradient-text italic font-normal">Tomorrow's Technology</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            Our company leadership brings together industry veterans, visionary founders, research scientists, and passionate technical mentors.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="COMPANY FOUNDERS"
            title="Our Prestigious Founders"
            description="Leading InnoStorey Innovations Pvt Ltd with strategic vision, technical excellence, and dedication to innovation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamCard
              name="Mr. G. Mohanraj"
              role="Founder & Managing Director"
              image="/images/MOHAN.jpg"
              bio="Visionary leader steering enterprise cloud strategy, IoT product engineering, and AI research initiatives. Passionate about empowering regional tech ecosystems."
              isFounder={true}
              linkedin="https://www.linkedin.com/in/innostorey-innovations-127b83332"
              email="info@innostorey.com"
            />

            <TeamCard
              name="Ms. G. Krishnaveni"
              role="Co-Founder & Executive Director"
              image="/images/KRISHNAVENI IMAGE.jpg"
              bio="Directing Center of Excellence academic outreach, corporate governance, strategic university partnerships, and skill development programs."
              isFounder={true}
              linkedin="https://www.linkedin.com/in/innostorey-innovations-127b83332"
              email="info@innostorey.com"
            />
          </div>
        </div>
      </section>

      {/* Dynamic Engineering Team */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ENGINEERING & RESEARCH STAFF"
            title="Our Dynamic Engineering Team"
            description="Talented software engineers, cloud architects, and academic instructors dedicated to your success."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
