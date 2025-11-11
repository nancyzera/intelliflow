import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setLoading(true)
    try {
      const res = await api.analyzeText(input)
      const aiMsg = { role: 'assistant', content: res.summary }
      setMessages((m) => [...m, aiMsg])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error analyzing input.' }])
    } finally {
      setInput('')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="h-60 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] p-3 rounded-2xl ${
              m.role === 'user'
                ? 'ml-auto bg-neon-blue/20 border border-neon-blue/30'
                : 'mr-auto bg-white/5 border border-white/10'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="input flex-1"
        />
        <button
          disabled={loading}
          onClick={send}
          className="primary-btn"
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  )
}


