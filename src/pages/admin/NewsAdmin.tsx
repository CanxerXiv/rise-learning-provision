import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  event_date: string | null;
  event_time: string | null;
  event_location: string | null;
  created_at: string;
}

export default function NewsAdmin() {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'news',
    image_url: '',
    is_published: false,
    event_date: '',
    event_time: '',
    event_location: '',
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('news_events')
      .select('id, title, excerpt, content, category, image_url, is_published, published_at, created_at, updated_at, event_date, event_time, event_location')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setItems(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'news',
      image_url: '',
      is_published: false,
      event_date: '',
      event_time: '',
      event_location: '',
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: NewsEvent) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content || '',
      category: item.category,
      image_url: item.image_url || '',
      is_published: item.is_published || false,
      event_date: item.event_date || '',
      event_time: item.event_time || '',
      event_location: item.event_location || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      category: formData.category,
      image_url: formData.image_url || null,
      is_published: formData.is_published,
      published_at: formData.is_published ? new Date().toISOString() : null,
      event_date: formData.category === 'event' ? (formData.event_date || null) : null,
      event_time: formData.category === 'event' ? (formData.event_time || null) : null,
      event_location: formData.category === 'event' ? (formData.event_location || null) : null,
    };

    let error;
    if (editingItem) {
      const { error: updateError } = await supabase
        .from('news_events')
        .update(payload)
        .eq('id', editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('news_events')
        .insert(payload);
      error = insertError;
    }

    setIsSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: editingItem ? 'Item updated!' : 'Item created!' });
      setIsDialogOpen(false);
      resetForm();
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase.from('news_events').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Item removed successfully.' });
      fetchItems();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold">News & Updates</h2>
            <p className="text-muted-foreground">Manage news articles and announcements.</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit' : 'Create'} News</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="achievement">Achievements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                    />
                  </div>
                  {formData.category === 'event' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="event_date">Event Date</Label>
                        <Input
                          id="event_date"
                          type="date"
                          value={formData.event_date}
                          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event_time">Event Time</Label>
                        <div className="flex gap-2">
                          <Select
                            value={formData.event_time ? formData.event_time.split(':')[0].replace(/^0/, '') : '12'}
                            onValueChange={(hour) => {
                              const currentTime = formData.event_time || '12:00 PM';
                              const [, minute = '00', period = 'PM'] = currentTime.match(/(\d+):(\d+)\s*(AM|PM)/i) || [];
                              setFormData({ ...formData, event_time: `${hour}:${minute} ${period}` });
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <SelectItem key={hour} value={hour.toString()}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="flex items-center">:</span>
                          <Select
                            value={formData.event_time ? formData.event_time.match(/:(\d+)/)?.[1] || '00' : '00'}
                            onValueChange={(minute) => {
                              const currentTime = formData.event_time || '12:00 PM';
                              const [, hour = '12', , period = 'PM'] = currentTime.match(/(\d+):(\d+)\s*(AM|PM)/i) || [];
                              setFormData({ ...formData, event_time: `${hour}:${minute} ${period}` });
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Min" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                                <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                                  {minute.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={formData.event_time ? (formData.event_time.match(/\s*(AM|PM)/i)?.[1] || 'PM').toUpperCase() : 'PM'}
                            onValueChange={(period) => {
                              const currentTime = formData.event_time || '12:00 PM';
                              const [, hour = '12', minute = '00'] = currentTime.match(/(\d+):(\d+)/i) || [];
                              setFormData({ ...formData, event_time: `${hour}:${minute} ${period}` });
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="AM/PM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AM">AM</SelectItem>
                              <SelectItem value="PM">PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event_location">Event Location</Label>
                        <Input
                          id="event_location"
                          value={formData.event_location}
                          onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                          placeholder="Enter event location"
                        />
                      </div>
                    </>
                  )}
                  <ImageUpload
                    bucket="news-images"
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    label="Cover Image"
                    aspectRatio="wide"
                  />
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {editingItem ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No items found. Create your first news or event.
                  </TableCell>
                </TableRow>
              ) : (
                items
                  .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {item.title}
                      </TableCell>
                      <TableCell className="capitalize">{item.category}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${item.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {item.is_published ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>{format(new Date(item.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
