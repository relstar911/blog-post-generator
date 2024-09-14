import { callOpenAI } from '../utils/apiUtils';

export async function generateBlogPost(prompt: string): Promise<string> {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that generates blog post content.' },
      { role: 'user', content: `Generate a detailed blog post about: ${prompt}. Include an introduction, main points, and a conclusion.` }
    ],
    max_tokens: 1000,
    temperature: 0.7,
  };
  return callOpenAI(data);
}

export const summarizeContent = async (content: string): Promise<string> => {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that summarizes content.' },
      { role: 'user', content: `Summarize the following content:\n\n${content}\n\nSummary:` }
    ],
    max_tokens: 100,
    temperature: 0.5,
  };
  return callOpenAI(data);
};

export const extractKeywords = async (content: string): Promise<string[]> => {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that extracts keywords from content.' },
      { role: 'user', content: `Extract keywords from the following content:\n\n${content}\n\nKeywords:` }
    ],
    max_tokens: 50,
    temperature: 0.5,
  };
  const keywordsText = await callOpenAI(data);
  return keywordsText.split(',').map((keyword: string) => keyword.trim());
};
