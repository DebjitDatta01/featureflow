import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {
    const [flags, setFlags] = useState([])
    const [newFlagName, setNewFlagName] = useState('')
    const [firstName, setFirstName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Decode token to get user first name
        const token = localStorage.getItem('token')
        if (token) {
            try {
                // JWT payload is the second part (index 1)
                const payload = JSON.parse(atob(token.split('.')[1]))
                setFirstName(payload.firstName) // Extract firstName from claims
            } catch (e) {
                console.error("Invalid token")
            }
        }
        fetchFlags()
    }, [])

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return { headers: { Authorization: `Bearer ${token}` } }
    }

    const fetchFlags = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feature-flags', getAuthHeader())
            setFlags(response.data)
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/login')
            }
        }
    }

    const createFlag = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8080/api/feature-flags', {
                name: newFlagName,
                value: false
            }, getAuthHeader())
            setNewFlagName('')
            fetchFlags()
        } catch (error) {
            console.error('Error creating flag', error)
        }
    }

    const toggleFlag = async (flag) => {
        try {
            await axios.put(`http://localhost:8080/api/feature-flags/${flag.id}`, {
                id: flag.id,
                name: flag.name,
                value: !flag.value
            }, getAuthHeader())
            fetchFlags()
        } catch (error) {
            alert("You don't have permission to modify this flag")
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <div className="dashboard-header">
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Dashboard</h1>
                    <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>
                        Welcome, <strong>{firstName}</strong>
                    </p>
                </div>
                <button onClick={logout} className="btn-secondary">
                    Logout
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-content">
                
                {/* Left Column: Create Section */}
                <div className="create-section">
                    <h3 style={{ marginTop: 0 }}>Create New Flag</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                        Add a new feature toggle to your project.
                    </p>
                    <form onSubmit={createFlag} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Flag Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. new-checkout-flow" 
                                value={newFlagName}
                                onChange={(e) => setNewFlagName(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            + Create Feature Flag
                        </button>
                    </form>
                </div>

                {/* Right Column: List Section */}
                <div className="list-section">
                    <h3 style={{ margin: '0 0 1rem 0' }}>Your Feature Flags ({flags.length})</h3>
                    
                    {flags.length === 0 ? (
                        <div style={{ 
                            padding: '3rem', 
                            textAlign: 'center', 
                            background: 'var(--card-bg)', 
                            borderRadius: '10px',
                            border: '1px dashed var(--input-border)',
                            opacity: 0.7
                        }}>
                            No feature flags found. Create one to get started!
                        </div>
                    ) : (
                        flags.map(flag => (
                            <div key={flag.id} className="flag-item">
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{flag.name}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.8, width: '50px', textAlign: 'right', fontWeight: 'bold' }}>
                                            {flag.value ? 'TRUE' : 'FALSE'}
                                        </span>
                                        <label className="toggle-switch">
                                            <input 
                                                type="checkbox" 
                                                checked={flag.value} 
                                                onChange={() => toggleFlag(flag)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <Link to={`/edit/${flag.id}`}>
                                        <button className="btn-secondary" style={{ padding: '0.4em 1em' }}>
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
