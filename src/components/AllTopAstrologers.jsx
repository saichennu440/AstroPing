import React, { useEffect, useState } from 'react';
import './TopAstrologers.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'


    export default function AllTopAstrologers({ user, onSignInClick, onProfileClick, onLogout }) {
  const [astrologers, setAstrologers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const LIMIT = 20;

  const fetchAstrologers = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await axios.get('https://api.astroping.com/api/astrologer/get-astrologers', {
        params: {
          category: 'all',
          page: pageNumber,
          limit: LIMIT,
        },
      });

      const allAstrologers = Array.isArray(res.data) ? res.data : res.data.astrologers || [];

      // If no data, assume this is past last page
      if (!allAstrologers.length) {
        setLastPageReached(true);
        return;
      }

      const onlineAstrologers = allAstrologers.filter(
        (astrologer) => astrologer?.status === 'available'
      );

      // Append new astrologers to list
      setAstrologers(prev => [...prev, ...onlineAstrologers]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch astrologers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologers(page);
  }, [page]);

  const handleNextPage = () => {
    if (!lastPageReached) setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setAstrologers([]); // Clear previous list (optional)
      setLastPageReached(false);
      setPage(prev => prev - 1);
    }
  };

  return (
    <>
    <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />
    <section className="top-astrologers section">
      <div className="container">
        <div className="section-header spaced">
          <h2 className="section-title">All Astrologers</h2>
        </div>

        {loading && <p>Loading astrologers...</p>}
        {error && <p className="error">{error}</p>}

        <div className="astrologers-grid">
          {astrologers.map((astrologer, i) => (
            <div key={i} className="astrologer-card">
              <div className="card-header">
                <div className="astrologer-image">
                  <img
                    src={astrologer.profile_photo || 'https://via.placeholder.com/80'}
                    alt={astrologer.astrologerName || 'Astrologer'}
                  />
                  <span className={`status-indicator ${astrologer?.status === 'available' ? 'available' : 'offline'}`} />
                </div>
              </div>
              <div className="card-body">
                <div className="info-left">
                  <h3>{astrologer.astrologerName || 'Unknown'}</h3>
                  <p className="expertise">
                    {Array.isArray(astrologer.expertIn)
                      ? astrologer.expertIn.slice(0, 2).join(', ') + (astrologer.expertIn.length > 2 ? '...' : '')
                      : astrologer.expertIn || 'Not listed'}
                  </p>
                  <p className="experience">{astrologer.experience || 'N/A'}</p>
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx} className={idx < 4 ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="info-right">
                  <button className="btn follow-btn">+ Follow</button>
                  <span className="price">₹{astrologer.cost ?? '--'}/Min</span>
                  <div className="action-buttons">
                    <button className="btn primary small">CALL</button>
                    <button className="btn outline small">CHAT</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls" style={{ textAlign: 'center', marginTop: '20px' }}>
          {page > 1 && (
            <button onClick={handlePrevPage} className="btn outline">
              ⬅ Previous Page
            </button>
          )}
          {!lastPageReached && (
            <button onClick={handleNextPage} className="btn primary" style={{ marginLeft: '10px' }}>
              View More ➕
            </button>
          )}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}