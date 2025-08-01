import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../api";

// Custom hook
export const usePost = () => {
  const queryClient = useQueryClient();

  // Query for fetching all posts
  const useGetPosts = (page: number, perPage: number, title: string) => {
    return useQuery({
      queryKey: ["posts", { page, perPage, title }],
      queryFn: () => getPosts(page, perPage, title),
    });
  };
  // (Optional) Prefetch posts for a specific page
  const usePrefetchPosts = (page: number, perPage: number, title: string) => {
    return queryClient.prefetchQuery({
      queryKey: ["posts", { page, perPage, title }],
      queryFn: () => getPosts(page, perPage, title),
    });
  };

  // Prefetch adjacent pages based on current page
  const usePrefetchAdjacentPages = (
    currentPage: number,
    perPage: number,
    title: string,
    totalPages?: number
  ) => {
    const prefetchPage = (page: number) => {
      if (page > 0 && (!totalPages || page <= totalPages)) {
        queryClient.prefetchQuery({
          queryKey: ["posts", { page, perPage, title }],
          queryFn: () => getPosts(page, perPage, title),
          staleTime: 5 * 60 * 1000, // Keep prefetched data fresh for 5 minutes
        });
      }
    };

    return {
      prefetchAdjacent: () => {
        if (currentPage === 1) {
          // On first page, prefetch pages 2 and 3
          prefetchPage(2);
          prefetchPage(3);
        } else {
          // On any other page, prefetch previous and next pages
          prefetchPage(currentPage - 1);
          prefetchPage(currentPage + 1);
        }
      },
    };
  };

  // Custom hook for fetching a single post
  const useGetPost = (id: number) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: () => getPostById(id),
      enabled: !!id,
    });
  };

  // Mutation for creating a post
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Mutation for updating a post
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", updatedPost.id] });
    },
  });

  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return {
    useGetPosts,
    usePrefetchPosts,
    usePrefetchAdjacentPages,
    useGetPost,
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};
