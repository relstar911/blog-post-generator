import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost.js';
import { generateBlogPost } from '../services/openaiService.js';
import { authMiddleware } from '../middleware/auth.js';

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = (req.user as any)?.id;

    const blogPost = new BlogPost({
      title,
      content,
      author: userId,
    });

    await blogPost.save();

    res.status(201).json({ message: 'Blog post created successfully', blogPost });
  } catch (error) {
    next(error);
  }
};

export const generateAIBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    const generatedContent = await generateBlogPost(prompt);

    res.json({ content: generatedContent });
  } catch (error) {
    next(error);
  }
};

export const getBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const searchBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (typeof q !== 'string') {
      return res.status(400).json({ message: 'Invalid search query' });
    }

    const searchResults = await BlogPost.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('author', 'name')
      .limit(20);

    res.json(searchResults);
  } catch (error) {
    next(error);
  }
};

// Add more controller functions as needed (e.g., getBlogPosts, updateBlogPost, deleteBlogPost)
