import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from './db.js';
import { prisma } from './prisma.js';

export async function signup({ name, email, password }) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  });
  const token = createToken(user);
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  const token = createToken(user);
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
}

export function createToken(user) {
  const payload = { sub: user.id, email: user.email, role: user.role };
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.verify(token, secret);
}


