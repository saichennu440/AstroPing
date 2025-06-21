import './Astrologers.css'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const[loading , setLoading] = useState(true);
  const[error,setError] =useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAstrologers = async () =>{
      try{
        const response = await fetch('https://api.astroping.com/api/astrologer/get-astrologers',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            category:'all',
            page:1,
            limit:3,
          }),
        });
        const result = await response.json();
        if(response.ok && result.success){
          setAstrologers(result.astrologers || []);
        } else{
          setError(result.message || 'Failed to load astrologers');
        }
      }catch(err){
        setError('Something went wrong. Please try again.');
      }finally{
        setLoading(false);
      }
    };
    fetchAstrologers();
  },[]);
  return (
    <section className="astrologers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Astrologers</h2>
          <button className="view-all" onClick={() =>navigate('/astrologers')}>
            View All
          </button>
        </div>
        {loading && <div className="spinner" />}
        {error && <p className="error">{error}</p>}

        <div className="astrologers-showcase">
          {!loading && !error && astrologers.map((astrologer, index) => (
            <div key={index} className="astrologer-showcase-card">
              <div className="astrologer-showcase-image">
                <img src={astrologer.profile_photo || '/assests/default.png'} alt={astrologer.astrologerName} />
              </div>
              <h3>{astrologer.astrologerName}</h3>
              <div className="rating">
                <span className="rating-value">4.0</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < 4 ? 'star filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Astrologers