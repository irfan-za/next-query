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
    useGetPost,
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};
