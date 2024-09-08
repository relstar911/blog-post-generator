import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import BlogPost from '../models/BlogPost';
import Comment from '../models/Comment';

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

    const [user, postCount, commentCount, totalLikes] = await Promise.all([
      User.findById(userId).select('-password'),
      BlogPost.countDocuments({ author: userId }),
      Comment.countDocuments({ author: userId }),
      BlogPost.aggregate([
        { $match: { author: userId } },
        { $group: { _id: null, totalLikes: { $sum: '$likes' } } }
      ])
    ]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const statistics = {
      postCount,
      commentCount,
      totalLikes: totalLikes[0]?.totalLikes || 0
    };

    res.json({ user, statistics });
  } catch (error) {
    next(error);
  }
};
