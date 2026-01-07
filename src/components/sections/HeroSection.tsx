import { ChevronDown, Award, Users, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: GraduationCap, value: "Pre-K to G6", label: "Main Program" },
  { icon: Award, value: "2020", label: "Established" },
  { icon: Users, value: "Dual", label: "Curriculum System" },
  { icon: BookOpen, value: "IGCSE", label: "Coming June 2025" },
];

// Add import at top
import { useNavigate } from "react-router-dom";

// Inside component
export function HeroSection() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80')] bg-cover bg-center opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Award className="h-4 w-4 text-secondary" />
            <span className="text-sm text-primary-foreground font-medium">Dual Curriculum Excellence Since 2020</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
            Nurturing Future
            <span className="block text-secondary mt-2">Global Leaders</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Rise Learning Provision integrates international English, Maths, and Science with the Myanmar National Curriculum, preparing children for a globally connected future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary-light font-semibold px-8 py-6 text-lg shadow-glow"
              onClick={() => handleNavigation("/contact#contact")}
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg"
              onClick={() => handleNavigation("/contact#tour")}
            >
              Explore Campus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-float">
        <button
          onClick={() => scrollToSection("programs")}
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
