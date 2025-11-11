import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { router as analyzeRouter } from './routes/analyze.js';
import { router as aimlRouter } from './routes/aiml.js';
import { router as memoryRouter } from './routes/memory.js';
import { router as authRouter } from './routes/auth.js';
import { router as analyticsRouter } from './routes/analytics.js';
import { router as workflowsRouter } from './routes/workflows.js';
import { initDb } from './services/db.js';
import { initQdrant } from './services/qdrant.js';
import { initNotificationSocket } from './sockets/notifications.js';
import { router as oauthGoogleRouter } from './routes/oauthGoogle.js';

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'intelliflow-backend' });
});

app.use('/auth', authRouter);
app.use('/auth', oauthGoogleRouter);
app.use('/analyze', analyzeRouter);
app.use('/ai-ml', aimlRouter);
app.use('/memory', memoryRouter);
app.use('/analytics', analyticsRouter);
app.use('/workflows', workflowsRouter);

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  await initDb();
  await initQdrant();
  initNotificationSocket(io);
  // Startup validation (do not print secrets)
  const requiredKeys = ['JWT_SECRET', 'QDRANT_URL'];
  const missing = requiredKeys.filter((k) => !process.env[k] || process.env[k].trim() === '');
  if (missing.length) {
    console.warn('Missing required env keys:', missing.join(', '));
  }
  const providerKeys = ['GEMINI_API_KEY', 'AIML_API_KEY'];
  const missingProviders = providerKeys.filter((k) => !process.env[k] || process.env[k].trim() === '');
  if (missingProviders.length) {
    console.warn('Provider API keys not set (features may be limited):', missingProviders.join(', '));
  }
  server.listen(PORT, () => {
    console.log(`IntelliFlow backend running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});


