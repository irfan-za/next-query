import axios from "axios";

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get("/posts");
    return response.data;
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

export { getPosts, getPostById, createPost, updatePost, deletePost };
