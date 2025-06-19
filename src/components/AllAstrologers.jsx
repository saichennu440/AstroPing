import React, { useEffect, useState } from 'react';
import './AllAstrologers.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header' 
import Footer from '../components/Footer'
export default function AllAstrologers({ user, onSignInClick, onProfileClick, onLogout }) {
  const [astrologers, setAstrologers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const fetchAstrologers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.astroping.com/api/astrologer/get-astrologers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'all',
          page: pageNumber,
          limit: 10,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        const newAstrologers = result.astrologers || [];
        setAstrologers(prev => [...prev, ...newAstrologers]);

        // If less than limit, no more data
        if (newAstrologers.length < 10) {
          setHasMore(false);
        }
      } else {
        setError(result.message || 'Failed to load astrologers');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologers(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
     <>
    <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />
    <section className="all-astrologerss">
      <div className="containerr">
        <h2 className="section-titlee">All Astrologers</h2>
         
        {error && <p className="errorr">{error}</p>}

        <div className="astrologerss-grid">
          {astrologers.map((astrologer, index) => (
            <div key={index} className="astrologerss-card">
              <img
                src={astrologer.profile_photo || '/assets/default.png'}
                alt={astrologer.astrologerName}
              />
              <h3>{astrologer.astrologerName}</h3>
              <p>{astrologer.category}</p>
              <p>{astrologer.known_languages}</p>
              <p>{astrologer.expertIn}</p>
              <p>{astrologer.verified ? 'Verified' : 'Not Verified'}</p>
            </div>
          ))}
        </div>

        {loading && <p>Loading...</p>}

        {!loading && hasMore && (
          <div className="load-more-containerr">
            <button className="load-more-btnn" onClick={handleLoadMore}>
              View More
            </button>
          </div>
        )}

        {!hasMore && <p style={{ textAlign: 'center', marginTop: '20px' }}>No more astrologers to show.</p>}
      </div>
    </section>
     <Footer />
    </>
  );
};

