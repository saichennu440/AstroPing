// src/components/OurServices/OurServices.jsx
import React from 'react'
import './OurServices.css'

const OurServices = () => {
  const services = [
    {
      icon: '/assets/image 13.png',
      title: 'Daily Horoscope',
      description:
        "Reading your today’s horoscope is one of the best ways to predict your future. The foretelling of the future through the daily horoscope…."
    },
    {
      icon: '/assets/image 14.png',
      title: 'Kundli Matching',
      description:
        "Reading your today’s horoscope is one of the best ways to predict your future. The foretelling of the future through the daily horoscope…."
    },
    {
      icon: '/assets/image 15.png',
      title: 'Ramana Panchang',
      description:
        "Reading your today’s horoscope is one of the best ways to predict your future. The foretelling of the future through the daily horoscope…."
    },
    {
      icon: '/assets/image 16.png',
      title: 'Compatibility',
      description:
        "Reading your today’s horoscope is one of the best ways to predict your future. The foretelling of the future through the daily horoscope…."
    }
  ]

  return (
    <section className="our-services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServices
