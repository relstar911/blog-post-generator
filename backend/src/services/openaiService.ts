import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

export async function generateBlogPost(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates blog post content.' },
          { role: 'user', content: `Generate a detailed blog post about: ${prompt}. Include an introduction, main points, and a conclusion.` }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post');
  }
}

export const summarizeContent = async (content: string): Promise<string> => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that summarizes content.' },
          { role: 'user', content: `Summarize the following content:\n\n${content}\n\nSummary:` }
        ],
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error summarizing content:', error);
    throw new Error('Failed to summarize content');
  }
};

export const extractKeywords = async (content: string): Promise<string[]> => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts keywords from content.' },
          { role: 'user', content: `Extract keywords from the following content:\n\n${content}\n\nKeywords:` }
        ],
        max_tokens: 50,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const keywordsText = response.data.choices[0].message.content.trim();
    return keywordsText.split(',').map((keyword: string) => keyword.trim());
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw new Error('Failed to extract keywords');
  }
};
