import { format } from 'date-fns';
import { Blog } from '@/lib/api';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
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

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
  const formattedDate = format(new Date(blog.date), 'MMM d, yyyy');

  return (
    <article
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-lg overflow-hidden transition-all duration-300',
        'border border-transparent hover:border-border',
        isSelected 
          ? 'bg-secondary ring-2 ring-primary/20' 
          : 'bg-card hover:bg-secondary/50'
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {blog.category.map((cat) => (
            <span
              key={cat}
              className={cn(
                'px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full',
                'text-primary-foreground shadow-sm',
                getCategoryColor(cat)
              )}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className={cn(
          'font-sans font-bold text-base leading-tight mb-2 line-clamp-2',
          'text-foreground group-hover:text-primary transition-colors'
        )}>
          {blog.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed">
          {blog.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
          <span>{formattedDate}</span>
          {blog.readTime && <span>{blog.readTime}</span>}
        </div>
      </div>
    </article>
  );
};