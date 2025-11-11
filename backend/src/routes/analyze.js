import express from 'express';
import multer from 'multer';
import { analyzeWithGemini } from '../services/gemini.js';
import { getDb } from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
export const router = express.Router();

router.post('/', requireAuth, upload.any(), async (req, res) => {
  try {
    const { text } = req.body;
    const file = (req.files || [])[0];
    const isImage = file && file.mimetype?.startsWith('image/');
    const isAudio = file && file.mimetype?.startsWith('audio/');

    const imageBase64 = isImage ? file.buffer.toString('base64') : undefined;
    const audioBase64 = isAudio ? file.buffer.toString('base64') : undefined;

    const { summary, ai_tags } = await analyzeWithGemini({ text, imageBase64, audioBase64 });

    await getDb().query(
      'INSERT INTO insights (source_type, summary, ai_tags) VALUES ($1, $2, $3)',
      [isImage ? 'image' : isAudio ? 'audio' : 'text', summary, JSON.stringify(ai_tags)]
    );

    res.json({ summary, ai_tags });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


