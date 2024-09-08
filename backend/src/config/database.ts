import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

mongoose.set('strictQuery', false);

const connectDB = async (): Promise<void> => {
  const retryDelay = 5000; // 5 seconds
  const maxRetries = 5;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      logger.info('MongoDB connected successfully');
      break;
    } catch (error) {
      logger.error(`MongoDB connection attempt ${i + 1} failed: ${error}`);
      if (i === maxRetries - 1) {
        logger.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default connectDB;
