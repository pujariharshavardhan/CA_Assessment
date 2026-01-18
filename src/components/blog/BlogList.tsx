import { Blog } from '@/lib/api';
import { BlogCard } from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Inbox } from 'lucide-react';

interface BlogListProps {
  blogs: Blog[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

const BlogCardSkeleton = () => (
  <div className="rounded-lg overflow-hidden bg-card animate-pulse">
    <Skeleton className="aspect-[16/9] w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

export const BlogList = ({
  blogs,
  isLoading,
  isError,
  selectedBlogId,
  onSelectBlog,
}: BlogListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="font-sans font-semibold text-foreground mb-2">Failed to load blogs</h3>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Inbox className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-sans font-semibold text-foreground mb-2">No blogs yet</h3>
        <p className="text-sm text-muted-foreground">Create your first story.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isSelected={selectedBlogId === blog.id}
          onClick={() => onSelectBlog(blog.id)}
        />
      ))}
    </div>
  );
};