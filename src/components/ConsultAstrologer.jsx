import React from 'react'
import './ConsultAstrologer.css'

const consultTypes = [
  {
    bg: '/assets/card-bg-1.png',       // ← your background image
    icon: '/assets/heart.png',   // ← your icon
    title: 'Love & Relationship',
  },
  {
    bg: '/assets/card-bg-1.png',
    icon: '/assets/marriage.png',
    title: 'Marriage & Kundli',
  },
  {
    bg: '/assets/card-bg-1.png',
    icon: '/assets/career.png',
    title: 'Career',
  },
  {
    bg: '/assets/card-bg-1.png',
    icon: '/assets/women.png',
    title: 'Women Astrologer',
  },
  {
    bg: '/assets/card-bg-1.png',
    icon: '/assets/business.png',
    title: 'Business',
  },
]

export default function ConsultAstrologer() {
  return (
    <section className="consult-astrologer section">
      <div className="container">
        <h2 className="section-title">Consult The Right Astrologer For You</h2>
        <div className="consult-grid">
          {consultTypes.map(({ bg, icon, title }, i) => (
            <div
              key={i}
              className="consult-card"
              style={{ backgroundImage: `url(${bg})` }}
            >
              <div className="consult-icon">
                <img src={icon} alt={title} />
              </div>
              <h3 className="tittlee">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
