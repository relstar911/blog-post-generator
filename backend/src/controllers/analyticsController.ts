import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost.js';
import PostView from '../models/PostView.js';

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
    const [totalPosts, totalViews, postAnalytics] = await Promise.all([
      BlogPost.countDocuments({ author: userId }),
      PostView.countDocuments({ post: { $in: await BlogPost.find({ author: userId }).distinct('_id') } }),
      BlogPost.aggregate([
        { $match: { author: userId } },
        {
          $lookup: {
            from: 'postviews',
            localField: '_id',
            foreignField: 'post',
            as: 'views'
          }
        },
        {
          $project: {
            title: 1,
            viewCount: { $size: '$views' }
          }
        },
        { $sort: { viewCount: -1 } },
        { $limit: 10 }
      ])
    ]);

    const averageViewsPerPost = totalPosts > 0 ? totalViews / totalPosts : 0;

    res.json({
      totalPosts,
      totalViews,
      averageViewsPerPost,
      postAnalytics
    });
  } catch (error) {
    next(error);
  }
};
