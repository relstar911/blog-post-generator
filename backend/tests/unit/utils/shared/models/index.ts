// Define shared models or interfaces here
import { User, BlogPost } from '../types';

export interface UserModel extends User {
  password: string; // Note: Only use this on the backend, never expose passwords to the frontend
}

export interface BlogPostModel extends BlogPost {
  tags: string[];
}
