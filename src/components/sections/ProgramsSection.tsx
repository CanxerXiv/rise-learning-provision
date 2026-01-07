import { useState } from "react";
import { GraduationCap, Beaker, Palette, Calculator, Globe, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

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
          {programs.map((program) => (
            <div
              key={program.title}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-large border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {program.description}
              </p>

              <Button
                variant="ghost"
                className="w-full justify-between text-primary hover:text-secondary-foreground group/btn mt-auto"
                onClick={() => setSelectedProgram(program)}
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedProgram} onOpenChange={(open) => !open && setSelectedProgram(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {selectedProgram && <selectedProgram.icon className="h-5 w-5 text-primary" />}
                </div>
                <DialogTitle className="text-2xl font-serif font-bold">{selectedProgram?.title}</DialogTitle>
              </div>
              <DialogDescription className="text-base text-muted-foreground">
                {selectedProgram?.grades}
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 overflow-y-auto p-6 pt-0">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {selectedProgram?.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedProgram?.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground bg-muted/50 p-2 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProgram?.subPrograms && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground">Specialized Programs</h4>
                    <div className="grid gap-4">
                      {selectedProgram.subPrograms.map((sub) => (
                        <div key={sub.title} className="bg-muted/30 p-4 rounded-xl border border-border/50">
                          <h5 className="font-semibold text-foreground mb-2">{sub.title}</h5>
                          <div className="flex flex-wrap gap-2">
                            {sub.features.map((f) => (
                              <span key={f} className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
