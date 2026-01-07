import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";

const Contact = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // Reduced timeout to execute after render
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

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
