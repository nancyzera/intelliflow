import express from 'express';
import { getDb } from '../services/db.js';
import { requireAuth } from '../middleware/auth.js';

export const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const db = getDb();
    const { rows: taskCounts } = await db.query(`
      SELECT status, COUNT(*)::int as count FROM tasks GROUP BY status
    `);
    const { rows: insightCounts } = await db.query(`
      SELECT source_type, COUNT(*)::int as count FROM insights GROUP BY source_type
    `);
    res.json({
      tasks: taskCounts,
      insights: insightCounts
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


