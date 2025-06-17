import './TodaysPrediction.css'

const predictions = [
  { image: '/assets/aries.png',      sign: 'Aries' },
  { image: '/assets/Group 84.png',     sign: 'Taurus' },
  { image: '/assets/Group 85.png',     sign: 'Gemini' },
  { image: '/assets/Group 87.png',     sign: 'Cancer' },
  { image: '/assets/Leo Horoscope.png',        sign: 'Leo' },
  { image: '/assets/Pisces Horoscope.png',      sign: 'Virgo' },
  { image: '/assets/Scorpio Horoscope.png',      sign: 'Libra' },
  { image: '/assets/Virgo Horoscope.png',    sign: 'Scorpio' },
  { image: '/assets/Sagittarius Horoscope.png',sign: 'Sagittarius' },
  { image: '/assets/Capricorn Horoscope.png',  sign: 'Capricorn' },
  { image: '/assets/Aquarius Horoscope.png',   sign: 'Aquarius' },
  { image: '/assets/pisces.png',     sign: 'Pisces' }
]

export default function TodaysPrediction() {
  return (
    <section className="todays-prediction section">
      <div className="container">
        <h2 className="section-title">Today's Astrology Prediction</h2>
        <div className="predictions-grid">
          {predictions.map((p, idx) => (
            <div key={idx} className="prediction-item">
              <div className="prediction-icon">
                <img src={p.image} alt={p.sign} />
              </div>
              <p>{p.sign}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
