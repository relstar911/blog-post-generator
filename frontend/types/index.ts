export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  _id: string;
  id?: string; // Optional, to support both _id and id
  title: string;
  content: string;
  author: {
    _id: string;
    id?: string; // Optional, to support both _id and id
    name: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedContent {
  content: string;
}

// If you have a separate types file, update it there. Otherwise, add this to your [id].tsx file.

export interface GenerateContentParams {
  prompt: string;
  keywords?: string[];
  title?: string;  // Add this line
  // ... any other properties
}
