// src/components/ProfileModal.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE

export default function ProfileModal({ isOpen, onClose, user, onUpdate }) {
  console.log('ProfileModal isOpen:', isOpen);

  const [form, setForm] = useState({
    userName: '',
    dob: '',
    gender: '',
    place_of_birth: '',
    time_of_birth: '',
    address1: '',
    address2: '',
    pincode: '',
    zodiac_sign: '',
    known_languages: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Prefill form when user data changes
  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName || '',
        dob: user.dob ? user.dob.slice(0, 10) : '',
        gender: user.gender || '',
        place_of_birth: user.place_of_birth || '',
        time_of_birth: user.time_of_birth || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        pincode: user.pincode || '',
        zodiac_sign: user.zodiac_sign || '',
        known_languages: user.known_languages || '',
      })
    }
  }, [user])

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API_BASE}/api/user/update-user`, form)
      onUpdate()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose} />
      <div className="content profile-content">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <h2>My Profile</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'userName', type: 'text' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Gender', name: 'gender', type: 'text' },
            { label: 'Place of Birth', name: 'place_of_birth', type: 'text' },
            { label: 'Time of Birth', name: 'time_of_birth', type: 'time' },
            { label: 'Address Line 1', name: 'address1', type: 'text' },
            { label: 'Address Line 2', name: 'address2', type: 'text' },
            { label: 'Pincode', name: 'pincode', type: 'text' },
            { label: 'Zodiac Sign', name: 'zodiac_sign', type: 'text' },
            { label: 'Known Languages', name: 'known_languages', type: 'text' },
          ].map(field => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.name === 'dob'}
              />
            </div>
          ))}
          <button type="submit" className="action-btn" disabled={loading}>
            {loading ? 'Updating…' : 'Update'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }
        .content {
          position: relative;
          background: #fff;
          border-radius: 8px;
          width: 600px;
          max-width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 2001;
        }
        .close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 4px;
          color: #333;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .action-btn {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          background: #ff6b35;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error-msg {
          color: red;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .content {
            width: 95%;
            max-height: 90vh;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
}
