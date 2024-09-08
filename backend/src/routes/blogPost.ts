import express from 'express';
import { createBlogPost, generateAIBlogPost, getBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogPostController';
import { searchBlogPosts, searchBlogPostsByTag, searchBlogPostsByAuthor } from '../controllers/searchController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, createBlogPost);
router.post('/generate', authMiddleware, generateAIBlogPost);
router.get('/:id', authMiddleware, getBlogPost);
router.put('/:id', authMiddleware, updateBlogPost);
router.delete('/:id', authMiddleware, deleteBlogPost);
router.get('/search', searchBlogPosts);
router.get('/search/tag/:tag', searchBlogPostsByTag);
router.get('/search/author/:authorId', searchBlogPostsByAuthor);

export default router;
