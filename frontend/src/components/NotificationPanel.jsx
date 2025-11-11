import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function NotificationPanel() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
    const socket = io(baseURL, { transports: ['websocket'] })
    socket.on('connected', (msg) => {
      setEvents((e) => [{ type: 'connected', msg }, ...e])
    })
    socket.on('automation:update', (evt) => {
      setEvents((e) => [evt, ...e])
    })
    return () => socket.disconnect()
  }, [])

  return (
    <div className="glass neon-border p-3">
      <div className="font-semibold mb-2">Realtime Notifications</div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {events.map((e, idx) => (
          <div key={idx} className="text-xs bg-white/5 rounded px-2 py-1">
            <div className="opacity-70">{e.type || e.status}</div>
            <div className="break-words">{JSON.stringify(e)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


