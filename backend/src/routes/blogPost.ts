import express from 'express';
import { createBlogPost, generateAIBlogPost, getBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogPostController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createBlogPost);
router.post('/generate', authMiddleware, generateAIBlogPost);
router.get('/:id', authMiddleware, getBlogPost);
router.put('/:id', authMiddleware, updateBlogPost);
router.delete('/:id', authMiddleware, deleteBlogPost);

export default router;
