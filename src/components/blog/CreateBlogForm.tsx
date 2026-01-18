import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateBlog } from '@/hooks/useBlogs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Loader2, Sparkles } from 'lucide-react';

const blogSchema = z.object({
  title: z.string().min(3, 'Title required'),
  description: z.string().min(10, 'Description required'),
  content: z.string().min(50, 'Content required'),
  category: z.string().min(1, 'Category required'),
  coverImage: z.string().url('Valid URL required'),
  author: z.string().optional(),
  readTime: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export const CreateBlogForm = () => {
  const [open, setOpen] = useState(false);
  const createBlog = useCreateBlog();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg' },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      await createBlog.mutateAsync({
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category.split(',').map((c) => c.trim().toUpperCase()),
        coverImage: data.coverImage,
        date: new Date().toISOString(),
        author: data.author || 'Anonymous',
        readTime: data.readTime || '5 min read',
      });
      toast.success('Story published!');
      reset();
      setOpen(false);
    } catch { toast.error('Failed to publish'); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-sans gap-2"><Sparkles className="h-4 w-4" />Write a Story</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans">Create New Story</DialogTitle>
          <DialogDescription>Share your thoughts with the world.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div><Label htmlFor="title">Title *</Label><Input id="title" {...register('title')} />{errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}</div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Author</Label><Input {...register('author')} /></div>
            <div><Label>Read Time</Label><Input {...register('readTime')} placeholder="5 min read" /></div>
          </div>
          <div><Label>Categories *</Label><Input {...register('category')} placeholder="TECH, LIFESTYLE" />{errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}</div>
          <div><Label>Cover Image URL *</Label><Input {...register('coverImage')} />{errors.coverImage && <p className="text-xs text-destructive">{errors.coverImage.message}</p>}</div>
          <div><Label>Description *</Label><Textarea rows={2} {...register('description')} />{errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}</div>
          <div><Label>Content *</Label><Textarea rows={6} {...register('content')} />{errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}</div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={createBlog.isPending} className="flex-1">
              {createBlog.isPending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Publishing...</> : <><Plus className="h-4 w-4 mr-2" />Publish</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};