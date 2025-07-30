export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at?: string;
  updated_at?: string;
}

export interface PostCreateInput {
  user_id: number;
  title: string;
  body: string;
}

export interface PostUpdateInput {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
