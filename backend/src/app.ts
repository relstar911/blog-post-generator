import dotenv from 'dotenv';
dotenv.config(); // Ensure this line is at the top

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js'; // Add .js extension
import authRoutes from './routes/auth.js'; // Add .js extension
import blogPostRoutes from './routes/blogPost.js'; // Add .js extension
import inputRoutes from './routes/input.js'; // Add .js extension
import errorHandler from './middleware/errorHandler.js'; // Add .js extension

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/input', inputRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

export default app;

