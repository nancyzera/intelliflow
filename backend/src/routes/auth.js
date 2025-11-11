import express from 'express';
import { login, signup } from '../services/auth.js';
import crypto from 'crypto'
import { prisma } from '../services/prisma.js'

export const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await signup({ name, email, password });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/forgot', async (req, res) => {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.json({ ok: true }) // avoid leaking
  const token = crypto.randomBytes(24).toString('hex')
  const exp = new Date(Date.now() + 1000 * 60 * 30) // 30 minutes
  await prisma.user.update({ where: { id: user.id }, data: { resetToken: token, resetTokenExp: exp } })
  // TODO: integrate real email provider. For now, return the token in response for demo.
  res.json({ ok: true, resetToken: token })
})

router.post('/reset', async (req, res) => {
  const { token, password } = req.body
  const user = await prisma.user.findFirst({ where: { resetToken: token } })
  if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired token' })
  }
  const hashed = await (await import('bcryptjs')).default.hash(password, 10)
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExp: null }
  })
  res.json({ ok: true })
})


