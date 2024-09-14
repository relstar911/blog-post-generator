import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost.js';

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

export const searchBlogPostsByTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tag } = req.params;

    const searchResults = await BlogPost.find({ tags: { $in: [tag] } })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
      .limit(20);

    res.json(searchResults);
  } catch (error) {
    next(error);
  }
};

export const searchBlogPostsByAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorId } = req.params;

    const searchResults = await BlogPost.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate('author', 'name')
      .limit(20);

    res.json(searchResults);
  } catch (error) {
    next(error);
  }
};
