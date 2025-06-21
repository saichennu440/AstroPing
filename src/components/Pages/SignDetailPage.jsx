// src/components/pages/SignDetailPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Header from '../Header'
import TopAstrologers from '../TopAstrologers'
import Blogs from '../Blog'
import Footer from '../Footer'
import './SignDetailPage.css'

const API_BASE = import.meta.env.VITE_API_BASE

export default function SignDetailPage() {
  const { sign, day: dayParam } = useParams()
  // Normalize Day
  const day = dayParam
    ? dayParam.charAt(0).toUpperCase() + dayParam.slice(1)
    : 'Today'
  // Capitalize sign
  const title = sign.charAt(0).toUpperCase() + sign.slice(1)
  const navigate = useNavigate()

  const [horoscope, setHoroscope] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    axios
      .get(`${API_BASE}/horoscope`, {
        params: { sign: title, day }
      })
      .then(res => {
        if (res.data.success && res.data.horoscopes?.length) {
          setHoroscope(res.data.horoscopes[0])
        } else {
          setError('No horoscope found for this sign/day.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load horoscope.')
      })
      .finally(() => setLoading(false))
  }, [title, day])

  const handleDayChange = newDay => {
    navigate(`/horoscope/${sign}/${newDay.toLowerCase()}`)
  }

  return (
    <>
      <Header />

      <div className="sign-detail-page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt;{' '}
          <Link to="/horoscope">Horoscope</Link> &gt;{' '}
          <strong>{title}</strong>
        </nav>

        {loading && (
         <div className="spinner" />
        )}
        {error && <p className="error">{error}</p>}

        {horoscope && (
          <>
            {/* Top panel */}
            <section className="detail-top">
              <div className="image-and-title">
                <img
                  src={`/assets/${sign.toLowerCase()}.png`}
                  alt={`${title} Horoscope`}
                  className="detail-banner"
                />
                <h2>{title} Horoscope</h2>
              </div>
              <div className="variant-grid">
                {[
                  title,
                  `${title} Personality`,
                  `${title} Love`,
                  `${title} Career`,
                  `${title} Season`,
                  `${title} Man`,
                  `${title} Women`,
                  `${title} Traits`,
                  `${title} Celebrity`,
                  `${title} Weekly`
                ].map((label, i) => (
                  <Link
                    key={i}
                    to={`/horoscope/${sign}/${day.toLowerCase()}/${label
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    className="variant-card"
                  >
                    <div className="icon-placeholder">🔸</div>
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Calendar Buttons */}
            <div className="detail-calendar">
              {[
                'Yesterday',
                'Today',
                'Tomorrow',
                'Weekly',
                'Monthly',
                'Yearly'
              ].map((d, i) => (
                <button
                  key={i}
                  className={`cal-btn${d === day ? ' active' : ''}`}
                  onClick={() => handleDayChange(d)}
                >
                  {d === 'Yesterday' ? '← ' : ''}
                  {d}
                  {d !== 'Yesterday' ? ' →' : ''}
                </button>
              ))}
            </div>

            {/* Horoscope text + stats */}
            <section className="today-detail">
              <h3>
                {title} {day} Horoscope{' '}
                <span>
                  (
                  {new Date(horoscope.updatedAt).toLocaleDateString(
                    undefined,
                    {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
                  )
                </span>
              </h3>
              <p>{horoscope.horoscope}</p>

              <div className="stats-grid">
                {horoscope.categories.map(cat => (
                  <div key={cat._id}>
                    <strong>
                      {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </strong>
                    <span>{cat.score}%</span>
                  </div>
                ))}
              </div>

              <p className="remedy">
                <strong>Lucky Color:</strong>{' '}
                <span
                  className="color-swatch"
                  style={{
                    background: horoscope.luckycolorCode || '#eee'
                  }}
                />{' '}
                {horoscope.luckyColor || '—'}
              </p>
              <p className="remedy">
                <strong>Lucky Numbers:</strong>{' '}
                {Array.isArray(horoscope.luckyNumbers) &&
                horoscope.luckyNumbers.length
                  ? horoscope.luckyNumbers.join(', ')
                  : '—'}
              </p>
              <p className="remedy">
                <strong>Total Score:</strong>{' '}
                {horoscope.totalScore != null
                  ? `${horoscope.totalScore}%`
                  : '—'}
              </p>
            </section>

            {/* General remedies */}
            <section className="general-remedies">
              <h4>General Remedies</h4>
              <div className="remedy-icons">
                {[
                  { icon: '💎', name: 'Gemstone' },
                  { icon: '📿', name: 'Rudraksha' },
                  { icon: '🕉️', name: 'Yantra' },
                  { icon: '🔊', name: 'Mantra' },
                  { icon: '🪔', name: ' Puja' }
                ].map(r => (
                  <Link to="#" key={r.name} className="remedy-card">
                    <div className="remedy-icon">{r.icon}</div>
                    <span>{r.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="detail-text">
              <p>
                Curious about how the stars influenced your{' '}
                {day.toLowerCase()}, {title}, reveals…
              </p>
            </section>

            <TopAstrologers />
            <Blogs />
          </>
        )}
      </div>

      <Footer />
    </>
  )
}
