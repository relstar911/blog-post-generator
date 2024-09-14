import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import BlogPost from '../models/BlogPost.js';
import Comment from '../models/Comment.js';

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { name, bio, location, website } = req.body;

    // Ensure that only the authenticated user can update their profile
    if ((req.user as any).id !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio, location, website },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;

    const [user, postCount, commentCount, totalLikesData] = await Promise.all([
      User.findById(userId).select('-password'),
      BlogPost.countDocuments({ author: userId }),
      Comment.countDocuments({ author: userId }),
      BlogPost.aggregate([
        { $match: { author: userId } },
        { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
      ]),
    ]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalLikes = totalLikesData[0]?.totalLikes || 0;

    const statistics = {
      postCount,
      commentCount,
      totalLikes,
    };

    res.json({ user, statistics });
  } catch (error) {
    next(error);
  }
};
