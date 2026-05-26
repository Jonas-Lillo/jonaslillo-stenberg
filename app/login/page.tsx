'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Feil passord.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 20px' }}>
        <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px' }}>
          Jonas Lillo-Stenberg · Dashboard
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
            className="search-input"
            style={{ maxWidth: '100%', marginBottom: 0 }}
          />
          {error && (
            <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.875rem', color: 'var(--accent)' }}>{error}</p>
          )}
          <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Logger inn...' : 'Logg inn →'}
          </button>
        </form>
      </div>
    </div>
  )
}
