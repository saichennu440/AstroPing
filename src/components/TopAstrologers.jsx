import React, { useEffect, useRef, useState } from 'react';
// import './TopAstrologers.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function TopAstrologers() {
  const [astrologers, setAstrologers] = useState([]);
  const slider = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  const fetchAstrologers = async () => {
    try {
      const res = await axios.get('https://api.astroping.com/api/astrologer/get-astrologers', {
         params: {
              category: 'all',
              page: 1,
              limit: 20,        // fetch more, but we'll only display 4
            },
      });
      const allAstrologers = Array.isArray(res.data) ? res.data : res.data.astrologers || [];
      const onlineAstrologers = allAstrologers.filter(
        (astrologer) => astrologer?.status ==='available'
      );
      setAstrologers(onlineAstrologers.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch astrologers:', err);
      setError('Failed to load astrologers');
    } finally {
      setLoading(false); // ✅ ensure loading is turned off
    }
  };
  fetchAstrologers();
}, []);


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
          <a className="view-all" onClick={() => navigate('/topastrologers')}>View All</a>
        </div>
      {loading &&<div className="spinner" />}
        {error && <p className="error">{error}</p>}

        <div className="slider-wrapper">
          <button className="slider-arrow left" onClick={() => scroll('left')}>‹</button>
          <div className="astrologers-slider" ref={slider}>
            {astrologers.map((astrologer, i) => (
              <div key={i} className="astrologer-card">
                <div className="card-header">
                  <div className="astrologer-image">
                    <img src={astrologer.profile_photo} alt={astrologer.astrologerName} />
                    <span className={`status-indicator ${astrologer?.status === 'available'? 'available ': 'offline'}`} />
                  </div>
                </div>
                <div className="card-body">
                  <div className="info-left">
                    <h3>{astrologer.astrologerName}</h3>
                    <p className="expertise">
  {Array.isArray(astrologer.expertIn)
    ? astrologer.expertIn.slice(0, 2).join(', ') + (astrologer.expertIn.length > 2 ? '...' : '')
    : astrologer.expertIn}
</p>
                    <p className="experience">{astrologer.experience}</p>
                    <div className="rating">
                    <div className="stars">
                         {[...Array(5)].map((_, idx) => (
                         <span key={idx} className={idx < 4 ? 'star filled' : 'star'}>
                          ★
                         </span>
                                 ))}
                    </div>

                      {/* <span className="rating-text">{a.rating} ({a.reviews})</span> */}
                    </div>
                  </div>
                  <div className="info-right">
                    <button className="btn follow-btn">+ Follow</button>
                    <span className="price">₹{astrologer.cost}/Min</span>
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