import { Request, Response } from 'express';
import { createBlogPost, getBlogPost, updateBlogPost, deleteBlogPost } from '../../../src/controllers/blogPostController';
import BlogPost from '../../../src/models/BlogPost';

jest.mock('../../../src/models/BlogPost');

describe('BlogPostController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('createBlogPost', () => {
    it('should create a new blog post', async () => {
      req.body = { title: 'Test Post', content: 'Test Content' };
      req.user = { userId: 'testUserId' };

      const mockSave = jest.fn().mockResolvedValue({
        _id: 'testPostId',
        title: 'Test Post',
        content: 'Test Content',
        author: 'testUserId',
      });

      (BlogPost as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      await createBlogPost(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Blog post created successfully',
          blogPost: expect.objectContaining({
            title: 'Test Post',
            content: 'Test Content',
            author: 'testUserId',
          }),
        })
      );
    });
  });

  // Add tests for getBlogPost, updateBlogPost, and deleteBlogPost
});