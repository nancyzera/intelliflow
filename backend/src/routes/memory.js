import express from 'express';
import { getQdrant } from '../services/qdrant.js';
import { embedText } from '../services/embeddings.js';
import { requireAuth } from '../middleware/auth.js';

export const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const { text, metadata } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    const vector = await embedText(text);
    const qdrant = getQdrant();
    const collection = process.env.QDRANT_COLLECTION || 'intelliflow_vectors';
    const id = Date.now();
    await qdrant.upsert(collection, {
      points: [{
        id,
        vector,
        payload: { text, ...(metadata || {}) }
      }]
    });
    res.json({ id, ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'query is required' });
    const vector = await embedText(query);
    const qdrant = getQdrant();
    const collection = process.env.QDRANT_COLLECTION || 'intelliflow_vectors';
    const search = await qdrant.search(collection, {
      vector,
      limit: 10,
      with_payload: true,
      score_threshold: 0
    });
    res.json({ results: search });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


