import express from 'express';
import { getComments, createComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', authMiddleware, createComment);

export default router;
