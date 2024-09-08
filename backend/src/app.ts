import dotenv from 'dotenv';
dotenv.config(); // Ensure this line is at the top

import express from 'express';
import cors from 'cors';
import connectDB from './config/database'; // Ensure this path is correct
import authRoutes from './routes/auth';
import blogPostRoutes from './routes/blogPost';
import inputRoutes from './routes/input';
import errorHandler from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Use the connectDB function

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/input', inputRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001; // Change to 5001 or another unused port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

