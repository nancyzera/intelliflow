import { useEffect, useState } from 'react'

export default function Settings() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <div className="card">
      <div className="card-title">Settings</div>
      <div className="flex items-center gap-2">
        <input id="theme" type="checkbox" checked={dark} onChange={() => setDark((v) => !v)} />
        <label htmlFor="theme">Dark Mode</label>
      </div>
    </div>
  )
}


