// Define shared types here
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateContentRequest {
  prompt: string;
}

export interface GenerateContentResponse {
  content: string;
}
