import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";

const Programs = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="pt-20">
        <ProgramsSection />
        <AdmissionsCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
