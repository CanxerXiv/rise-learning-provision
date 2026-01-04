import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface NewsEvent {
    id: string;
    title: string;
    excerpt: string | null;
    category: string;
    image_url: string | null;
    published_at: string | null;
}

// Fallback data for when database is empty
const fallbackNews = [
    {
        id: "1",
        category: "Achievement",
        title: "Rise Students Win National Science Competition",
        excerpt: "Our talented science team brought home the gold at the National Science Olympiad.",
        image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
        published_at: new Date().toISOString(),
    },
    {
        id: "2",
        category: "Event",
        title: "Annual Winter Gala Raises Record Funds for Scholarships",
        excerpt: "Thanks to our generous community, this year's Winter Gala raised over $500,000.",
        image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
        published_at: new Date().toISOString(),
    },
    {
        id: "3",
        category: "Announcement",
        title: "New STEM Center Opening Spring 2025",
        excerpt: "We're excited to announce the construction of our state-of-the-art STEM Innovation Center.",
        image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
        published_at: new Date().toISOString(),
    },
];

export function HomeNewsSection() {
    const [newsItems, setNewsItems] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            const { data, error } = await supabase
                .from("news_events")
                .select("id, title, excerpt, category, image_url, published_at")
                .order("published_at", { ascending: false })
                .limit(3);

            if (error) {
                console.error("Error fetching news:", error);
                setNewsItems(fallbackNews);
            } else {
                setNewsItems(data && data.length > 0 ? data : fallbackNews);
            }
            setLoading(false);
        }
        fetchNews();
    }, []);

    return (
        <section id="news" className="py-20 bg-section-alt">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
                        News & Events
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Latest Updates
                    </h2>
                    <Link to="/news">
                        <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
                            View All News <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50">
                                <Skeleton className="h-48 w-full" />
                                <div className="p-6 space-y-4">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : (
                        newsItems.map((item) => (
                            <article
                                key={item.id}
                                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 border border-border/50"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={item.image_url || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80"}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground capitalize">
                                        {item.category}
                                    </Badge>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <Calendar className="h-3 w-3" />
                                        {item.published_at ? format(new Date(item.published_at), "MMMM d, yyyy") : "Recent"}
                                    </div>
                                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
