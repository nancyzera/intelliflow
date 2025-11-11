import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'

export default function KnowledgeBase() {
  const [text, setText] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  async function save() {
    if (!text.trim()) return
    await api.memorySave(text, { source: 'kb' })
    setText('')
  }
  async function search() {
    const res = await api.memoryQuery(query)
    setResults(res || [])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="card-title">Add Memory</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Paste knowledge text..."
          className="textarea"
        />
        <div className="mt-2">
          <button onClick={save} className="secondary-btn">
            Save
          </button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
        <div className="card-title">Vector Search</div>
        <div className="flex gap-2 mb-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="input flex-1"
          />
          <button onClick={search} className="primary-btn">
            Search
          </button>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((r, i) => (
            <div key={i} className="text-xs bg-white/5 rounded px-2 py-2">
              <div className="opacity-70">score: {r.score?.toFixed(4)}</div>
              <div className="break-words">{r.payload?.text}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

