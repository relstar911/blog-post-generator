import express from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, getDashboardData);

export default router;
