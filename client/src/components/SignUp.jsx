import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleSignUp = async () => {
    setErrorMsg('')
    const { error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setErrorMsg(signUpError.message)
      return
    }

    // Connexion automatique après inscription
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setErrorMsg(signInError.message)
      return
    }

    navigate('/app')
  }

  const handleGoToLogin = async () => {
  setErrorMsg('')
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
  if (signInError) {
    setErrorMsg(signInError.message)
    return
  }
  navigate('/app')
}
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Créer un compte</h2>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleSignUp}>
          Créer un compte
        </button>
        <button style={{ ...styles.button, background: '#3ba55d', marginTop: 0 }} onClick={handleGoToLogin}>
          Se connecter à un compte existant
        </button>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #5865F2 0%, #23272A 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#2f3136',
    padding: '40px 32px',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 320,
  },
  title: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 24,
    marginBottom: 24,
    fontFamily: 'Segoe UI, sans-serif',
    letterSpacing: 1,
  },
  input: {
    padding: '12px 14px',
    borderRadius: 6,
    border: 'none',
    background: '#202225',
    color: '#fff',
    fontSize: 16,
    outline: 'none',
    marginBottom: 16,
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    width: 250,
  },
  button: {
    padding: '12px 0',
    borderRadius: 6,
    border: 'none',
    background: '#5865F2',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.2s',
    fontFamily: 'Segoe UI, sans-serif',
    width: '100%',
    marginBottom: 8,
  },
  error: {
    color: '#fa7777',
    marginTop: 8,
    fontWeight: 500,
    background: '#23272A',
    padding: 8,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  },
}