import { verifyToken } from '../services/auth.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}


