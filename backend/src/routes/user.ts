import express from 'express';
import { getUserProfile, updateUserProfile, getUserStatistics } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/:id', authMiddleware, getUserProfile);

// Update user profile
router.put('/:id', authMiddleware, updateUserProfile);

// Get user statistics
router.get('/:id/statistics', authMiddleware, getUserStatistics);

export default router;
