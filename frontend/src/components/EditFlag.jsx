import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditFlag() {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [flagName, setFlagName] = useState('')
    const [flagValue, setFlagValue] = useState(false)
    const [originalFlag, setOriginalFlag] = useState(null)

    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        fetchFlag()
    }, [id])

    const getAuthHeader = () => {
        const token = localStorage.getItem('token')
        return { headers: { Authorization: `Bearer ${token}` } }
    }

    const fetchFlag = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/feature-flags/${id}`, getAuthHeader())
            setOriginalFlag(response.data)
            setFlagName(response.data.name)
            setFlagValue(response.data.value)
        } catch (error) {
            setError('Could not fetch flag details')
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8080/api/feature-flags/${id}`, {
                id: originalFlag.id,
                name: flagName,
                value: flagValue
            }, getAuthHeader())
            alert('Flag updated successfully!')
            navigate('/dashboard')
        } catch (error) {
            alert("You don't have permission to update this flag")
        }
    }

    const handleDelete = async () => {
        if (deleteConfirmation !== 'delete') {
            alert('Please type "delete" to confirm.')
            return
        }
        try {
            await axios.delete(`http://localhost:8080/api/feature-flags/${id}`, getAuthHeader())
            navigate('/dashboard')
        } catch (error) {
            alert("You don't have permission to delete this flag")
        }
    }

    if (!originalFlag) return <div style={{ padding: '2rem' }}>Loading...</div>

    return (
        <div className="edit-container">
            <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ marginBottom: '1rem' }}>
                ← Back to Dashboard
            </button>
            
            <form onSubmit={handleUpdate} className="edit-card">
                <h2 style={{ marginTop: 0 }}>Edit Feature Flag</h2>
                
                <div className="form-group">
                    <label>Flag Name</label>
                    <input 
                        type="text" 
                        value={flagName}
                        onChange={(e) => setFlagName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label>Flag Value</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={flagValue} 
                                onChange={() => setFlagValue(!flagValue)}
                            />
                            <span className="slider"></span>
                        </label>
                        <span style={{ fontWeight: 'bold' }}>{flagValue ? 'TRUE' : 'FALSE'}</span>
                    </div>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                    Save Changes
                </button>
            </form>

            <div className="danger-zone">
                <h3 style={{ color: '#ff4444', marginTop: 0 }}>Danger Zone</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Deleting a feature flag is permanent and cannot be undone. 
                    Please type <strong>delete</strong> below to confirm.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <input 
                        type="text" 
                        placeholder='Type "delete" to confirm'
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        style={{ flex: 1, borderColor: '#ff4444' }}
                    />
                    <button 
                        onClick={handleDelete} 
                        className="btn-danger"
                        disabled={deleteConfirmation !== 'delete'}
                        style={{ opacity: deleteConfirmation === 'delete' ? 1 : 0.5, cursor: deleteConfirmation === 'delete' ? 'pointer' : 'not-allowed' }}
                    >
                        Delete Flag
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditFlag
