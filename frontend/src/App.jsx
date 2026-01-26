import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import EditFlag from './components/EditFlag'
import './App.css'

function Home() {
  return (
    <div className="home-container">
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>FeatureFlow</h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', marginBottom: '3rem' }}>
        The modern way to manage feature flags. Secure, fast, and developer-friendly.
      </p>
      <div className="card" style={{ display: 'flex', gap: '1.5rem', background: 'transparent', padding: 0 }}>
        <Link to="/login">
          <button className="btn-primary" style={{ padding: '0.8em 2em', fontSize: '1.1rem' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ padding: '0.8em 2em', fontSize: '1.1rem' }}>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <div className="top-nav">
        <button onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--input-border)' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditFlag />} />
      </Routes>
    </>
  )
}

export default App
