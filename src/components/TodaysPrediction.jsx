// src/components/TodaysPrediction/TodaysPrediction.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './TodaysPrediction.css'

import aries from '/assets/ariess.png'
import taurus from '/assets/Group 84.png'
import gemini from '/assets/Group 85.png'
import cancer from '/assets/Group 87.png'
import leo from '/assets/Leo Horoscope.png'
import virgo from '/assets/Virgo Horoscope.png'
import libra from '/assets/Scorpio Horoscope.png'
import scorpio from '/assets/Virgo Horoscope.png'
import sagittarius from '/assets/Leo Horoscope.png'
import capricorn from '/assets/Capricorn Horoscope.png'
import aquarius from '/assets/Aquarius Horoscope.png'
import pisces from '/assets/piscess.png'

const predictions = [
  { image: aries,       sign: 'Aries' },
  { image: taurus,      sign: 'Taurus' },
  { image: gemini,      sign: 'Gemini' },
  { image: cancer,      sign: 'Cancer' },
  { image: leo,         sign: 'Leo' },
  { image: virgo,       sign: 'Virgo' },
  { image: libra,       sign: 'Libra' },
  { image: scorpio,     sign: 'Scorpio' },
  { image: sagittarius, sign: 'Sagittarius' },
  { image: capricorn,   sign: 'Capricorn' },
  { image: aquarius,    sign: 'Aquarius' },
  { image: pisces,      sign: 'Pisces' },
]

export default function TodaysPrediction() {
  return (
    <section className="todays-prediction section">
      <div className="container">
        <h2 className="section-title">Today's Astrology Prediction</h2>
        <div className="predictions-grid">
          {predictions.map(({ image, sign }) => {
            const slug = sign.toLowerCase()
            return (
              <Link
                key={sign}
                to={`/horoscope/${slug}`}
                className="prediction-item"
              >
                <div className="prediction-icon">
                  <img src={image} alt={sign} />
                </div>
                <p className="prediction-label">{sign}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
