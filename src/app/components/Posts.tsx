"use client";
import Link from "next/link";
import { usePost } from "@/hooks/usePost";
import PostCard from "./PostCard";
import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";

export default function Posts() {
  const { posts } = usePost();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Latest Posts
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Discover amazing content from our community of writers and creators
          </p>
          <Link
            href="/create"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Post
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.isLoading ? (
            // Loading state - show multiple skeleton cards
            Array.from({ length: 6 }, (_, index) => <LoadingCard key={index} />)
          ) : posts.isError ? (
            // Error state - show error card that spans full width
            <div className="col-span-full">
              <ErrorCard
                message={posts.error?.message || "Failed to load posts"}
                onRetry={() => posts.refetch()}
              />
            </div>
          ) : posts.data && posts.data.length > 0 ? (
            // Success state - show post cards
            posts.data.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            // Empty state
            <div className="col-span-full">
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Posts Found
                </h3>
                <p className="text-gray-500 mb-6">
                  There are no posts available at the moment. Be the first to
                  create one!
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create First Post
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
