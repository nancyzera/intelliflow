import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { prisma } from '../services/prisma.js'

export const router = express.Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  const list = await prisma.workflow.findMany({ where: { ownerId: req.user.sub } })
  res.json({ workflows: list })
})

router.post('/', async (req, res) => {
  const { title, description, definition } = req.body
  const wf = await prisma.workflow.create({
    data: { title, description, definition, ownerId: req.user.sub }
  })
  res.json({ workflow: wf })
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { title, description, definition } = req.body
  const wf = await prisma.workflow.update({
    where: { id },
    data: { title, description, definition }
  })
  res.json({ workflow: wf })
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.workflow.delete({ where: { id } })
  res.json({ ok: true })
})



