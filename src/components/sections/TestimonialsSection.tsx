import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url: string | null;
  rating: number | null;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Rise Academy transformed my daughter's approach to learning. The teachers genuinely care about each student's success and go above and beyond to help them achieve their goals.",
    name: "Sarah Mitchell",
    role: "Parent of Class of 2024",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: "2",
    quote: "The IB program at Rise prepared me exceptionally well for university. I graduated with the skills, confidence, and global perspective needed to succeed at an Ivy League institution.",
    name: "James Chen",
    role: "Alumni, Class of 2022",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "3",
    quote: "As an educator for 20 years, I can say that Rise's commitment to innovation while maintaining academic rigor is unparalleled. It's a privilege to be part of this community.",
    name: "Dr. Emily Rodriguez",
    role: "Science Department Head",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, quote, avatar_url, rating")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else if (data && data.length > 0) {
        setTestimonials(data);
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl p-8 lg:p-12">
              <div className="text-center space-y-6 pt-8">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                <Skeleton className="h-6 w-48 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            What Our Community Says
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Hear from parents, students, and faculty about their experiences at Rise Academy.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-large relative">
            <Quote className="absolute top-8 left-8 h-16 w-16 text-secondary/20" />

            <div className="text-center space-y-6 pt-8">
              {/* Rating */}
              <div className="flex items-center justify-center gap-1">
                {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed italic max-w-3xl mx-auto">
                "{currentTestimonial?.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4 pt-6">
                <img
                  src={currentTestimonial?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"}
                  alt={currentTestimonial?.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-secondary/20"
                />
                <div className="text-center">
                  <p className="font-serif font-bold text-lg text-foreground">
                    {currentTestimonial?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-secondary"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
