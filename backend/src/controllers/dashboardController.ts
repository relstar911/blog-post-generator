import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost';
import Comment from '../models/Comment';
import PostView from '../models/PostView';

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as any).id;

    const [totalPosts, totalComments, postViewsData, topPostsData] = await Promise.all([
      BlogPost.countDocuments({ author: userId }),
      Comment.countDocuments({ post: { $in: await BlogPost.find({ author: userId }).distinct('_id') } }),
      PostView.aggregate([
        { $match: { post: { $in: await BlogPost.find({ author: userId }).distinct('_id') } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, views: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 30 }
      ]),
      BlogPost.aggregate([
        { $match: { author: userId } },
        { $lookup: { from: 'postviews', localField: '_id', foreignField: 'post', as: 'views' } },
        { $project: { title: 1, viewCount: { $size: '$views' } } },
        { $sort: { viewCount: -1 } },
        { $limit: 5 }
      ])
    ]);

    const totalViews = postViewsData.reduce((sum: number, day: any) => sum + day.views, 0);

    const dashboardData = {
      postViews: Object.fromEntries(postViewsData.map((day: any) => [day._id, day.views])),
      totalViews,
      totalPosts,
      totalComments,
      averageViewsPerPost: totalPosts > 0 ? totalViews / totalPosts : 0,
      topPosts: topPostsData.map((post: any) => ({ title: post.title, views: post.viewCount }))
    };

    res.json(dashboardData);
  } catch (error) {
    next(error);
  }
};
