import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login({ onSubmit }) {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Bienvenue 👋</h1>
                <p style={styles.subtitle}>Quel pseudo veux-tu utiliser&nbsp;?</p>
                <form
                    style={styles.form}
                    onSubmit={e => {
                        e.preventDefault()
                        onSubmit(username)
                    }}
                >
                    <input
                        type="text"
                        value={username}
                        placeholder="Nom d'utilisateur"
                        style={styles.input}
                        onChange={e => setUsername(e.target.value)}
                        autoFocus
                    />
                    <input type="submit" value="Se connecter pour les curseurs en temps réel" style={styles.button} />
                </form>
                <div style={styles.divider}></div>
                <button style={styles.signupButton} onClick={() => navigate('/signup')}>
                    Se connecter pour le chat en temps réel
                </button>
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
        fontSize: 28,
        marginBottom: 8,
        fontFamily: 'Segoe UI, sans-serif',
        letterSpacing: 1,
    },
    subtitle: {
        color: '#b9bbbe',
        fontSize: 16,
        marginBottom: 24,
        fontFamily: 'Segoe UI, sans-serif',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    input: {
        padding: '12px 14px',
        borderRadius: 6,
        border: 'none',
        background: '#202225',
        color: '#fff',
        fontSize: 16,
        outline: 'none',
        marginBottom: 8,
        fontFamily: 'Segoe UI, sans-serif',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
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
        marginBottom: 8,
    },
    divider: {
        width: '100%',
        height: 1,
        background: '#36393f',
        margin: '16px 0',
    },
    signupButton: {
        padding: '10px 0',
        borderRadius: 6,
        border: 'none',
        background: '#3ba55d',
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
        fontFamily: 'Segoe UI, sans-serif',
        width: '100%',
        transition: 'background 0.2s',
    },
}