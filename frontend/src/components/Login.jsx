import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8081/api/v1/auth/authenticate', {
                email,
                password
            })
            
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError('Invalid credentials')
        }
    }

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'block', marginBottom: '1rem', textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>
                ← Back to Home
            </Link>
            <div className="form-container">
                <h2 style={{ marginTop: 0 }}>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}}>Login</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ opacity: 0.7 }}>Don't have an account? </span>
                    <Link to="/register" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500 }}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
