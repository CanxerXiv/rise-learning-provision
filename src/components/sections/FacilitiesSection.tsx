import { useState } from "react";
import { BookOpen, Beaker, Dumbbell, Music, Laptop, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const facilities = [
  {
    id: "library",
    icon: BookOpen,
    title: "Library & Media Center",
    description: "Our modern library houses over 50,000 books, digital resources, and collaborative study spaces designed for 21st-century learning.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    features: ["50,000+ books", "Digital catalog", "Study rooms", "Research databases"],
  },
  {
    id: "science",
    icon: Beaker,
    title: "Science Laboratories",
    description: "State-of-the-art labs equipped for biology, chemistry, physics, and environmental science experiments and research.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
    features: ["6 specialized labs", "Modern equipment", "Safety stations", "Research facilities"],
  },
  {
    id: "sports",
    icon: Dumbbell,
    title: "Athletic Complex",
    description: "A comprehensive sports facility including an indoor gym, Olympic pool, track and field, and courts for various sports.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    features: ["Indoor gymnasium", "Olympic pool", "Track & field", "Tennis courts"],
  },
  {
    id: "arts",
    icon: Music,
    title: "Performing Arts Center",
    description: "A stunning 800-seat theater with professional sound and lighting for concerts, plays, and school assemblies.",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
    features: ["800-seat theater", "Dance studios", "Music rooms", "Recording studio"],
  },
  {
    id: "tech",
    icon: Laptop,
    title: "Technology Hub",
    description: "Cutting-edge computer labs, robotics workshop, and maker space for digital learning and innovation.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    features: ["Computer labs", "Robotics workshop", "3D printers", "VR equipment"],
  },
  {
    id: "dining",
    icon: Utensils,
    title: "Dining Commons",
    description: "A welcoming cafeteria serving nutritious meals with diverse options to accommodate all dietary needs.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    features: ["Fresh daily meals", "Dietary options", "Outdoor seating", "Snack bar"],
  },
];

export function FacilitiesSection() {
  const [activeTab, setActiveTab] = useState("library");
  const activeFacility = facilities.find((f) => f.id === activeTab) || facilities[0];

  return (
    <section id="facilities" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            Campus Facilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            World-Class Facilities
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our campus is designed to inspire learning and creativity, featuring modern facilities that support every aspect of student development.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {facilities.map((facility) => (
            <button
              key={facility.id}
              onClick={() => setActiveTab(facility.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300",
                activeTab === facility.id
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <facility.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{facility.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <img
              src={activeFacility.image}
              alt={activeFacility.title}
              className="relative rounded-2xl shadow-large w-full h-[400px] object-cover transition-all duration-500"
            />
          </div>

          {/* Details */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <activeFacility.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
              {activeFacility.title}
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {activeFacility.description}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {activeFacility.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
