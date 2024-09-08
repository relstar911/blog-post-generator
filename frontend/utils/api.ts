import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface CustomAxiosInstance extends AxiosInstance {
  getUserProfile: (userId: string) => Promise<any>;
  updateUserProfile: (userId: string, data: any) => Promise<any>;
  getUserStatistics: (userId: string) => Promise<any>;
  searchBlogPosts: (query: string) => Promise<any>;
  searchBlogPostsByTag: (tag: string) => Promise<any>;
  searchBlogPostsByAuthor: (authorId: string) => Promise<any>;
  someApiCall: (data: any) => Promise<any>;
  anotherApiCall: () => Promise<any>;
  getDashboardData: () => Promise<any>;
  searchPosts: (query: string) => Promise<any>;
  getPostAnalytics: (postId: string) => Promise<any>;
  getOverallAnalytics: () => Promise<any>;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) as CustomAxiosInstance;

// User-related API calls
api.getUserProfile = (userId: string) => api.get(`/users/${userId}`);
api.updateUserProfile = (userId: string, data: any) => api.put(`/users/${userId}`, data);
api.getUserStatistics = (userId: string) => api.get(`/users/${userId}/statistics`);

// Blog post-related API calls
api.searchBlogPosts = (query: string) => api.get(`/blog-posts/search?q=${encodeURIComponent(query)}`);
api.searchBlogPostsByTag = (tag: string) => api.get(`/blog-posts/search/tag/${encodeURIComponent(tag)}`);
api.searchBlogPostsByAuthor = (authorId: string) => api.get(`/blog-posts/search/author/${authorId}`);
api.searchPosts = (query: string) => api.get(`/search?q=${encodeURIComponent(query)}`);

// Dashboard API call
api.getDashboardData = () => api.get('/dashboard');

// You can add more specific API calls here
api.someApiCall = (data: any) => api.post('/some-endpoint', data);
api.anotherApiCall = () => api.get('/another-endpoint');
api.getPostAnalytics = (postId: string) => api.get(`/analytics/post/${postId}`);
api.getOverallAnalytics = () => api.get('/analytics/overall');

export default api;

// Also export individual functions for backwards compatibility
export const getUserProfile = api.getUserProfile;
export const updateUserProfile = api.updateUserProfile;
export const getUserStatistics = api.getUserStatistics;
export const searchBlogPosts = api.searchBlogPosts;
export const someApiCall = api.someApiCall;
export const anotherApiCall = api.anotherApiCall;
export const getDashboardData = api.getDashboardData;
export const searchPosts = api.searchPosts;
export const getPostAnalytics = api.getPostAnalytics;
export const getOverallAnalytics = api.getOverallAnalytics;
