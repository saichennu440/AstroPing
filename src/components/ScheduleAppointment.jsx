// src/components/ScheduleAppointment/ScheduleAppointment.jsx
import React from 'react'
import './ScheduleAppointment.css'

const appointments = [
  {
    icon: '/assets/palm-reader.png',
    title: 'Palm Reader',
    bg: '/assets/card-bg-1.png',
    link: '/schedule/palm-reader',
  },
  {
    icon: '/assets/tarot-reader.png',
    title: 'Tarot Reader',
    bg: '/assets/card-bg-1.png',
    link: '/schedule/tarot-reader',
  },
  {
    icon: '/assets/horoscope2nd.png',
    title: 'Horoscope',
    bg: '/assets/card-bg-1.png',
    link: '/schedule/horoscope',
  },
  {
    icon: '/assets/best-astrologer.png',
    title: 'Best Astrologer',
    bg: '/assets/card-bg-1.png',
    link: '/schedule/best-astrologer',
  },
]

export default function ScheduleAppointment() {
  return (
    <section className="schedule-appointment section">
      <div className="container">
        <div className="section-header spaced">
          <h2 className="section-title">Schedule Appointment</h2>
          <a href="/schedule" className="view-all">View All</a>
        </div>
        <div className="appointments-grid">
          {appointments.map((a, i) => (
            <a
              key={i}
              href={a.link}
              className="appointment-card"
              style={{ backgroundImage: `url(${a.bg})` }}
            >
              <div className="appointment-overlay">
                <img src={a.icon} alt={a.title} className="appointment-icon" />
                <span className="appointment-title">{a.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
