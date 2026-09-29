import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InnoStorey Innovations Pvt Ltd | Futuristic Neon Gold Technology Solutions",
  description: "Empowering Innovation Through Intelligent Cloud Integration, AI, IoT, Cybersecurity, Software Development, and Academic Excellence.",
  keywords: [
    "InnoStorey Innovations",
    "Cloud Integration",
    "AI Development",
    "IoT Smart Devices",
    "Cybersecurity",
    "Center of Excellence",
    "Software Consultancy",
    "Madurai",
    "Technology Solutions"
  ],
  authors: [{ name: "InnoStorey Innovations Pvt Ltd" }],
  openGraph: {
    title: "InnoStorey Innovations Pvt Ltd",
    description: "Enterprise Cloud, AI, IoT, and Software Engineering Solutions.",
    type: "website",
    url: "https://www.innostorey.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable} dark scroll-smooth`}>
      <body className="bg-black text-white font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
