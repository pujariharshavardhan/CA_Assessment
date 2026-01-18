import { useState } from 'react';
import { useBlogs, useBlog } from '@/hooks/useBlogs';
import { BlogList } from '@/components/blog/BlogList';
import { BlogDetail } from '@/components/blog/BlogDetail';
import { CreateBlogForm } from '@/components/blog/CreateBlogForm';
import { DownloadProject } from '@/components/DownloadProject';
import { Feather, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const Index = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { data: blogs, isLoading: blogsLoading, isError: blogsError } = useBlogs();
  const { data: selectedBlog, isLoading: blogLoading, isError: blogError } = useBlog(selectedBlogId);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSelectBlog = (id: number) => {
    setSelectedBlogId(id);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              {isMobileSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-md">
                <Feather className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-sans text-xl font-bold text-foreground tracking-tight">
                  Noir Editorial
                </span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest -mt-0.5">
                  Stories that matter
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="h-9 w-9"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <DownloadProject />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Blog List */}
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-40
            w-[320px] lg:w-[380px] xl:w-[420px]
            bg-card border-r border-border
            transform transition-transform duration-300 ease-in-out
            md:transform-none md:translate-x-0
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-5 border-b border-border bg-sidebar">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-sans text-lg font-semibold text-foreground">
                  Latest Stories
                </h2>
                <span className="text-xs text-muted-foreground font-sans">
                  {blogs?.length || 0} articles
                </span>
              </div>
              <CreateBlogForm />
            </div>

            {/* Blog List */}
            <div className="flex-1 overflow-y-auto editorial-scrollbar p-5">
              <BlogList
                blogs={blogs}
                isLoading={blogsLoading}
                isError={blogsError}
                selectedBlogId={selectedBlogId}
                onSelectBlog={handleSelectBlog}
              />
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-30 md:hidden top-16"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content - Blog Detail */}
        <main className="flex-1 overflow-y-auto editorial-scrollbar bg-background">
          <BlogDetail
            blog={selectedBlog}
            isLoading={blogLoading}
            isError={blogError}
            onBack={() => setSelectedBlogId(null)}
            showBackButton={selectedBlogId !== null}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
