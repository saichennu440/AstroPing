// src/components/SignInModal.jsx
import { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASEE
const DOMESTIC_CODE = '+91'
const OTP_LENGTH = 4  // adjust if your backend changes

export default function SignInModal({ isOpen, onClose, onLogin }) {
  const [step, setStep] = useState(1)            // 1=phone entry, 2=OTP entry
  const [countryCode, setCountryCode] = useState(DOMESTIC_CODE)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const otpRefs = useRef([])

  // disable/enable body scroll synchronously
  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // auto-focus first OTP box when entering step 2, synchronously
  useLayoutEffect(() => {
    if (step === 2) {
      otpRefs.current[0]?.focus()
    }
  }, [step])

  const sendEndpoint =
    countryCode === DOMESTIC_CODE
      ? '/api/user/send-otp'
      : '/api/user/send-otp-international'

  const verifyEndpoint =
    countryCode === DOMESTIC_CODE
      ? '/api/user/otp-verify'
      : '/api/user/verify-inernational-OTP'

  const handleSendOtp = async e => {
    e.preventDefault()
    setError('')
    if (phone.length < 4) return
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_BASE}${sendEndpoint}`,
        { phone_number: phone, countryCode }
      )
      if (res.status >= 200 && res.status < 300) {
        setStep(2)
        setOtp(Array(OTP_LENGTH).fill(''))
      } else {
        setError(res.data.message || 'Failed to send OTP')
      }
    } catch (err) {
      console.error(err)
      setError('Error sending OTP')
    }
    setLoading(false)
  }

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '')
    if (!val) return
    const newOtp = [...otp]
    newOtp[idx] = val.slice(-1)
    setOtp(newOtp)
    if (idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]
      if (newOtp[idx]) {
        newOtp[idx] = ''
        setOtp(newOtp)
      } else if (idx > 0) {
        otpRefs.current[idx - 1]?.focus()
        newOtp[idx - 1] = ''
        setOtp(newOtp)
      }
    }
  }

  const handleVerify = async () => {
    setError('')
    const otpCode = otp.join('')
    if (otpCode.length < OTP_LENGTH) return
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_BASE}${verifyEndpoint}`,
        { phone_number: phone, countryCode, otp: otpCode }
      )
      // Expecting { success: true, token: 'JWT...', user: {...} }
      if (res.status >= 200 && res.status < 300 && res.data.token) {
        onLogin(res.data.token)   // pass JWT back to App
        onClose()
      } else {
        setError(res.data.message || 'Invalid OTP')
      }
    } catch (err) {
      console.error(err)
      setError('OTP verification failed')
    }
    setLoading(false)
  }

  const handleResend = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_BASE}${sendEndpoint}`,
        { phone_number: phone, countryCode }
      )
      if (!(res.status >= 200 && res.status < 300)) {
        setError(res.data.message || 'Failed to resend OTP')
      }
    } catch {
      setError('Error resending OTP')
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="overlay" onClick={onClose} />
      <div className="content">
        <button className="close" onClick={onClose}>&times;</button>
        <div className="image-panel">
          <img src="/assets/image2.png" alt="" />
        </div>
        <div className="form-panel">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="step-form">
              <h2>Welcome to Astroyogi</h2>
              <p>Enter your mobile number to Login/Signup</p>
              <div className="input-group">
                <select
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button
                type="submit"
                className="action-btn"
                disabled={phone.length < 4 || loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <div className="step-form">
              <h2>Welcome to Astroyogi</h2>
              <p>OTP sent to {countryCode} {phone}</p>
              <div className="otp-group">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={e => handleOtpChange(e, idx)}
                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                    ref={el => (otpRefs.current[idx] = el)}
                  />
                ))}
              </div>
              {error && <p className="error-msg">{error}</p>}
              <div className="resend-edit">
                <button onClick={() => setStep(1)} disabled={loading}>
                  Edit Number
                </button>
                <button onClick={handleResend} disabled={loading}>
                  {loading ? '...' : 'Resend OTP'}
                </button>
              </div>
              <button
                className="action-btn"
                onClick={handleVerify}
                disabled={otp.some(d => d === '') || loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}
        </div>
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
          background: rgba(0,0,0,0.5);
        }
        .content {
          position: relative;
          background: #fff;
          display: flex;
          width: 800px;
          max-width: 90%;
          border-radius: 8px;
          overflow: hidden;
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
        .image-panel {
          flex: 1;
          min-width: 300px;
        }
        .image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .form-panel {
          flex: 1;
          padding: 40px;
        }
        .step-form h2 {
          margin: 0 0 8px;
        }
        .step-form p {
          margin: 0 0 24px;
          color: #555;
        }
        .input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }
        .input-group select,
        .input-group input {
          flex: 1;
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .action-btn {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          background: #FF6B35;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .otp-group {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 16px;
        }
        .otp-group input {
          width: 40px;
          height: 50px;
          text-align: center;
          font-size: 1.2rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .resend-edit {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .resend-edit button {
          background: none;
          border: none;
          color: #FF6B35;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .content {
            flex-direction: column;
            max-height: 100vh;
            overflow-y: auto;
          }
          .image-panel {
            display: none;
          }
          .form-panel {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}

SignInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
}
