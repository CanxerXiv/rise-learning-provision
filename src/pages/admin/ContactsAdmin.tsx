import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Loader2, Mail, MailOpen, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface ContactSubmission {
  id: string;
  parent_name: string;
  email: string;
  phone: string | null;
  student_name: string | null;
  grade_level: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
}

export default function ContactsAdmin() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
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

  const handleView = async (item: ContactSubmission) => {
    setSelectedItem(item);

    if (!item.is_read) {
      await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', item.id);
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Submission removed successfully.' });
      fetchItems();
    }
  };

  const toggleRead = async (item: ContactSubmission) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: !item.is_read })
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
        <div>
          <h2 className="text-2xl font-display font-bold">Contact Submissions</h2>
          <p className="text-muted-foreground">View and manage inquiries from parents.</p>
        </div>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No contact submissions yet.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow
                    key={item.id}
                    className={item.is_read ? '' : 'bg-primary/5'}
                  >
                    <TableCell>
                      {item.is_read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className={`font-medium ${!item.is_read ? 'font-semibold' : ''}`}>
                      {item.parent_name}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.student_name || '-'}</TableCell>
                    <TableCell>{item.grade_level || '-'}</TableCell>
                    <TableCell>{format(new Date(item.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRead(item)}
                        title={item.is_read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {item.is_read ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MailOpen className="h-4 w-4" />
                        )}
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

        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Contact Submission</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Parent Name</p>
                    <p className="font-medium">{selectedItem.parent_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedItem.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedItem.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student Name</p>
                    <p className="font-medium">{selectedItem.student_name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Grade Level</p>
                    <p className="font-medium">{selectedItem.grade_level || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">
                      {format(new Date(selectedItem.created_at), 'PPpp')}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedItem.message || 'No message provided.'}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedItem.email}`)}
                  >
                    Reply via Email
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
