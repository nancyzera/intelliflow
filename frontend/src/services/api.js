import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const http = axios.create({
  baseURL
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const api = {
  async signup({ name, email, password }) {
    const { data } = await http.post('/auth/signup', { name, email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },
  async login({ email, password }) {
    const { data } = await http.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },
  async forgot(email) {
    const { data } = await http.post('/auth/forgot', { email })
    return data
  },
  async reset(token, password) {
    const { data } = await http.post('/auth/reset', { token, password })
    return data
  },
  async analyzeText(text) {
    const { data } = await http.post('/analyze', { text })
    return data
  },
  async aiMl(payload) {
    const { data } = await http.post('/ai-ml', payload)
    return data
  },
  async memorySave(text, metadata) {
    const { data } = await http.post('/memory', { text, metadata })
    return data
  },
  async memoryQuery(query) {
    const { data } = await http.get('/memory', { params: { query } })
    return data.results
  },
  async analytics() {
    const { data } = await http.get('/analytics')
    return data
  }
}


