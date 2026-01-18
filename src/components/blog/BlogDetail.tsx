import { format } from 'date-fns';
import { Blog } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogDetailProps {
  blog: Blog | undefined;
  isLoading: boolean;
  isError: boolean;
  onBack: () => void;
  showBackButton: boolean;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    TECH: 'bg-category-tech',
    LIFESTYLE: 'bg-category-lifestyle',
    FINANCE: 'bg-category-finance',
    HEALTH: 'bg-category-health',
    TRAVEL: 'bg-category-travel',
    FOOD: 'bg-category-food',
  };
  return colors[category] || 'bg-category-default';
};

const DetailSkeleton = () => (
  <div className="max-w-3xl mx-auto animate-pulse">
    <Skeleton className="aspect-[21/9] w-full rounded-xl mb-8" />
    <div className="space-y-4 px-6">
      <Skeleton className="h-10 w-4/5" />
      <Skeleton className="h-6 w-full" />
    </div>
  </div>
);

export const BlogDetail = ({ blog, isLoading, isError, onBack, showBackButton }: BlogDetailProps) => {
  if (isLoading) return <div className="p-6"><DetailSkeleton /></div>;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <h3 className="font-sans text-xl font-semibold mb-2">Error loading blog</h3>
        <Button onClick={onBack} variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Go back</Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-24 h-24 rounded-full gradient-editorial flex items-center justify-center mb-6">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-sans text-2xl font-bold mb-3">Welcome to Noir Editorial</h2>
        <p className="text-muted-foreground max-w-md">Select a story from the sidebar to begin reading.</p>
      </div>
    );
  }

  return (
    <article className="animate-fade-in-scale">
      {showBackButton && (
        <div className="sticky top-0 z-10 p-4 md:hidden bg-background/80 backdrop-blur-sm border-b border-border">
          <Button onClick={onBack} variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />All stories</Button>
        </div>
      )}
      <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      <div className="relative -mt-20 md:-mt-32 px-6 md:px-10 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.category.map((cat) => (
              <span key={cat} className={cn('px-3 py-1 text-xs font-sans font-semibold uppercase rounded-full text-primary-foreground', getCategoryColor(cat))}>{cat}</span>
            ))}
          </div>
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{blog.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{blog.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-sans pb-8 border-b border-border">
            {blog.author && <div className="flex items-center gap-2"><User className="h-4 w-4" />{blog.author}</div>}
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{format(new Date(blog.date), 'MMMM d, yyyy')}</div>
            {blog.readTime && <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{blog.readTime}</div>}
          </div>
          <div className="pt-8">
            {blog.content.split('\n\n').map((p, i) => <p key={i} className="text-foreground leading-relaxed mb-6">{p}</p>)}
          </div>
        </div>
      </div>
    </article>
  );
};