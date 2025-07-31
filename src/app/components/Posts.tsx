"use client";
import Link from "next/link";
import { usePost } from "@/hooks/usePost";
import PostCard from "./PostCard";
import LoadingCard from "./LoadingCard";
import ErrorCard from "./ErrorCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function Posts() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 10;
  const title = searchParams.get("title") || "";
  const router = useRouter();

  const postsQuery = usePost();
  const posts = postsQuery.useGetPosts(page, perPage, title);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTimeout(() => {
      router.replace(`?page=${page}&per_page=${perPage}&title=${title}`);
    }, 500);
  };

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
          <input
            placeholder="Search posts..."
            className="mt-4 p-2 border border-gray-300 rounded-md block mx-auto max-w-96 w-full"
            defaultValue={title}
            onChange={handleSearch}
          />
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
          ) : posts.data && posts.data.data.length > 0 ? (
            // Success state - show post cards
            posts.data.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
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

      <div className="bg-white shadow rounded-lg p-6 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            Total Posts:{" "}
            <span className="font-semibold">{posts.data?.total || 0}</span>
            {posts.data?.total && (
              <span className="text-sm ml-2">
                (Page {posts.data.page} of {posts.data.total_pages || 1})
              </span>
            )}
          </p>

          {posts.data?.total && posts.data.total > perPage && (
            <div className="flex items-center gap-2">
              <Link
                href={`?page=${Math.max(
                  Number(page) - 1,
                  1
                )}&per_page=${perPage}`}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Link>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: posts.data.total_pages || 1 },
                  (_, i) => i + 1
                )
                  .filter((p) => {
                    const totalPages = posts.data.total_pages;
                    if (totalPages <= 7) return true;
                    if (p === 1 || p === totalPages) return true;
                    if (p >= page - 1 && p <= page + 1) return true;
                    return false;
                  })
                  .map((p, index, filteredPages) => (
                    <div key={p} className="flex items-center">
                      {index > 0 && filteredPages[index - 1] !== p - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Link
                        href={`?page=${p}&per_page=${perPage}`}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          page === p
                            ? "bg-blue-600 text-white"
                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </Link>
                    </div>
                  ))}
              </div>

              <Link
                href={`?page=${Math.min(
                  Number(page) + 1,
                  posts.data.total_pages || 1
                )}&per_page=${perPage}`}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
