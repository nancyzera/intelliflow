import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

export default function Dashboard() {
  const [stats, setStats] = useState({ tasks: [], insights: [] })
  useEffect(() => {
    api.analytics().then(setStats).catch(() => {})
  }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="card-title">Tasks</div>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(stats.tasks, null, 2)}</pre>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="card-title">Insights</div>
        <pre className="text-xs overflow-x-auto">{JSON.stringify(stats.insights, null, 2)}</pre>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="card-title">System</div>
        <div className="text-sm opacity-80">Futuristic neon UI ready.</div>
      </motion.div>
    </div>
  )
}


