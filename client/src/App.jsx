import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login } from './components/login'
import { Home } from './Home'
import SignUp from './components/SignUp'
import AppMain from './AppMain' // 🔧 Ajout du composant pour la route /app

function App() {
  const [username, setUsername] = useState("")

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={<AppMain />} /> {/* ✅ Route ajoutée ici */}
      <Route
        path="/"
        element={
          username ? (
            <Home username={username} />
          ) : (
            <Login onSubmit={setUsername} />
          )
        }
      />
    </Routes>
  )
}

export default App