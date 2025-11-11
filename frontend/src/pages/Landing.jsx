import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold">
        <span className="text-neon-blue">Intelli</span>
        <span className="text-neon-purple">Flow</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 max-w-2xl opacity-80">
        Unified AI workflows with Gemini, AI/ML, and Qdrant. Build, analyze, and automate with a futuristic, real-time UI.
      </motion.p>
      <div className="mt-8 flex gap-3">
        <Link to="/signup" className="secondary-btn">Get Started</Link>
        <Link to="/login" className="primary-btn">Login</Link>
      </div>
    </div>
  )
}



