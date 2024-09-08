import { AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    getUserProfile(userId: string): Promise<any>;
    updateUserProfile(userId: string, data: any): Promise<any>;
    getUserStatistics(userId: string): Promise<any>;
    searchBlogPosts(query: string): Promise<any>;
    someApiCall(data: any): Promise<any>;
    anotherApiCall(): Promise<any>;
  }
}
