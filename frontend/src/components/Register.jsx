import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8081/api/v1/auth/register', formData)
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError('Registration failed. Please try again.')
        }
    }

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'block', marginBottom: '1rem', textDecoration: 'none', color: 'var(--text-color)', opacity: 0.8 }}>
                ← Back to Home
            </Link>
            <div className="form-container">
                <h2 style={{ marginTop: 0 }}>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="firstname"
                            value={formData.firstname} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="lastname"
                            value={formData.lastname} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}}>Register</button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ opacity: 0.7 }}>Already have an account? </span>
                    <Link to="/login" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 500 }}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
