import type { Metadata } from "next";
import { BlogSection } from "@/components/organisms/BlogSection";

import { ComparisonSection } from "@/components/organisms/ComparisonSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { FaqSection } from "@/components/organisms/FAQSection";
import { Footer } from "@/components/organisms/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { LogoSection } from "@/components/organisms/LogoSection";
import { LpNavbar } from "@/components/organisms/Navbar";
import { TeamSection } from "@/components/organisms/TeamSection";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "M-Plus | Automotive Intelligence & Vehicle Data Analytics",
  description:
    "Advanced automotive intelligence platform leveraging the NHTSA vPIC dataset for precise vehicle identification, WMI distribution analysis, and manufacturing insights.",
  openGraph: {
    title: "M-Plus | Automotive Intelligence Platform",
    description:
      "Unlock precision vehicle analytics with M-Plus. Explore manufacturing trends and global WMI distributions with real-time data.",
    url: baseUrl,
    siteName: "M-Plus",
    images: [
      {
        url: `${baseUrl}/preview.png`,
        width: 1200,
        height: 630,
        alt: "M-Plus Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M-Plus | Automotive Intelligence Platform",
    description: "Precision vehicle data analytics and manufacturing insights.",
    images: [`${baseUrl}/preview.png`],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "M-Plus",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Automotive intelligence platform providing deep insights into vehicle manufacturing and global distribution.",
    sameAs: ["https://twitter.com/mplus", "https://linkedin.com/company/mplus"],
  };


  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <necesarry for jsonLd. Check https://nextjs.org/docs/app/guides/json-ld>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LpNavbar />
      <HeroSection />
      <ComparisonSection />
      <TestimonialsSection />
      <LogoSection />
      <TeamSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
