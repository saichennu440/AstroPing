// src/components/TopAstrologers/TopAstrologers.jsx
import React, { useRef } from 'react';
import './TopAstrologers.css';

import img0 from '/assets/image0.png';
import img3 from '/assets/image2.png';

const astrologers = [
  {
    name: 'Geeta Sharma',
    expertise: 'Vedic, Tarot',
    experience: '15 Years',
    rating: 4.5,
    reviews: 1284,
    price: '12',
    image: img0,
    online: true
  },
  {
    name: 'Rajiv Sharma',
    expertise: 'Numerology, KP',
    experience: '12 Years',
    rating: 4.7,
    reviews: 2341,
    price: '15',
    image: 'https://images.pexels.com/photos/91227/pexels‑photo‑91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
    online: true
  },

  {
    name: 'Anita Sharma',
    expertise: 'Vedic, Tarot',
    experience: '15 Years',
    rating: 4.5,
    reviews: 1284,
    price: '12',
    image: img3,
    online: true
  },
  {
    name: 'Priya Kapoor',
    expertise: 'Love, Career',
    experience: '8 Years',
    rating: 4.3,
    reviews: 987,
    price: '10',
    image: img3,
    online: false
  },

];

export default function TopAstrologers() {
  const slider = useRef(null);
  const scroll = dir => {
    if (!slider.current) return;
    const amt = slider.current.offsetWidth * 0.8;
    slider.current.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' });
  };

  return (
    <section className="top-astrologers section">
      <div className="container">
        <div className="section-header spaced">
          <h2 className="section-title">Top Online Astrologers</h2>
          <a href="#" className="view-all">View All</a>
        </div>

        <div className="slider-wrapper">
          <button className="slider-arrow left" onClick={() => scroll('left')}>‹</button>
          <div className="astrologers-slider" ref={slider}>
            {astrologers.map((a, i) => (
              <div key={i} className="astrologer-card">
                <div className="card-header">
                  <div className="astrologer-image">
                    <img src={a.image} alt={a.name} />
                    <span className={`status-indicator ${a.online ? 'online' : 'offline'}`} />
                  </div>
                  <button className="btn follow-btn">+ Follow</button>
                </div>
                <div className="card-body">
                  <div className="info-left">
                    <h3>{a.name}</h3>
                    <p className="expertise">{a.expertise}</p>
                    <p className="experience">{a.experience}</p>
                    <div className="rating">
                      <div className="stars">
                        {[...Array(5)].map((_, idx) => (
                          <span key={idx} className={idx < Math.floor(a.rating) ? 'star filled' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">{a.rating} ({a.reviews})</span>
                    </div>
                  </div>
                  <div className="info-right">
                    {/* <span className="price">₹{a.price}/Min</span> */}
                     <button className="btn follow-btn mobile-follow">+ Follow</button>
                    <span className="price">₹{a.price}/Min</span>
                    <div className="action-buttons">
                      <button className="btn primary small">CALL</button>
                      <button className="btn outline small">CHAT</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow right" onClick={() => scroll('right')}>›</button>
        </div>
      </div>
    </section>
  );
}
