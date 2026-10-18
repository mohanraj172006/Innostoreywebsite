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
  title: "InnoStorey Innovations Pvt Ltd | Enterprise Cloud, AI & IoT Solutions",
  description: "Empowering Innovation Through Intelligent Cloud Integration, AI, IoT, Cybersecurity, Software Development, and Academic Excellence. Based in Madurai, serving global enterprises.",
  keywords: [
    "InnoStorey Innovations",
    "Cloud Integration",
    "AI Development",
    "IoT Smart Devices",
    "Cybersecurity",
    "Center of Excellence",
    "Software Consultancy",
    "Madurai",
    "Technology Solutions",
    "Tamil Nadu",
    "Enterprise Technology"
  ],
  authors: [{ name: "InnoStorey Innovations Pvt Ltd" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "InnoStorey Innovations Pvt Ltd",
    description: "Enterprise Cloud, AI, IoT, and Software Engineering Solutions.",
    type: "website",
    url: "https://www.innostorey.in",
    siteName: "InnoStorey Innovations",
  },
  twitter: {
    card: "summary_large_image",
    title: "InnoStorey Innovations Pvt Ltd",
    description: "Enterprise Cloud, AI, IoT, and Software Engineering Solutions.",
  },
  alternates: {
    canonical: "https://www.innostorey.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${manrope.variable} dark scroll-smooth`}
    >
      <body className="bg-black text-white font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
