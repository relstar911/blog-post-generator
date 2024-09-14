import axios from 'axios';
import { generateBlogPost, extractKeywords } from '../../../src/services/openaiService';
import { jest } from '@jest/globals';
import { describe, it, expect } from '@jest/globals'; // Use standard Jest imports

jest.mock('axios');

describe('OpenAI Service', () => {
  describe('generateBlogPost', () => {
    it('should generate blog post content', async () => {
      const prompt = 'Test prompt';
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'Generated blog post content',
              },
            },
          ],
        },
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

      const result = await generateBlogPost(prompt);

      expect(result).toBe('Generated blog post content');
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that generates blog post content.' },
            { role: 'user', content: `Generate a detailed blog post about: ${prompt}. Include an introduction, main points, and a conclusion.` },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
    });

    it('should throw an error if the API call fails', async () => {
      const prompt = 'Test prompt';
      (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(new Error('API call failed'));

      await expect(generateBlogPost(prompt)).rejects.toThrow('Failed to generate blog post');
    });
  });

  describe('extractKeywords', () => {
    it('should extract keywords from content', async () => {
      const content = 'Test content';
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'keyword1, keyword2, keyword3',
              },
            },
          ],
        },
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

      const result = await extractKeywords(content);

      expect(result).toEqual(['keyword1', 'keyword2', 'keyword3']);
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.openai.com/v1/chat/completions',
        expect.objectContaining({
          model: 'gpt-3.5-turbo',
          messages: expect.any(Array),
          max_tokens: 50,
          temperature: 0.5,
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': expect.stringContaining('Bearer '),
          }),
        })
      );
    });
  });
});
