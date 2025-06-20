import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../Header'
import TopAstrologers from '../TopAstrologers'
import Blogs from '../Blog'
import Footer from '../Footer'
import './AriesPage.css'

// Dummy data for illustration
const REMEDIES = [
  { name: 'Gemstone', icon: '💎', path: '/remedy/gemstone' },
  { name: 'Rudraksha', icon: '📿', path: '/remedy/rudraksha' },
  { name: 'Yantra',    icon: '🕉️', path: '/remedy/yantra' },
  { name: 'Mantra',    icon: '🔊', path: '/remedy/mantra' },
  { name: 'Pujaa',      icon: '🪔', path: '/remedy/puja' },
]

export default function SignDetailPage() {
  const { sign } = useParams()                 // "aries", "taurus", etc.
  const title = sign.charAt(0).toUpperCase() + sign.slice(1)

  return (
    <>
      <Header />

      <div className="sign-detail-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt;{' '}
          <Link to="/horoscope">Horoscope</Link> &gt;{' '}
          <strong>{title}</strong>
        </nav>

        {/* Top Panel */}
        <section className="detail-top">
          <div className="image-and-title">
            <img
              src={`/assets/${sign}.png`}
              alt={`${title} Horoscope`}
              className="detail-banner"
            />
            <h2>{title} Horoscope</h2>
          </div>

          {/* variant cards */}
          <div className="variant-grid">
            {[
              `${title}`,
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
                to={`/horoscope/${sign}/${label.toLowerCase().replace(/\s+/g, '-')}`}
                className="variant-card"
              >
                <div className="icon-placeholder">🔸</div>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Calendar Buttons */}
        <div className="calendar-buttons detail-calendar">
          {['Yesterday','Tomorrow','Weekly','Monthly','Yearly'].map((label, i) => (
            <button key={i} className="cal-btn">
              {label === 'Yesterday' ? '← ' : ''}
              {label}
              {label !== 'Yesterday' && ' →'}
            </button>
          ))}
        </div>

        {/* Horoscope Text + stats */}
        <section className="today-detail">
          <h3>{title} Today Horoscope <span>(Thursday, June 19, 2025)</span></h3>
          <p>
            Dear {title}, Astroyogi astrologers explain that the positioning of the Moon in Pisces might be a good time to learn to keep your anger in check in order to avoid disagreements at home. This is a crucial time to think before speaking as words once said cannot be taken back. Your behavioral change can positively impact the atmosphere of your home. Being easy going is key at this point in time. It is important to remember that nobody is perfect. Show love and kindness and you will get the same in return. 7 pm to 9 pm is your lucky time. Wear green to block negativity.ctual text here]
          </p>
          <div className="stats-grid">
            <div>
              <strong>Lucky Number</strong><span>6</span>
            </div>
            <div>
              <strong>Mood of the Day</strong><span>Focused</span>
            </div>
            <div>
              <strong>Overall Positivity</strong><span>90%</span>
            </div>
            <div>
              <strong>Lucky Color</strong><span>Purple</span>
            </div>
          </div>
          <p className="remedy">
            <strong>Remedy:</strong> Try something new
          </p>
        </section>

        {/* General remedies */}
        <section className="general-remedies">
          <h4>General Remedies</h4>
          <div className="remedy-icons">
            {REMEDIES.map(r => (
              <Link to={r.path} key={r.name} className="remedy-card">
                <div className="remedy-icon">{r.icon}</div>
                <span>{r.name}</span>
              </Link>
            ))}
          </div>
          <div className="remedy-links">
            <Link to="/horoscope/aries">Aries Team →</Link>
            <Link to="/horoscope/aries/celebrity">Aries Celebrity →</Link>
            <Link to="/horoscope/aries/season">Aries Season →</Link>
          </div>
        </section>

        {/* Long text */}
        <section className="detail-text">
          <p>
           Curious about how the stars influenced your day? Your horoscope yesterday, Aries, reveals the cosmic energies that shaped your emotions, decisions, and interactions. Understanding your yesterday's Aries horoscope can help you analyze patterns, reflect on missed opportunities, and embrace valuable lessons for a better tomorrow. What Did the Stars Say for Aries Yesterday? Your ruling planet, Mars, constantly drives you with passion and energy. But did the planetary alignments support or challenge your ambitions yesterday? Whether it was a lucky day or one filled with obstacles, your horoscope yesterday, Aries, holds the key to understanding it all. Why Check Your Aries Yesterday Horoscope? Self-Reflection: Gain insight into how planetary movements influenced your mood and actions. Missed Opportunities: Identify moments you could have leveraged better. Better Decision-Making: Learn from yesterday's events to make more informed choices today. Get Your Accurate Aries Yesterday Horoscope Stay ahead by understanding the past. Check your horoscope yesterday, Aries, and uncover what the universe had in store for you. Keep evolving, learning, and growing with astrological insights designed to empower you!pe yesterday, {title}, reveals…
          </p>
        </section>

        {/* Import your existing components */}
        <TopAstrologers />
        <Blogs />
      </div>

      <Footer />
    </>
  )
}
