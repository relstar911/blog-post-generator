import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import winston from 'winston';
import cors from 'cors'; // Importing cors module
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import blogPostRoutes from './routes/blogPost.js';
import inputRoutes from './routes/input.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`MongoDB connection error: ${error.message}`, { service: 'blog-post-generator' });
  });

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/input', inputRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

