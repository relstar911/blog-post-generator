export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  id?: string;  // Make id optional for new posts
  title: string;
  content: string;
  author?: User;  // Make author optional
  createdAt?: string;  // Make createdAt optional
  updatedAt?: string;  // Make updatedAt optional
}

export interface GeneratedContent {
  content: string;
}
