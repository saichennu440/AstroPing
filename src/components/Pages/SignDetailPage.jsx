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

export default function SignDetailPage({
  user,
  onSignInClick,
  onProfileClick,
  onLogout
}) {
  const { sign, day: dayParam } = useParams()
  const day = dayParam
    ? dayParam.charAt(0).toUpperCase() + dayParam.slice(1)
    : 'Today'
  const title = sign.charAt(0).toUpperCase() + sign.slice(1)
  const navigate = useNavigate()

  const [horoscope, setHoroscope] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
   
    axios
      .get(`${API_BASE}/horoscope/get-horoscope`, {
        // fetch all signs for the given day
        // sign: title, day
      })
      .then(res => {
        const list = res.data.horoscopes
        if (!res.data.success || !Array.isArray(list)) {
          throw new Error('Invalid response')
        }
        // find the one matching our sign + day
        const found = list.find(
          h =>
            h.sign.toLowerCase() === title.toLowerCase() &&
            h.day.toLowerCase() === day.toLowerCase()
        )
        if (found) {
          setHoroscope(found)
        } else {
          setError(`No ${day} horoscope found for ${title}.`)
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load horoscope.')
      })
      .finally(() => setLoading(false))
  }, [title, day])

  const handleDayChange = newDay =>
    navigate(`/horoscope/${sign}/${newDay.toLowerCase()}`)

function getDateForDay(day) {
  const today = new Date()
  const map = {
    Yesterday: -1,
    Today: 0,
    Tomorrow: 1
  }
  const offset = map[day] ?? 0
  const resultDate = new Date(today.setDate(today.getDate() + offset))
  return resultDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
const variantCards = [
  { label: title, icon: '🔮' },
  { label: `${title} Personality`, icon: '🧠' },
  { label: `${title} Love`, icon: '❤️' },
  { label: `${title} Career`, icon: '💼' },
  { label: `${title} Season`, icon: '🍂' },
  { label: `${title} Man`, icon: '👨' },
  { label: `${title} Women`, icon: '👩' },
  { label: `${title} Traits`, icon: '📌' },
  { label: `${title} Celebrity`, icon: '🌟' },
  { label: `${title} Weekly`, icon: '📅' }
]


  return (
    <>
      <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />

      <div className="sign-detail-page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt;{' '}
          <Link to="/horoscope">Horoscope</Link> &gt;{' '}
          <strong>{title}</strong>
        </nav>

        {loading && <div className="spinner" />}
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
           {variantCards.map((item, i) => (
  <Link
    key={i}
    to={`/horoscope/${sign}/${day.toLowerCase()}/${item.label
      .toLowerCase()
      .replace(/\s+/g, '-')}`}
    className="variant-card"
  >
    <div className="icon-placeholder">{item.icon}</div>
    <span>{item.label}</span>
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
              <span>({getDateForDay(day)})</span>

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

              {/* <p className="remedy">
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
              </p> */}
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
                Curious about how the stars influenced your {day.toLowerCase()},{' '}
                {title}, reveals…
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
