// src/components/ScheduleAppointment/ScheduleAppointment.jsx

import React from 'react';
import './ScheduleAppointment.css';

// import your images from src/assets
import bg1 from '/assets/Group 74.png';
import bg2 from '/assets/Group 75.png';
import bg3 from '/assets/Group 80.png';
import bg4 from '/assets/Group 81.png';

const appointments = [
  { image: bg1 },
  { image: bg2 },
  { image: bg3 },
  { image: bg4 },
];

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
              className="appointment-card"
              style={{ backgroundImage: `url(${appt.image})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
