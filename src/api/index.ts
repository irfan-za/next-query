import axios from "axios";

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
interface PostsResponse {
  data: Post[];
  page: number;
  total_pages: number;
  total: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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

export { getPosts, getPostById, createPost, updatePost, deletePost };
