"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import PostForm from "@/app/components/PostForm";
import DeletePostButton from "@/app/components/DeletePostButton";
import LoadingCard from "@/app/components/LoadingCard";
import ErrorCard from "@/app/components/ErrorCard";
import { Post, PostUpdateInput, PostCreateInput } from "@/types/post";

export default function DetailPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = parseInt(params.id as string);

  const { useGetPost, updatePostMutation, deletePostMutation } = usePost();
  const { data: post, isLoading, isError, error, refetch } = useGetPost(postId);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (data: PostCreateInput | PostUpdateInput) => {
    if ("id" in data) {
      updatePostMutation.mutate(data as Post, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        router.push("/posts");
      },
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <LoadingCard />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ErrorCard
            message={error?.message || "Failed to load post"}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The post you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.push("/posts")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {deletePostMutation.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">
              Failed to delete post: {deletePostMutation.error.message}
            </p>
          </div>
        )}
        {isEditing ? (
          <PostForm
            post={post}
            isEditing={true}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isLoading={updatePostMutation.isPending}
            error={updatePostMutation.error?.message}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    Post #{post.id}
                  </span>
                  <div className="mt-2">
                    <span className="text-white text-sm">
                      User: {post.user_id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <DeletePostButton
                    postId={post.id}
                    postTitle={post.title}
                    onDelete={handleDelete}
                    isLoading={deletePostMutation.isPending}
                    className="bg-red-600/80 hover:bg-red-600"
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>
            </div>

            <div className="px-8 pb-6">
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-500">Published</span>
                </div>
                <div className="text-sm text-gray-500">Post ID: {post.id}</div>
              </div>
            </div>
          </div>
        )}

        {updatePostMutation.error && !isEditing && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">
              Failed to update post: {updatePostMutation.error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
