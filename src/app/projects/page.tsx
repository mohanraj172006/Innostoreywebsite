import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import BackgroundPaths from "@/components/BackgroundPaths";

const researchProjects = [
  {
    title: "Advanced Detection Technologies for CSSR Operations",
    description: "A specialized ground drone system equipped with thermal imaging, acoustic sensors, and CO2 detectors designed for Collapsed Structure Search and Rescue (CSSR) operations during natural disasters.",
    image: "/images/cssr.jpg",
    category: "RESEARCH & DEFENSE",
    technologies: ["Thermal Imaging", "CO2 Sensing", "Ground Robotics", "RF Mesh"],
    features: [
      "Real-time trapped victim detection",
      "Autonomous obstacle navigation in rubble",
      "Wireless telemetry feed to rescue command center",
    ],
    outcomes: "Accelerated disaster response times and protected search-and-rescue personnel.",
  },
  {
    title: "AI-Powered Medical Imaging & Diagnostic Tool",
    description: "An AI diagnostic suite leveraging deep learning neural networks to assist radiologists in detecting early-stage anomalies in X-rays, CT scans, and MRIs with elevated precision.",
    image: "/images/medical.jpg",
    category: "HEALTHCARE AI RESEARCH",
    technologies: ["Deep Learning", "Convolutional Neural Networks", "DICOM API", "Python"],
    features: [
      "Sub-second anomaly heatmapping",
      "Clinical decision support workflow",
      "HIPAA-compliant cloud storage",
    ],
    outcomes: "Enhanced diagnostic accuracy and reduced radiologist report backlog.",
  },
  {
    title: "AI-Powered Smart Grid Energy System",
    description: "An intelligent power grid management system using machine learning algorithms to predict energy demand spikes, balance renewable loads, and detect line faults in real time.",
    image: "/images/smart grid.jpg",
    category: "CLEANTECH RESEARCH",
    technologies: ["Predictive ML", "IoT Power Sensors", "Grid Automation"],
    features: [
      "Real-time load balancing across substations",
      "Predictive fault identification before outages occur",
      "Seamless integration with solar and wind inputs",
    ],
    outcomes: "Reduced power transmission losses by 18% and improved grid reliability.",
  },
  {
    title: "Autonomous Safety Drone Using Li-Fi Technology",
    description: "An innovative autonomous drone system leveraging Li-Fi (Light Fidelity) communication, QR code identification, and smart wearables integration to enhance women's safety in urban areas.",
    image: "/images/lifi.jpg",
    category: "PATENTED SAFETY RESEARCH",
    technologies: ["Li-Fi Communication", "Autonomous Drones", "QR Code ID", "Smart Wearables"],
    features: [
      "Real-time threat detection and instant police dispatch",
      "Autonomous aerial navigation to exact emergency GPS coordinates",
      "Secure light-based communication resistant to radio jamming",
    ],
    outcomes: "Rapid emergency response to harassment incidents and heightened public safety reassurance.",
  },
];

const enterpriseProjects = [
  {
    title: "Retail Management Platform",
    description: "Comprehensive multi-store inventory tracking, point-of-sale integration, supply chain analytics, and automated reorder triggers.",
    image: "/images/retail.png",
    category: "ENTERPRISE SOFTWARE",
    technologies: ["React", "Node.js", "MySQL", "Docker"],
  },
  {
    title: "Healthcare Records System (EHR)",
    description: "Secure, encrypted electronic health records management platform connecting clinics, labs, and patients seamlessly.",
    image: "/images/healt record.jpg",
    category: "HEALTHCARE IT",
    technologies: ["HL7 / FHIR", "Cloud Security", "PostgreSQL"],
  },
  {
    title: "Educational e-Learning Portal",
    description: "Interactive learning platform with video streaming, automated grading, live virtual classrooms, and student progress tracking.",
    image: "/images/e learning.jpg",
    category: "EDTECH",
    technologies: ["Next.js", "WebRTC", "AWS MediaConvert"],
  },
  {
    title: "Smart Logistics Tracking System",
    description: "Real-time fleet tracking system with GPS telemetry, route optimization algorithms, and automated delivery notifications.",
    image: "/images/smart logistics.jpg",
    category: "LOGISTICS & SUPPLY CHAIN",
    technologies: ["GPS Telemetry", "Mapbox API", "Node.js"],
  },
];

const miniProjects = [
  {
    title: "IoT-Based Smart Home Automation",
    description: "Remote control of home appliances using smartphone integration and Wi-Fi relay modules.",
    image: "/images/smart home.jpg",
    category: "ENGINEERING MINI PROJECT",
    technologies: ["Arduino", "ESP8266 Wi-Fi", "Mobile App"],
  },
  {
    title: "Automatic Street Light Control System",
    description: "Automated street light intensity adjustment based on ambient light sensors to conserve municipal energy.",
    image: "/images/street light.jpg",
    category: "ENGINEERING MINI PROJECT",
    technologies: ["Microcontroller", "LDR Sensor", "Relay Module"],
  },
  {
    title: "Bluetooth Controlled Robot Car",
    description: "Mobile-app controlled robotic car with ultrasonic obstacle avoidance sensors.",
    image: "/images/bt car.jpg",
    category: "ENGINEERING MINI PROJECT",
    technologies: ["Arduino", "Bluetooth Module", "Ultrasonic Sensor"],
  },
];

const studentProjects = [
  {
    title: "Solar-Powered Water Purifier",
    description: "Sustainable filtration system powered by solar energy to deliver clean drinking water in off-grid regions.",
    image: "/images/solar.jpg",
    category: "SCHOOL INNOVATION",
    technologies: ["Solar PV", "Filtration Unit", "Clean Energy"],
  },
  {
    title: "Smart Traffic Light System",
    description: "Dynamic traffic signal timing controller adjusting light cycles based on real-time vehicle density.",
    image: "/images/traffic.jpg",
    category: "SCHOOL INNOVATION",
    technologies: ["Microcontroller", "IR Sensors", "Traffic Logic"],
  },
  {
    title: "Automated Plant Watering System",
    description: "Precision irrigation system watering plants automatically based on live soil moisture readings.",
    image: "/images/plant watering.jpg",
    category: "SCHOOL INNOVATION",
    technologies: ["Moisture Sensor", "Arduino", "Water Pump"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-[#000000] text-[#F5F5F5] min-h-screen">
      
      {/* Page Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#080808] to-[#050505] border-b border-[#FFD700]/15 text-center relative overflow-hidden">
        {/* Animated Gold Background Paths */}
        <BackgroundPaths className="absolute inset-0 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FFD700] px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-6 inline-block">
            INNOVATION PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] leading-tight mb-6">
            Pioneering Research & <br />
            <span className="gold-gradient-text italic font-normal">Engineering Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-3xl mx-auto font-light leading-relaxed">
            From patented Li-Fi safety drones and CSSR ground robotics to enterprise platforms and student hackathon kits.
          </p>
        </div>
      </section>

      {/* 1. Research Projects */}
      <section className="py-24 bg-[#000000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="RESEARCH & DISCOVERY"
            title="Advanced Research Initiatives"
            description="High-impact research projects pushing the boundaries of AI, Li-Fi optical communication, and disaster robotics."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((p, idx) => (
              <ProjectCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Enterprise Solutions */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="COMMERCIAL PORTFOLIO"
            title="Enterprise Platforms & Systems"
            description="Scalable corporate applications powering retail, healthcare, logistics, and education."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enterpriseProjects.map((p, idx) => (
              <ProjectCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Engineering Mini Projects */}
      <section className="py-24 bg-[#000000] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ACADEMIC ENGINEERING"
            title="Engineering Mini Projects"
            description="Hands-on robotics and IoT projects showcasing practical problem solving."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miniProjects.map((p, idx) => (
              <ProjectCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Innovative School Student Projects */}
      <section className="py-24 bg-[#080808] border-t border-[rgba(255,255,255,0.05)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="YOUNG INNOVATORS"
            title="Innovative School Student Projects"
            description="Encouraging young minds to create sustainable tech solutions for real-world problems."
            centered={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentProjects.map((p, idx) => (
              <ProjectCard key={idx} {...p} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
