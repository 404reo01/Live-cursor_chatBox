import React, { useState, useEffect, useRef } from 'react'
import { ably } from '../lib/ablyClient'
import { supabase } from '../lib/supabaseClient'
import { data } from 'react-router-dom'

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const messagesEndRef = useRef(null)
  const channel = ably.channels.get('chat-global')

  useEffect(() => {
    // Récupère l'utilisateur connecté une seule fois
    const getUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Erreur récupération utilisateur:', error)
      setUserEmail('')
    } else {
      setUserEmail(data?.user?.email || '')
    }
  }

    getUserEmail()

    channel.subscribe('message', (msg) => {
      setMessages((prev) => [...prev, msg.data])
    })

    return () => {
      channel.unsubscribe('message')
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (input.trim() === '') return

    const message = {
      sender: userEmail || 'Anonyme',
      content: input.trim(),
      timestamp: Date.now(),
    }

    channel.publish('message', message)
    setInput('')
  }

  return (
    <div style={styles.outer}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>💬</div>
        <div style={styles.channelSelected}># général</div>
      </div>
      <div style={styles.chatContainer}>
        <div style={styles.header}>
          <span style={styles.headerTitle}># général</span>
        </div>
        <div style={styles.messages}>
          {messages.map((msg, idx) => {
            const isMine = msg.sender === userEmail
            return (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  background: isMine ? '#5865F2' : '#36393f',
                  color: isMine ? '#fff' : '#dbdee1',
                  borderTopLeftRadius: isMine ? 12 : 4,
                  borderTopRightRadius: isMine ? 4 : 12,
                }}
              >
                <div style={styles.sender}>
                  {msg.sender}
                </div>
                <div>{msg.content}</div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
        <div style={styles.inputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton message..."
            style={styles.input}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
          />
          <button onClick={sendMessage} style={styles.button}>Envoyer</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  outer: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #23272A 0%, #5865F2 100%)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  sidebar: {
    width: 80,
    background: '#23272A',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    borderRight: '1px solid #23272A',
  },
  logo: {
    fontSize: 32,
    marginBottom: 32,
    color: '#fff',
  },
  channelSelected: {
    background: '#36393f',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 8,
    cursor: 'pointer',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#36393f',
    borderRadius: 12,
    margin: 32,
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    minWidth: 0,
  },
  header: {
    background: '#2f3136',
    padding: '18px 24px',
    borderBottom: '1px solid #23272A',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 1,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 24px 12px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    background: '#36393f',
  },
  message: {
    padding: '12px 18px',
    borderRadius: 12,
    maxWidth: '70%',
    marginBottom: 2,
    fontSize: 15,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    wordBreak: 'break-word',
    transition: 'background 0.2s',
  },
  sender: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
    color: '#b9bbbe',
  },
  inputContainer: {
    display: 'flex',
    gap: 10,
    padding: '18px 24px',
    background: '#2f3136',
    borderTop: '1px solid #23272A',
  },
  input: {
    flex: 1,
    padding: '12px 14px',
    borderRadius: 6,
    border: 'none',
    background: '#202225',
    color: '#fff',
    fontSize: 16,
    outline: 'none',
    fontFamily: 'Segoe UI, sans-serif',
  },
  button: {
    padding: '12px 18px',
    borderRadius: 6,
    border: 'none',
    background: '#5865F2',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    fontFamily: 'Segoe UI, sans-serif',
    transition: 'background 0.2s',
  },
}