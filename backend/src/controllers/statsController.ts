import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost.js';
import Comment from '../models/Comment.js';

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    const postCount = await BlogPost.countDocuments({ author: userId });
    const commentCount = await Comment.countDocuments({ author: userId });
    
    // Assuming we have a 'likes' field in the BlogPost model
    const totalLikes = await BlogPost.aggregate([
      { $match: { author: userId } },
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } }
    ]);

    res.json({
      postCount,
      commentCount,
      totalLikes: totalLikes[0]?.totalLikes || 0
    });
  } catch (error) {
    next(error);
  }
};
