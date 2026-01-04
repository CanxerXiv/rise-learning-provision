import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Target, title: "Mission", description: "To provide the best education possible for children in Myanmar through a dual curricular system that bridges local and international standards." },
  { icon: Eye, title: "Vision", description: "To expand into a leading international school by 2026, setting new standards for educational excellence in Myanmar." },
  { icon: Heart, title: "Values", description: "Innovation, Excellence, Global Perspective, and Community form the cornerstone of everything we do at Rise." },
];

const highlights = [
  "Dual curriculum: International + Myanmar National",
  "Pre-K to Grade 6 main program",
  "IGCSE classes starting June 2025",
  "Partnership with Scope IT Education Myanmar",
  "Weekend enrichment programs",
  "Expanding to international school in 2026",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-section-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            About Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Building Excellence Since 2020
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Rise Learning Provision has been at the forefront of educational innovation in Myanmar, offering a unique dual curriculum that prepares students for both local and global success.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
              alt="Rise Campus"
              className="relative rounded-2xl shadow-large w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground rounded-xl p-6 shadow-large">
              <p className="text-4xl font-bold font-serif">5+</p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Established in 2020, Rise Learning Provision offers education services from Pre-kindergarten to Grade 6 through a unique dual curricular system that integrates international English, Maths, and Science into the Myanmar National Curriculum.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a plan to expand to an international school in 2026, Rise keeps moving forward to provide the best education possible for children in Myanmar. Our partnership with Scope IT Education Myanmar ensures our students receive the best coding curriculum available.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  <span className="text-sm text-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary-light"
              onClick={() => window.open("https://www.facebook.com/profile.php?id=100064026300886", "_blank")}
            >
              Learn More About Us
            </Button>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                <value.icon className="h-7 w-7 text-primary group-hover:text-secondary-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
