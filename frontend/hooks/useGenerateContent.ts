import { useState } from 'react';
import api from '../utils/api';
import { AxiosProgressEvent } from 'axios';

interface GenerateContentResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export interface GenerateContentParams {
  type: 'text' | 'url' | 'pdf';
  input: string | FormData;
  title?: string;
  keywords?: string[];
  sourceUrl?: string;
  metadata?: any;
  pageCount?: number;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const useGenerateContent = () => {
  const [result, setResult] = useState<GenerateContentResult>({
    content: '',
    isLoading: false,
    error: null,
  });

  const generateContent = async ({ type, input, title, keywords, sourceUrl, metadata, pageCount, onUploadProgress }: GenerateContentParams) => {
    setResult({ content: '', isLoading: true, error: null });
    try {
      let response;
      switch (type) {
        case 'text':
          response = await api.post('/blog-posts/generate', { prompt: input, title, keywords });
          break;
        case 'url':
          response = await api.post('/input/url', { url: input, title, keywords, sourceUrl });
          break;
        case 'pdf':
          if (input instanceof FormData) {
            input.append('title', title || '');
            input.append('keywords', JSON.stringify(keywords || []));
            if (metadata) input.append('metadata', JSON.stringify(metadata));
            if (pageCount) input.append('pageCount', pageCount.toString());
          }
          response = await api.post('/input/pdf', input, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
          });
          break;
        default:
          throw new Error('Invalid input type');
      }
      if (!response) {
        throw new Error('No response from API');
      }
      setResult({ content: response.data.content, isLoading: false, error: null });
      return response.data.content;
    } catch (error) {
      setResult({ content: '', isLoading: false, error: 'Failed to generate content' });
      throw error;
    }
  };

  return { ...result, generateContent };
};
