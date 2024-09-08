import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate('author', 'name');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = (req.user as any)?.id;

    const comment = new Comment({
      content,
      author: userId,
      post: postId,
    });

    await comment.save();
    await comment.populate('author', 'name');

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};
