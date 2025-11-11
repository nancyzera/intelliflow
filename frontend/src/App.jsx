import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import Dashboard from './pages/Dashboard.jsx'
import KnowledgeBase from './pages/KnowledgeBase.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Landing from './pages/Landing.jsx'
import WorkflowBuilder from './pages/WorkflowBuilder.jsx'
import IntegrationPanel from './pages/IntegrationPanel.jsx'
import Profile from './pages/Profile.jsx'
import Chat from './components/Chat.jsx'
import NotificationPanel from './components/NotificationPanel.jsx'
import { api } from './services/api.js'

export default function App() {
  const [particlesInitDone, setParticlesInitDone] = useState(false)
  const navigate = useNavigate()
  const isAuthed = useMemo(() => !!localStorage.getItem('token'), [])

  const particlesInit = async (engine) => {
    await loadFull(engine)
    setParticlesInitDone(true)
  }

  useEffect(() => {
    if (!isAuthed) navigate('/login')
  }, [isAuthed, navigate])

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Particles id="tsparticles" init={particlesInit}
          options={{
            background: { color: { value: '#0b1220' } },
            fullScreen: false,
            fpsLimit: 60,
            particles: {
              number: { value: 60, density: { enable: true, area: 800 } },
              color: { value: ['#00E5FF', '#9D4EDD'] },
              links: { enable: true, color: '#7dd3fc', distance: 150, opacity: 0.3, width: 1 },
              move: { enable: true, speed: 1.2, outModes: { default: 'bounce' } },
              opacity: { value: 0.4 },
              size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
          }}
        />
      </div>
      <div className="flex">
        <aside className="w-72 h-screen sticky top-0 p-5 glass neon-border">
          <Brand />
          <nav className="mt-6 space-y-1">
            <NavItem to="/" label="Dashboard" icon={<HomeIcon />} />
            <NavItem to="/knowledge" label="Knowledge Base" icon={<BookIcon />} />
            <NavItem to="/workflow" label="Workflow Builder" icon={<ChartIcon />} />
            <NavItem to="/integrations" label="AI Integration" icon={<ChartIcon />} />
            <NavItem to="/analytics" label="Analytics" icon={<ChartIcon />} />
            <NavItem to="/settings" label="Settings" icon={<CogIcon />} />
            <NavItem to="/profile" label="Profile" icon={<CogIcon />} />
          </nav>
          <div className="mt-6">
            <NotificationPanel />
          </div>
        </aside>
        <main className="flex-1 p-8 space-y-8">
          <Header />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="card"
          >
            <div className="card-title">Gemini Assistant</div>
            <Chat />
          </motion.div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/workflow" element={<WorkflowBuilder />} />
            <Route path="/integrations" element={<IntegrationPanel />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div className="text-2xl font-bold tracking-wider">
      <span className="text-neon-blue">Intelli</span>
      <span className="text-neon-purple">Flow</span>
    </div>
  )
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold opacity-80">Unified AI Knowledge & Automation</div>
      <div className="flex items-center gap-3">
        <div className="hidden md:block text-xs opacity-60">v0.1.0</div>
        <div className="h-9 px-3 rounded-md border border-white/10 bg-white/5 backdrop-blur flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
          <span className="text-xs opacity-70">Online</span>
        </div>
      </div>
    </div>
  )
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition ${
          isActive ? 'bg-white/10 text-neon-blue border border-white/10' : 'hover:bg-white/5'
        }`
      }
      end
    >
      <span className="w-5 h-5 opacity-70">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" strokeWidth="1.5"/>
    </svg>
  )
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2V5z" strokeWidth="1.5"/>
      <path d="M6 4h11" strokeWidth="1.5"/>
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 19V5" strokeWidth="1.5"/>
      <rect x="7" y="10" width="3" height="9" rx="1" strokeWidth="1.5"/>
      <rect x="12" y="7" width="3" height="12" rx="1" strokeWidth="1.5"/>
      <rect x="17" y="12" width="3" height="7" rx="1" strokeWidth="1.5"/>
    </svg>
  )
}
function CogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" strokeWidth="1.5"/>
      <path d="M3 12h3M18 12h3M12 3v3M12 18v3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeWidth="1.5"/>
    </svg>
  )
}


