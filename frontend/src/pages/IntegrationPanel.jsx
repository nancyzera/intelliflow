import { useState } from 'react'
import { api } from '../services/api.js'

export default function IntegrationPanel() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  async function analyze() {
    const res = await api.analyzeText(text)
    setResult(res)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <div className="card-title">Gemini AI</div>
        <textarea className="textarea" rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text for analysis..." />
        <div className="mt-2">
          <button className="primary-btn" onClick={analyze}>Analyze</button>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Result</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  )
}


