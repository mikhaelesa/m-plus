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

export default function Home() {
  return (
    <>
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
