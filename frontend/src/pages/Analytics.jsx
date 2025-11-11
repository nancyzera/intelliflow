import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { api } from '../services/api.js'

export default function Analytics() {
  const [stats, setStats] = useState({ tasks: [], insights: [] })
  useEffect(() => {
    api.analytics().then(setStats).catch(() => {})
  }, [])

  const chartData = (stats.tasks || []).map((t, idx) => ({ name: t.status, count: t.count, idx }))

  return (
    <div className="card">
      <div className="card-title">Analytics</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#00E5FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


