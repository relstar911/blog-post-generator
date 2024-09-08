import { useState } from 'react';
import api from '../utils/api';

interface GenerateContentResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export const useGenerateContent = () => {
  const [result, setResult] = useState<GenerateContentResult>({
    content: '',
    isLoading: false,
    error: null,
  });

  const generateContent = async (prompt: string) => {
    setResult({ content: '', isLoading: true, error: null });
    try {
      const response = await api.post('/blog-posts/generate', { prompt });
      setResult({ content: response.data.content, isLoading: false, error: null });
    } catch (error) {
      setResult({ content: '', isLoading: false, error: 'Failed to generate content' });
    }
  };

  return { ...result, generateContent };
};
