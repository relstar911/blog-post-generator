import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost';
import PostView from '../models/PostView';

export const getPostAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const [post, viewCount] = await Promise.all([
      BlogPost.findById(postId).select('title'),
      PostView.countDocuments({ post: postId })
    ]);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      title: post.title,
      viewCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getOverallAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as any).id;
    const [totalPosts, totalViews] = await Promise.all([
      BlogPost.countDocuments({ author: userId }),
      PostView.countDocuments({ post: { $in: await BlogPost.find({ author: userId }).distinct('_id') } })
    ]);

    res.json({
      totalPosts,
      totalViews,
      averageViewsPerPost: totalPosts > 0 ? totalViews / totalPosts : 0
    });
  } catch (error) {
    next(error);
  }
};
