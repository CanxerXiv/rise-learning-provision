import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { FoundersSection } from "@/components/sections/FoundersSection";

const About = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="pt-20">
        <AboutSection />
        <FoundersSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
