import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";

const Facilities = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="pt-20">
        <FacilitiesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Facilities;
