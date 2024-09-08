import { useState } from 'react';
import api from '../utils/api';
import { AxiosProgressEvent } from 'axios';

interface GenerateContentResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}

interface GenerateContentParams {
  type: 'text' | 'url' | 'pdf';
  input: string | FormData;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const useGenerateContent = () => {
  const [result, setResult] = useState<GenerateContentResult>({
    content: '',
    isLoading: false,
    error: null,
  });

  const generateContent = async ({ type, input, onUploadProgress }: GenerateContentParams) => {
    setResult({ content: '', isLoading: true, error: null });
    try {
      let response;
      switch (type) {
        case 'text':
          response = await api.post('/blog-posts/generate', { prompt: input });
          break;
        case 'url':
          response = await api.post('/input/url', { url: input });
          break;
        case 'pdf':
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
