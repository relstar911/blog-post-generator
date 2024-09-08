import express from 'express';
import { processUrlInput, processTextInput } from '../controllers/inputController.js';

const router = express.Router();

// Define your input routes here
// Example:
// router.post('/', (req, res) => {
//   res.send('Input received');
// });

router.post('/url', processUrlInput);
router.post('/text', processTextInput);

export default router;
