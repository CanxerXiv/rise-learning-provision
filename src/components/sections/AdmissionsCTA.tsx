import { GraduationCap, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { number: "01", title: "Submit Application", description: "Complete our application form with required documents" },
  { number: "02", title: "Campus Visit", description: "Schedule a tour and meet our faculty and students" },
  { number: "03", title: "Assessment", description: "Participate in our assessment process" },
  { number: "04", title: "Welcome", description: "Join the Rise family and begin your journey" },
];

export function AdmissionsCTA() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="tour" className="py-20 lg:py-32 bg-gradient-to-br from-secondary via-secondary to-secondary-light relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <GraduationCap className="h-16 w-16 text-secondary-foreground/80 mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
              Begin Your Journey to Excellence
            </h2>
            <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Join a community of learners, leaders, and innovators. Applications for the upcoming academic year are now open.
            </p>
          </div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="bg-secondary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-secondary-foreground/20 hover:bg-secondary-foreground/20 transition-all duration-300"
              >
                <span className="text-3xl font-bold text-secondary-foreground/30 font-serif">
                  {step.number}
                </span>
                <h3 className="font-semibold text-secondary-foreground mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-foreground/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-dark font-semibold px-8 py-6 text-lg shadow-large"
              onClick={scrollToContact}
            >
              Apply Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary-foreground/30 text-secondary-foreground bg-transparent hover:bg-secondary-foreground/10 font-semibold px-8 py-6 text-lg"
            >
              Schedule a Tour
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-secondary-foreground/20">
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-foreground font-serif">Pre-K</p>
              <p className="text-sm text-secondary-foreground/70 mt-1">to Grade 6</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-foreground font-serif">10+</p>
              <p className="text-sm text-secondary-foreground/70 mt-1">IGCSE Subjects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary-foreground font-serif">2026</p>
              <p className="text-sm text-secondary-foreground/70 mt-1">International School</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
