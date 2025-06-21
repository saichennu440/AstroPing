// src/components/FreeServices.jsx
import React from 'react';
import './FreeServices.css';

const FreeServices = () => {
  const freeServices = [
    {
      title: 'Free Panchang',
      subtitle: 'With Horoscope, Kundli, and Predictions',
      icon: '/assets/panchang.png',      // ← your actual icon here
    },
    {
      title: 'Free Nakshatra',
      subtitle: 'With Horoscope, Kundli, and Predictions',
      icon: '/assets/panchang.png',      // ← your actual icon here
    },
    {
      title: 'Free Moon Sign',
      subtitle: 'With Horoscope, Kundli, and Predictions',
      icon: '/assets/panchang.png',      // ← your actual icon here
    },
  ];

  return (
    <section className="free-services section">
      <div className="container">
        <div className="section-header spaced">
          <h2 className="section-titleee">Consult The Right Astrologer For You</h2>
          <a href="#" className="view-all">View All</a>
        </div>

        <div className="free-services-grid">
          {freeServices.map((svc, idx) => (
            <div key={idx} className="free-service-card">
              <div className="service-icon">
                <img src={svc.icon} alt={svc.title} />
              </div>
              <h3>{svc.title}</h3>
              <p>{svc.subtitle}</p>
              <button className="btn btn-primary">Get it now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeServices;
