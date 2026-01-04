import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper, MessageSquareQuote, Mail, MailWarning } from 'lucide-react';

interface Stats {
  newsCount: number;
  testimonialsCount: number;
  totalContacts: number;
  unreadContacts: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    newsCount: 0,
    testimonialsCount: 0,
    totalContacts: 0,
    unreadContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [newsRes, testimonialsRes, contactsRes, unreadRes] = await Promise.all([
        supabase.from('news_events').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
      ]);

      setStats({
        newsCount: newsRes.count ?? 0,
        testimonialsCount: testimonialsRes.count ?? 0,
        totalContacts: contactsRes.count ?? 0,
        unreadContacts: unreadRes.count ?? 0,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'News & Events',
      value: stats.newsCount,
      icon: Newspaper,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Testimonials',
      value: stats.testimonialsCount,
      icon: MessageSquareQuote,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: Mail,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadContacts,
      icon: MailWarning,
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Welcome Back!</h2>
          <p className="text-muted-foreground">Here's an overview of your school website.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
