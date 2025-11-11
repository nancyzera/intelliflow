import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api.js'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api.signup({ name, email, password })
      navigate('/')
    } catch (e) {
      setError(e?.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={onSubmit} className="card w-full max-w-md">
        <div className="card-title">Create Account</div>
        <div className="space-y-3">
          <input className="input w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <button className="secondary-btn w-full" type="submit">Sign Up</button>
          <div className="text-xs opacity-70 text-center">
            Already have an account? <Link to="/login" className="text-neon-blue">Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}


