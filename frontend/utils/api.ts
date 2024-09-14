import { GenerateContentParams } from '../hooks/useGenerateContent';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface CustomAxiosInstance extends AxiosInstance {
  refreshToken: () => Promise<{ accessToken: string }>;
  getUserProfile: (userId: string) => Promise<AxiosResponse>;
  updateUserProfile: (userId: string, data: any) => Promise<AxiosResponse>;
  getUserStatistics: (userId: string) => Promise<AxiosResponse>;
  searchBlogPosts: (query: string) => Promise<AxiosResponse>;
  searchBlogPostsByTag: (tag: string) => Promise<AxiosResponse>;
  searchBlogPostsByAuthor: (authorId: string) => Promise<AxiosResponse>;
  someApiCall: (data: any) => Promise<AxiosResponse>;
  anotherApiCall: () => Promise<AxiosResponse>;
  getDashboardData: () => Promise<AxiosResponse>;
  searchPosts: (query: string) => Promise<AxiosResponse>;
  getPostAnalytics: (postId: string) => Promise<AxiosResponse>;
  getOverallAnalytics: () => Promise<AxiosResponse>;
}

const api: CustomAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) as CustomAxiosInstance;

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokenData = await api.refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newTokenData.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Add a method to refresh the token if it expires
api.refreshToken = async () => {
  const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
    withCredentials: true
  });
  return response.data;
};

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

// Analytics API calls
api.getPostAnalytics = (postId: string) => api.get(`/analytics/post/${postId}`);
api.getOverallAnalytics = () => api.get('/analytics/overall');

// Additional API calls
api.someApiCall = (data: any) => api.post('/some-endpoint', data);
api.anotherApiCall = () => api.get('/another-endpoint');

export default api;

// Export individual functions for backwards compatibility
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

// Content generation function
export const generateContent = async (params: GenerateContentParams) => {
  // Your API call logic here
  return api.post('/generate-content', params);
};
