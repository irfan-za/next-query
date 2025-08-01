import { Post } from "@/types/post";
import axios from "axios";

interface PostsResponse {
  data: Post[];
  page: number;
  total_pages: number;
  total: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});
const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const getPosts = async (
  page: number,
  perPage: number,
  title: string
): Promise<PostsResponse> => {
  try {
    const response = await api.get("/posts", {
      params: {
        page,
        per_page: perPage,
        title,
      },
    });
    return {
      data: response.data,
      page: response.headers["x-pagination-page"],
      total_pages: response.headers["x-pagination-pages"],
      total: response.headers["x-pagination-total"],
    };
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
};

const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
};

const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  try {
    const response = await api.post("/posts", newPost);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create post");
  }
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
  try {
    const response = await api.put(`/posts/${updatedPost.id}`, updatedPost);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update post with id ${updatedPost.id}`);
  }
};

const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete post with id ${id}`);
  }
};

export { getUsers, getPosts, getPostById, createPost, updatePost, deletePost };
