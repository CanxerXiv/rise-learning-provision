import { Link } from "react-router-dom";
import { GraduationCap, Beaker, Palette, Calculator, Globe, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
    {
        icon: GraduationCap,
        title: "Main Program",
        description: "Core dual curriculum integrating international and local standards.",
    },
    {
        icon: Globe,
        title: "IGCSE Program",
        description: "Globally recognized qualifications for secondary students.",
    },
    {
        icon: Calculator,
        title: "Enrichment",
        description: "Weekend classes for skills and competition prep.",
    },
];

export function HomeProgramsSection() {
    return (
        <section id="programs" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
                        Our Programs
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Dual Curriculum Excellence
                    </h2>
                    <Link to="/programs">
                        <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
                            View All Programs <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((program) => (
                        <div
                            key={program.title}
                            className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium border border-border/50 transition-all duration-300 hover:-translate-y-1 text-center"
                        >
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary transition-colors duration-300">
                                <program.icon className="h-8 w-8 text-primary group-hover:text-secondary-foreground transition-colors" />
                            </div>

                            <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {program.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {program.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
