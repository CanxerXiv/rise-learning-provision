import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const founders = [
    {
        name: "Dr. Thida Swe",
        role: "Founder & Head of School",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
        bio: "With over 20 years of experience in education, Dr. Swe established Rise to bring world-class educational standards to Myanmar."
    },
    {
        name: "James Wilson",
        role: "Director of Curriculum",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
        bio: "Former principal of international schools in Singapore and UK, specializing in dual-curriculum integration."
    },
    {
        name: "Sarah Chen",
        role: "Director of Operations",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
        bio: "Ensuring smooth daily operations and strategic growth for the Rise Learning Provision network."
    },
    {
        name: "Michael Kyaw",
        role: "Director of Student Affairs",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
        bio: "Dedicated to student well-being and fostering a positive, inclusive school community for all learners."
    }
];

export function FoundersSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
                        Leadership
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Meet Our Founders & Directors
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Visionary leaders dedicated to transforming education in Myanmar through innovation and excellence.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {founders.map((founder) => (
                        <div
                            key={founder.name}
                            className="group bg-card rounded-2xl p-6 border border-border/50 hover:shadow-medium transition-all duration-300 text-center"
                        >
                            <div className="relative inline-block mb-6">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-secondary transition-colors duration-300 mx-auto">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-sm">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{founder.name}</h3>
                                <p className="text-primary font-medium text-sm mb-4">{founder.role}</p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {founder.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
