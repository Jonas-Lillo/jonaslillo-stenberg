'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement
    if (input?.value?.includes('@')) {
      setSubmitted(true)
    } else {
      input?.focus()
    }
  }

  return (
    <div className="email-signup">
      <p>Få beskjed når jeg publiserer.</p>
      {submitted ? (
        <p className="signup-success" style={{ display: 'block' }}>Takk — du hører fra meg.</p>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="email" className="signup-input" placeholder="e-post" aria-label="E-postadresse" />
          <button className="signup-btn" type="submit">Meld på</button>
        </form>
      )}
    </div>
  )
}
