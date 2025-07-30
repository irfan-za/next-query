"use client";
import React from "react";
import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3">
        <div className="flex justify-between items-center">
          <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            Post #{post.id}
          </span>
          <span className="text-white text-sm font-medium">
            User: {post.user_id}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-500">Published</span>
          </div>
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
