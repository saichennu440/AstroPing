// src/components/HoroscopePage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TopAstrologers from '../components/TopAstrologers'
import Blogs from '../components/Blog'
import { useNavigate } from 'react-router-dom';
import './HoroscopePage.css'

/**
 * Map each sign to its actual filename in public/assets/
 */
const ZODIAC_IMAGES = {
  Aries:     '/assets/ariess.png',
  Taurus:    '/assets/Group 87.png',
  Gemini:    '/assets/Group 84.png',
  Cancer:    '/assets/Group 85.png',
  Leo:       '/assets/Leo Horoscope.png',
  Virgo:     '/assets/Virgo Horoscope.png',
  Scorpio:   '/assets/Scorpio Horoscope.png',
 // Sagittarius:'/assets/group 73.png',
  Capricorn: '/assets/Capricorn Horoscope.png',
  Aquarius:  '/assets/Aquarius Horoscope.png',
  Pisces:    '/assets/piscess.png',
}

export default function HoroscopePage({ user, onSignInClick, onProfileClick, onLogout }) {
  const signs = Object.keys(ZODIAC_IMAGES)

  return (
    <>
      <Header 
         user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />

      <div className="breadcrumb">
        Home &gt; <strong>Horoscope</strong>
      </div>

      <section className="main-horoscope-section">
        <div className="left-panel">
            <div className="hero-horoscope-image">
    <img
      src="/assets/horoscope-banner.png"    // ← put your actual filename here
      alt="Horoscope Banner"
    />
  </div>
          <h2>Horoscope</h2>
          <p>
            Get your free horoscope and online horoscope predictions for all zodiac signs. Explore horoscope dates,
            daily horoscopes, and find out what is a horoscope sign. Check your horoscope de hoy and uncover your destiny!
          </p>
           <div className="calendar-buttons">
    <button className="cal-btn"><span className="arrow">←</span> Yesterday</button>
    <button className="cal-btn">Tomorrow <span className="arrow">→</span></button>
    <button className="cal-btn">📆 Weekly <span className="arrow">→</span></button>
    <button className="cal-btn">📅 Monthly <span className="arrow">→</span></button>
    <button className="cal-btn">📆 Yearly <span className="arrow">→</span></button>
  </div>
        </div>

        <div className="right-panel">
          <div className="zodiac-grid">
            {signs.map(sign => {
              const slug = sign.toLowerCase()
              return (
                <Link
                  key={sign}
                  to={`/horoscope/${slug}`}
                  className={`zodiac-card${sign === 'Leo' ? ' active' : ''}`}
                >
                  <img
                    src={ZODIAC_IMAGES[sign]}
                    alt={sign}
                    className="zodiac-icon"
                  />
                  <p>{sign}</p>
                  <span>06/3–09/3</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="subsection">
        <h3>More Horoscopes for You</h3>
        <div className="icon-row">
          <div>🧑 Career Horoscope</div>
          <div>❤️ Love Horoscope</div>
          <div>💰 Finance Horoscope</div>
          <div>💪 Health Horoscope</div>
          <div>🔮 Horoscope</div>
        </div>
      </section>

      <section className="daily-movement">
        <div className="movement-header">
          <h4>Daily planetary movements</h4>
          <span>(Wednesday, June 18, 2025)</span>
        </div>
        <p>
          Should you get embroiled in a controversy today, you can trust yourself to tactfully manage it and also get out of it without hurting anyone. And who should you thank for it? the Aquarius Moon. As Moon is in Aquarius, it gifts us the gift of the gab, urging us to use communication as a way to reach out to others and perhaps even make up for mistakes that had been made by us in the past. May be you hadn't been at your very best with someone in the past and had inadvertently hurt him or her. Feeling guilty about it is not going to take you anywhere, so if you really feel responsible it would be best to own your mistakes and mend your broken relationship. Every planetary event gifts us something special but the onus is on us is to use these gifts to make our life better or worse. The gift of the Aquarius Moon is heightened creativity. You know very well how you can use these gifts. Don't you? Astroyogi astrologers also predict this planetary movement may also leave you feeling a little confused so refrain from taking nay major decisions at this point of time.
        </p>
      </section>

      <section className="info-block">
        <h3>What is a Horoscope?</h3>
        <p>
        A horoscope is an astrological chart created based on the positions of the Sun, Moon, and other celestial bodies at the time of a person's birth. It provides insights into an individual's personality, likes, dislikes, thoughts, love life, career, health, and more. Horoscopes offer a glimpse into future events and can be used to make informed decisions.
Horoscopic traditions are primarily associated with the Western Zodiac. Vedic Astrology, on the other hand, uses a different system with the Kundali (birth chart). While some debate the scientific validity of horoscopes, their accuracy in reflecting individual traits continues to intrigue many.
By reading your daily horoscope, weekly horoscope, monthly horoscope, or yearly horoscope, you can gain valuable insights into various aspects of your life. Understanding the positions of the planets and their influence on your zodiac sign can help you navigate challenges and opportunities. Whether you're interested in your love life, career prospects, financial situation, or health, your horoscope can provide guidance and support.
Horoscopes are sometimes referred to as figura charts, astrological graphs, star charts, or natal charts. Regardless of the name, the purpose remains the same: to offer astrological insights and predictions based on the positions of celestial bodies.
        </p>
        <p>
          <strong>Read also:</strong>{' '}
          <Link to="/horoscope/yesterday">Yesterday Horoscope</Link> and{' '}
          <Link to="/horoscope/tomorrow">Tomorrow Horoscope , Daily Horoscope</Link>
        </p>
      </section>

      <TopAstrologers />

      <section className="faq-section">
        <h4>Frequently Asked Questions (FAQs)</h4>
        {Array.from({ length: 5 }).map((_, i) => (
          <details key={i} className="faq-item">
            <summary>How accurate are horoscope predictions?</summary>
            <p>Our astrologers are trained experts using both Vedic and modern astrology techniques...</p>
          </details>
        ))}
      </section>

      <Blogs />
      <Footer />
    </>
  )
}
