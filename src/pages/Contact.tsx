import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";

const Contact = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="pt-20">
        <AdmissionsCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
