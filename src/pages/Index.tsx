import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeProgramsSection } from "@/components/sections/HomeProgramsSection";
import { HomeNewsSection } from "@/components/sections/HomeNewsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HomeProgramsSection />
        <HomeNewsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
