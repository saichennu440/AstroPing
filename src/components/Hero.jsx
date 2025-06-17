import React from 'react';
import './Hero.css';
import bgShape from '../assets/image.png';
import astrologer from '../assets/image2.png';
import zodiac from '../assets/image 12.png';    // ← your new wheel asset
import wheelBg from '../assets/image 11.png';
const ACTIONS = [
  { icon: '📞', label: 'Talk' },
  { icon: '💬', label: 'Chat' },
  { icon: '🔮', label: 'Horoscope' },
  { icon: '📜', label: 'Kundli' },
];

export default function Hero() {
  return (
    <section className="hero">
      {/* full-bleed background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgShape})` }}
      />

      {/* zodiac wheel on the left */}
      <div
        className="hero-wheel"
        style={{ backgroundImage: `url(${zodiac})` }}
      />

      {/* main headline + image */}
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Know about your life?</h1>
          <p className="hero-subtitle">Get experts help!</p>
          <button className="btn hero-btn">First chat Free</button>
        </div>
        <div className="hero-image">          {/* background wheel behind portrait */}
          <div
            className="astro-wheel-bg"
            style={{ backgroundImage: `url(${wheelBg})` }}
          />
          <img src={astrologer} alt="Astrologer" className="astro-portrait" />
        </div>
      </div>

      {/* the white “panel” that holds the action cards */}
      <div className="hero-actions-wrapper">
        <div className="container hero-actions">
          {ACTIONS.map(({ icon, label }) => (
            <button key={label} className="action-card">
              <span className="action-icon-wrapper">{icon}</span>
              <span className="action-label">{label}</span>
              <span className="action-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
