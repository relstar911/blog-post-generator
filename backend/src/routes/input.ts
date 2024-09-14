import express from 'express';
import { processUrlInput, processTextInput, processPDFInput } from '../controllers/inputController.js';
import { authMiddleware } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define your input routes here
// Example:
// router.post('/', (req, res) => {
//   res.send('Input received');
// });

router.post('/url', authMiddleware, processUrlInput);
router.post('/text', authMiddleware, processTextInput);
router.post('/pdf', authMiddleware, upload.single('pdf'), processPDFInput);

// Global error handler for this router
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

export default router;
