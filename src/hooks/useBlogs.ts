import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogs, fetchBlogById, createBlog, Blog } from '@/lib/api';

// Query keys factory
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  detail: (id: number) => [...blogKeys.all, 'detail', id] as const,
};

// Hook to fetch all blogs
export const useBlogs = () => {
  return useQuery({
    queryKey: blogKeys.lists(),
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to fetch a single blog by ID
export const useBlog = (id: number | null) => {
  return useQuery({
    queryKey: blogKeys.detail(id!),
    queryFn: () => fetchBlogById(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
};

// Hook to create a new blog with optimistic updates
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogData: Omit<Blog, 'id'>) => createBlog(blogData),
    onSuccess: (newBlog) => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
};

// Export Blog type for convenience
export type { Blog };
