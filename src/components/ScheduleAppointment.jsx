import './ScheduleAppointment.css'

const appointments = [
  {
    image: '/assets/Group 74.png',     // full‑card background
    icon: '/assets/Group 74.png',      // centered icon
    title: 'Palm Reader',
    description: 'Life & future insights'
  },
  {
    image: '/assets/Group 75.png',
    icon: '/assets/Group 75.png',
    title: 'Tarot Reader',
    description: 'Card‑based guidance'
  },
  {
    image: '/assets/Group 80.png',
    icon: '/assets/Group 80.png',
    title: 'Horoscope',
    description: 'Daily star guidance'
  },
  {
    image: '/assets/Group 81.png',
    icon: '/assets/Group 81.png',
    title: 'Best Astrologer',
    description: 'Top rated experts'
  }
]

export default function ScheduleAppointment() {
  return (
    <section className="schedule-appointment section">
      <div className="container">
        <div className="section-header spaced">
          <h2 className="section-title">Schedule Appointment</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="appointments-grid">
          {appointments.map((appt, idx) => (
            <div
              key={idx}
              className="appointmen"
              style={{ backgroundImage: `url(${appt.image})` }}
            >
              <div className="appointment-icon">
                <img src={appt.icon} alt={appt.title} />
              </div>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
