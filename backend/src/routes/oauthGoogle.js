import express from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../services/prisma.js'

export const router = express.Router()

// NOTE: This is a scaffold. Replace with Passport.js or direct Google OAuth code flow.
router.get('/google', (req, res) => {
  return res.status(501).json({ error: 'Google OAuth not configured. Set GOOGLE_CLIENT_ID/SECRET and implement callback.' })
})

router.get('/google/callback', async (req, res) => {
  // This is a placeholder; in real flow, exchange code for tokens, verify id_token
  return res.status(501).json({ error: 'Google OAuth callback not configured.' })
})



