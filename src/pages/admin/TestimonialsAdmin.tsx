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
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url: string | null;
  rating: number | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    avatar_url: '',
    rating: 5,
    is_approved: false,
    is_featured: false,
  });

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
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
      name: '',
      role: '',
      quote: '',
      avatar_url: '',
      rating: 5,
      is_approved: false,
      is_featured: false,
    });
    setEditingItem(null);
  };

  const openEditDialog = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      quote: item.quote,
      avatar_url: item.avatar_url || '',
      rating: item.rating || 5,
      is_approved: item.is_approved || false,
      is_featured: item.is_featured || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      role: formData.role,
      quote: formData.quote,
      avatar_url: formData.avatar_url || null,
      rating: formData.rating,
      is_approved: formData.is_approved,
      is_featured: formData.is_featured,
    };

    let error;
    if (editingItem) {
      const { error: updateError } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('testimonials')
        .insert(payload);
      error = insertError;
    }

    setIsSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: editingItem ? 'Testimonial updated!' : 'Testimonial created!' });
      setIsDialogOpen(false);
      resetForm();
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Testimonial removed successfully.' });
      fetchItems();
    }
  };

  const toggleApproval = async (item: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_approved: !item.is_approved })
      .eq('id', item.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchItems();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold">Testimonials</h2>
            <p className="text-muted-foreground">Manage parent and student testimonials.</p>
          </div>
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit' : 'Create'} Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Parent of Grade 5 Student"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote">Quote</Label>
                  <Textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ImageUpload
                    bucket="testimonial-avatars"
                    value={formData.avatar_url}
                    onChange={(url) => setFormData({ ...formData, avatar_url: url })}
                    label="Avatar"
                    aspectRatio="square"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= formData.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_approved"
                      checked={formData.is_approved}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_approved: checked })}
                    />
                    <Label htmlFor="is_approved">Approved</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
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

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No testimonials found. Add your first testimonial.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{item.role}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleApproval(item)}
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                          item.is_approved
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.is_approved ? 'Approved' : 'Pending'}
                      </button>
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
