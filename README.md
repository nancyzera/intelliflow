IntelliFlow — Unified AI Knowledge & Workflow Automation System
==============================================================

IntelliFlow is a futuristic full‑stack platform integrating Gemini AI, AI/ML APIs, and Qdrant for multimodal analysis, semantic memory search, and workflow automation. It features a sleek neon/glass design, particles background, JWT auth, and Google OAuth scaffolding.

Tech Stack
----------
- Frontend: React, TailwindCSS, Framer Motion, Vanta.js/Three.js, Axios, Socket.IO client
- Backend: Node.js, Express, Socket.IO, PostgreSQL, Qdrant, JWT auth
- Vector DB: Qdrant
- Deployment: Docker, docker-compose

Monorepo Structure
------------------
```
frontend/   # React + Tailwind + Framer Motion app
backend/    # Express API + integrations + sockets
.env.example
docker-compose.yml
README.md
```

Core Features
-------------
- Multimodal Analyze: Text/Image/Audio → Gemini → Summaries and insights
- AI/ML API: Sentiment, object detection, TTS, STT
- Semantic Memory: Store/query embeddings in Qdrant
- Live Vector Search: Instant results in UI
- Realtime Notifications: System updates via WebSockets
- Dashboard: Analytics, usage, and system status
- Workflow Builder: Drag-and-drop block canvas (Gemini, AI/ML, Qdrant blocks)
- Auth: Login, Signup, Forgot Password, (Google OAuth scaffold)

Quick Start (Docker)
--------------------
1) Copy `.env.example` to `.env` and fill in values:
```
cp .env.example .env
```

2) Start services:
```
docker compose up -d --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Postgres: localhost:5432
- Qdrant: http://localhost:6333

Local Development (without Docker)
----------------------------------
Backend:
```
cd backend
npm install
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```

Environment Variables
---------------------
See `.env.example` for all keys.
- Backend:
  - PORT, DATABASE_URL, JWT_SECRET
  - GEMINI_API_KEY, AIML_API_KEY
  - QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION
  - CLIENT_ORIGIN
- Frontend:
  - VITE_API_BASE_URL

API Endpoints (Backend)
-----------------------
- POST `/auth/signup`, POST `/auth/login` — JWT-based authentication
- POST `/analyze` — Text/Image/Audio → Gemini insights
- POST `/ai-ml` — Proxy to AI/ML API (sentiment, object detection, TTS/STT)
- POST `/memory` — Save embeddings to Qdrant
- GET `/memory` — Query similar vectors in Qdrant
- GET `/analytics` — Usage and workflow statistics
- CRUD `/workflows` — Create/list/update/delete workflow definitions (Prisma)
- GET `/auth/google`, `/auth/google/callback` — OAuth scaffold
- POST `/auth/forgot`, `/auth/reset` — Reset password flow (demo returns token)

UI Highlights
-------------
- Neon & glassmorphism theme with hover/pulse animations
- Sidebar: Dashboard, Knowledge Base, Workflow Builder, AI Integration, Analytics, Settings, Profile
- AI Chat: Gemini-powered conversation UI
- Live Search: Qdrant vector similarity
- Voice: Button to use STT/TTS via AI/ML API
- Notifications: Realtime system updates

Notes
-----
- Service integrations are stubbed; wire real provider SDKs/REST endpoints by filling env vars and extending `/backend/src/services/*`.
- Ensure Qdrant collection exists (the server initializes it on boot if missing).
- This is a starter kit; expand DB schema/migrations per your needs.

License
-------
MIT


