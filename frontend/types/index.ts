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
