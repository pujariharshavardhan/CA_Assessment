import { useState } from 'react';
import { Button } from '@/components/ui/button';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

export const DownloadProject = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      zip.file('README.md', '# Noir Editorial Blog\n\nA modern editorial blog built with React, TanStack Query, Tailwind CSS, and shadcn/ui.\n\n## Setup\n\n1. npm install\n2. npm run server (starts JSON Server on port 3001)\n3. npm run dev');
      zip.file('package.json', JSON.stringify({ name: 'noir-editorial-blog', version: '1.0.0', type: 'module', scripts: { dev: 'vite', build: 'tsc && vite build', server: 'json-server --watch db.json --port 3001' }, dependencies: { '@hookform/resolvers': '^3.10.0', '@radix-ui/react-dialog': '^1.1.14', '@radix-ui/react-label': '^2.1.7', '@tanstack/react-query': '^5.83.0', 'class-variance-authority': '^0.7.1', clsx: '^2.1.1', 'date-fns': '^3.6.0', 'lucide-react': '^0.462.0', react: '^18.3.1', 'react-dom': '^18.3.1', 'react-hook-form': '^7.61.1', sonner: '^1.7.4', 'tailwind-merge': '^2.6.0', 'tailwindcss-animate': '^1.0.7', zod: '^3.25.76' }, devDependencies: { '@types/react': '^18.3.0', '@vitejs/plugin-react-swc': '^3.5.0', autoprefixer: '^10.4.19', 'json-server': '^1.0.0-beta.0', postcss: '^8.4.38', tailwindcss: '^3.4.3', typescript: '^5.4.5', vite: '^5.2.0' } }, null, 2));
      zip.file('db.json', JSON.stringify({ blogs: [{ id: 1, title: 'The Art of Slow Travel', category: ['TRAVEL', 'LIFESTYLE'], description: 'Discovering the beauty of taking your time.', date: '2026-01-15T10:30:00.000Z', coverImage: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg', content: 'Slow travel offers a different philosophy...', author: 'Elena Martinez', readTime: '5 min read' }, { id: 2, title: 'Mastering Fermentation at Home', category: ['FOOD', 'HEALTH'], description: "A beginner's guide to fermented foods.", date: '2026-01-14T08:15:00.000Z', coverImage: 'https://images.pexels.com/photos/5765844/pexels-photo-5765844.jpeg', content: 'Fermentation is making a massive comeback...', author: 'James Chen', readTime: '7 min read' }] }, null, 2));
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'noir-editorial-blog.zip');
      setIsComplete(true);
      toast.success('Downloaded!');
      setTimeout(() => setIsComplete(false), 2000);
    } catch { toast.error('Download failed'); }
    finally { setIsDownloading(false); }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloading} variant="outline" size="sm" className="font-sans gap-2">
      {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : isComplete ? <Check className="h-4 w-4 text-accent" /> : <Download className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDownloading ? 'Preparing...' : isComplete ? 'Downloaded!' : 'Download'}</span>
    </Button>
  );
};