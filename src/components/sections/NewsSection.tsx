import { useEffect, useState } from "react";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  published_at: string | null;
  event_date: string | null;
  event_time: string | null;
  event_location: string | null;
}

// Fallback data for when database is empty
const fallbackNews = [
  {
    id: "1",
    category: "Achievement",
    title: "Rise Students Win National Science Competition",
    excerpt: "Our talented science team brought home the gold at the National Science Olympiad, showcasing exceptional research and innovation.",
    content: "Our talented science team brought home the gold at the National Science Olympiad, showcasing exceptional research and innovation. The students worked tirelessly for months, conducting experiments and analyzing data to present their findings. Their hard work paid off as they impressed the judges with their deep understanding of scientific principles and their ability to apply them to real-world problems. This victory is a testament to the dedication of our students and the quality of our science curriculum.",
    image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    published_at: new Date().toISOString(),
    event_date: null,
    event_time: null,
    event_location: null,
  },
  {
    id: "2",
    category: "Event",
    title: "Annual Winter Gala Raises Record Funds for Scholarships",
    excerpt: "Thanks to our generous community, this year's Winter Gala raised over $500,000 to support student scholarships.",
    content: "Thanks to our generous community, this year's Winter Gala raised over $500,000 to support student scholarships. The event was a huge success, with parents, alumni, and community members coming together to celebrate our school and support our students. The night featured performances by our student orchestra and choir, as well as a silent auction and paddle raise. We are incredibly grateful for the support of our community and look forward to using these funds to provide opportunities for deserving students.",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    published_at: new Date().toISOString(),
    event_date: null,
    event_time: null,
    event_location: null,
  },
  {
    id: "3",
    category: "Announcement",
    title: "New STEM Center Opening Spring 2025",
    excerpt: "We're excited to announce the construction of our state-of-the-art STEM Innovation Center.",
    content: "We're excited to announce the construction of our state-of-the-art STEM Innovation Center. This new facility will provide our students with access to cutting-edge technology and resources, allowing them to explore their interests in science, technology, engineering, and math. The center will feature specialized labs for robotics, coding, and 3D printing, as well as collaborative workspaces for student projects. We believe that this investment in our facilities will help prepare our students for the challenges and opportunities of the future.",
    image_url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
    published_at: new Date().toISOString(),
    event_date: null,
    event_time: null,
    event_location: null,
  },
];



import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Helper function to format time to 12-hour format with AM/PM
function formatTime(timeStr: string | null): string {
  if (!timeStr) return "Time TBA";

  // If already in 12-hour format (contains AM or PM), return as is
  if (timeStr.includes('AM') || timeStr.includes('PM') || timeStr.includes('am') || timeStr.includes('pm')) {
    return timeStr;
  }

  // Parse 24-hour format (e.g., "17:00:00" or "17:00")
  const timeParts = timeStr.split(':');
  if (timeParts.length < 2) return timeStr;

  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12

  return `${hours}:${minutes} ${period}`;
}

export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsEvent | null>(null);

  useEffect(() => {
    async function fetchNews() {
      // Fetch News (including events)
      const { data: newsData, error: newsError } = await supabase
        .from("news_events")
        .select("id, title, excerpt, content, category, image_url, published_at, event_date, event_time, event_location")
        .neq('category', 'event')
        .order("published_at", { ascending: false })
        .limit(3);

      if (newsError) {
        console.error("Error fetching news:", newsError);
        setNewsItems(fallbackNews);
      } else {
        setNewsItems(newsData && newsData.length > 0 ? newsData : fallbackNews);
      }

      // Fetch Events for Sidebar
      const { data: eventsData, error: eventsError } = await supabase
        .from("news_events")
        .select("id, title, excerpt, content, category, image_url, published_at, event_date, event_time, event_location")
        .eq('category', 'event') // Note: Check case sensitivity. Admin uses lowercase 'event' in select value.
        .order("event_date", { ascending: true, nullsFirst: false }) // Upcoming usually means future closest first. 
        // If we strictly want "Upcoming" we should filter by date > now. 
        // For simplicity/demo (since we don't know if they have future dates), let's just take the most recent/future ones. 
        // Let's assume they might put future dates. If published_at is used for event date. 
        // Let's just order by published_at ascending for now, or descending? 
        // "Upcoming" usually implies future. But if they use published_at as "creation date", then effectively we want future events.
        // Let's stick to ordering by published_at.
        .limit(4);

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        // Fallback to static events if error, formatted to match NewsEvent structure somewhat or just use separate fallback
        const staticEvents: NewsEvent[] = [
          { id: 'e1', title: "Open House for Prospective Families", category: 'event', published_at: new Date('2025-01-15T10:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-01-15', event_time: '10:00 AM', event_location: 'Main Campus' },
          { id: 'e2', title: "Parent-Teacher Conference Week", category: 'event', published_at: new Date('2025-01-20T00:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-01-20', event_time: '9:00 AM', event_location: 'All Classrooms' },
          { id: 'e3', title: "Spring Semester Registration Deadline", category: 'event', published_at: new Date('2025-02-01T17:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-02-01', event_time: '5:00 PM', event_location: 'Admin Office' },
          { id: 'e4', title: "Valentine's Day Charity Concert", category: 'event', published_at: new Date('2025-02-14T19:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-02-14', event_time: '7:00 PM', event_location: 'Auditorium' },
        ];
        setUpcomingEvents(staticEvents);
      } else {
        // If no events found, maybe use fallback?
        if (eventsData && eventsData.length > 0) {
          setUpcomingEvents(eventsData);
        } else {
          const staticEvents: NewsEvent[] = [
            { id: 'e1', title: "Open House for Prospective Families", category: 'event', published_at: new Date('2025-01-15T10:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-01-15', event_time: '10:00 AM', event_location: 'Main Campus' },
            { id: 'e2', title: "Parent-Teacher Conference Week", category: 'event', published_at: new Date('2025-01-20T00:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-01-20', event_time: '9:00 AM', event_location: 'All Classrooms' },
            { id: 'e3', title: "Spring Semester Registration Deadline", category: 'event', published_at: new Date('2025-02-01T17:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-02-01', event_time: '5:00 PM', event_location: 'Admin Office' },
            { id: 'e4', title: "Valentine's Day Charity Concert", category: 'event', published_at: new Date('2025-02-14T19:00:00').toISOString(), excerpt: null, content: null, image_url: null, event_date: '2025-02-14', event_time: '7:00 PM', event_location: 'Auditorium' },
          ];
          setUpcomingEvents(staticEvents);
        }
      }

      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-20 lg:py-32 bg-section-alt">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            News & Events
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Stay Connected with Rise
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Keep up with the latest achievements, announcements, and upcoming events from our vibrant school community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* News Articles */}
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50">
                  <div className="grid md:grid-cols-2">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-6 lg:p-8 space-y-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              newsItems.map((item) => (
                <article
                  key={item.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 border border-border/50"
                >
                  <div className="grid md:grid-cols-2 relative">
                    <div className="relative min-h-[280px] md:min-h-0 md:h-full order-1 md:order-none">
                      <img
                        src={item.image_url || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80"}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground capitalize z-10">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.published_at ? format(new Date(item.published_at), "MMMM d, yyyy") : "Recent"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          3 min read
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {item.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        className="self-start text-primary hover:text-secondary-foreground p-0 h-auto font-semibold group/btn"
                        onClick={() => setSelectedNews(item)}
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))
            )}

            <div className="text-center pt-4">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All News
              </Button>
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                    onClick={() => setSelectedNews(event)}
                  >
                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 rounded-lg bg-primary text-primary-foreground flex flex-col items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                        <span className="text-xs font-medium uppercase">{event.event_date ? format(new Date(event.event_date), "MMM") : "TBA"}</span>
                        <span className="text-lg font-bold">{event.event_date ? format(new Date(event.event_date), "d") : "?"}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-1 truncate group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      {event.event_time && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(event.event_time)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary-light">
                View Full Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-y-auto">
          {selectedNews && (
            <div className="flex flex-col">
              <div className="relative w-full">
                <img
                  src={selectedNews.image_url || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80"}
                  alt={selectedNews.title}
                  className="w-full h-auto object-contain max-h-[60vh] bg-black/5"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <Badge className="mb-4 bg-secondary text-secondary-foreground">
                    {selectedNews.category}
                  </Badge>
                  <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
                    {selectedNews.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {selectedNews.published_at ? format(new Date(selectedNews.published_at), "MMMM d, yyyy") : "Recent"}
                    </span>
                  </div>
                </div>
                <DialogDescription className="sr-only">
                  Details for {selectedNews.title}
                </DialogDescription>
                <div className="prose prose-blue max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedNews.content || selectedNews.excerpt}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
