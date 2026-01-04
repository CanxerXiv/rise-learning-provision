import { GraduationCap, Beaker, Palette, Calculator, Globe, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: GraduationCap,
    title: "Main Program",
    grades: "Pre-K to Grade 6",
    description: "Our core dual curriculum integrates international English, Maths, and Science with the Myanmar National Curriculum for comprehensive learning.",
    features: ["Dual curriculum system", "International standards", "Myanmar National Curriculum", "Holistic development"],
    subPrograms: [
      { title: "Coding & Technology", features: ["Scope IT partnership", "Coding fundamentals"] },
      { title: "Arts & Music", features: ["Visual arts", "Creative expression"] },
      { title: "Sports & PE", features: ["Football", "Badminton", "Taekwondo"] }
    ]
  },
  {
    icon: Globe,
    title: "IGCSE Program",
    grades: "Starting June 2025",
    description: "Cambridge IGCSE classes offering globally recognized qualifications with a wide range of subject choices for secondary students.",
    features: ["EFL, ESL, FPM", "Maths B, Physics, Chemistry", "Biology, ICT", "Business Studies, Computer Science"],
  },
  {
    icon: Calculator,
    title: "Weekend Enrichment",
    grades: "All Ages",
    description: "Specialized weekend classes designed to enhance skills and prepare students for academic competitions and real-world challenges.",
    features: ["English classes", "Robotics", "Math Olympiad", "Skill development"],
  },
];

export function ProgramsSection() {
  return (
    <section id="programs" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Our Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Dual Curriculum Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From Pre-kindergarten to Grade 6 and beyond, our programs combine international standards with local curriculum, plus IGCSE and enrichment classes.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                  <program.icon className="h-7 w-7 text-primary group-hover:text-secondary-foreground transition-colors" />
                </div>
                <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  {program.grades}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {program.description}
              </p>

              <ul className="space-y-2 mb-6">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {program.subPrograms && (
                <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Included Programs</h4>
                  <div className="space-y-4">
                    {program.subPrograms.map(sub => (
                      <div key={sub.title}>
                        <h5 className="font-semibold text-foreground text-sm mb-1">{sub.title}</h5>
                        <div className="flex flex-wrap gap-2">
                          {sub.features.map(f => (
                            <span key={f} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{f}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full justify-between text-primary hover:text-secondary-foreground group/btn mt-4"
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-light"
          >
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
