"use client";
import React, { useState, useEffect } from "react";
import { Post, PostCreateInput, PostUpdateInput } from "@/types/post";

interface PostFormProps {
  post?: Post;
  isEditing?: boolean;
  onSubmit: (data: PostCreateInput | PostUpdateInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function PostForm({
  post,
  isEditing = false,
  onSubmit,
  onCancel,
  isLoading = false,
  error,
}: PostFormProps) {
  const [formData, setFormData] = useState({
    user_id: post?.user_id || 1,
    title: post?.title || "",
    body: post?.body || "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        user_id: post.user_id,
        title: post.title,
        body: post.body,
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && post) {
      onSubmit({
        id: post.id,
        ...formData,
      });
    } else {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "user_id" ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isEditing ? "Edit Post" : "Create New Post"}
        </h2>
        <p className="text-gray-600">
          {isEditing
            ? "Update your post with new information"
            : "Share your thoughts with the community"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="user_id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            User ID
          </label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter post title"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/200 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            rows={6}
            maxLength={1000}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
            placeholder="Write your post content here..."
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.body.length}/1000 characters
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={
              isLoading || !formData.title.trim() || !formData.body.trim()
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEditing ? "Update Post" : "Create Post"}</>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
