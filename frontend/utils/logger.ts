import { NextApiRequest } from 'next';

interface ErrorWithStatus extends Error {
  status?: number;
}

export const logger = {
  error: (error: ErrorWithStatus, req?: NextApiRequest) => {
    console.error('=== Error Log Start ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error Message:', error.message);
    console.error('Error Name:', error.name);
    console.error('Error Stack:', error.stack);
    
    if (error.status) {
      console.error('Error Status:', error.status);
    }

    if (req) {
      console.error('Request Method:', req.method);
      console.error('Request URL:', req.url);
      console.error('Request Headers:', req.headers);
      console.error('Request Body:', req.body);
    }

    console.error('=== Error Log End ===');
  },

  warn: (message: string, metadata?: any) => {
    console.warn('=== Warning Log Start ===');
    console.warn('Timestamp:', new Date().toISOString());
    console.warn('Warning Message:', message);
    if (metadata) {
      console.warn('Metadata:', JSON.stringify(metadata, null, 2));
    }
    console.warn('=== Warning Log End ===');
  },

  info: (message: string, metadata?: any) => {
    console.log('=== Info Log Start ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Info Message:', message);
    if (metadata) {
      console.log('Metadata:', JSON.stringify(metadata, null, 2));
    }
    console.log('=== Info Log End ===');
  }
};
