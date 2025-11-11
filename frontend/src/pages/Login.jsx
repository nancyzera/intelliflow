import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api.login({ email, password })
      navigate('/')
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md">
        <div className="card-title">Login</div>
        <div className="space-y-3">
          <input className="input w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <button className="primary-btn w-full" type="submit">Sign In</button>
          <GoogleButton />
          <div className="text-xs opacity-70 text-center">
            Don&apos;t have an account? <Link to="/signup" className="text-neon-blue">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

function GoogleButton() {
  function startGoogle() {
    window.location.href = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080') + '/auth/google'
  }
  return (
    <button type="button" onClick={startGoogle} className="w-full px-4 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
      Continue with Google
    </button>
  )
}


