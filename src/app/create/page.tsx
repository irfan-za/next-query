"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import PostForm from "@/app/components/PostForm";
import { PostCreateInput } from "@/types/post";

export default function CreatePostPage() {
  const router = useRouter();
  const { createPostMutation } = usePost();

  const handleCreate = (data: PostCreateInput) => {
    createPostMutation.mutate(data, {
      onSuccess: (newPost) => {
        router.push(`/posts/${newPost.id}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/posts")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Posts
          </button>
        </div>

        <PostForm
          onSubmit={handleCreate}
          onCancel={() => router.push("/posts")}
          isLoading={createPostMutation.isPending}
          error={createPostMutation.error?.message}
        />
      </div>
    </div>
  );
}
