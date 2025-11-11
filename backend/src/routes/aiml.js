import express from 'express';
import multer from 'multer';
import { runAIML } from '../services/aiml.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
export const router = express.Router();

router.post('/', requireAuth, upload.any(), async (req, res) => {
  try {
    const { mode, text } = req.body;
    const file = (req.files || [])[0];
    const imageBase64 = file?.mimetype?.startsWith('image/') ? file.buffer.toString('base64') : undefined;
    const audioBase64 = file?.mimetype?.startsWith('audio/') ? file.buffer.toString('base64') : undefined;
    const result = await runAIML({ mode, text, imageBase64, audioBase64 });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


