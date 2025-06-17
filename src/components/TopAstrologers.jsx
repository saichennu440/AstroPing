import { useRef } from 'react'
import './TopAstrologers.css'

const astrologers = [
  {
    name: 'Geeta Sharma',
    expertise: 'Vedic, Tarot',
    experience: '15 Years',
    rating: 4.5,
    reviews: 1284,
    price: '12',                // added price field (₹12/Min)
    image: '/assets/image0.png', // your local import or public path
    online: true
  },
  {
    name: 'Rajiv Sharma',
    expertise: 'Numerology, KP',
    experience: '12 Years',
    rating: 4.7,
    reviews: 2341,
    price: '15',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
    online: true
  },
  {
    name: 'Priya Gupta',
    expertise: 'Love, Career',
    experience: '8 Years',
    rating: 4.3,
    reviews: 987,
    price: '10',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
    online: false
  },
  {
    name: ' Sharma',
    expertise: 'Vedic, Tarot',
    experience: '15 Years',
    rating: 4.5,
    reviews: 1284,
    price: '12',                // added price field (₹12/Min)
    image: '/assets/image0.png', // your local import or public path
    online: true
  },
  {
    name: 'Priya',
    expertise: 'Love, Career',
    experience: '8 Years',
    rating: 4.3,
    reviews: 987,
    price: '10',
    image: '/assets/image0.png',
    online: false
  },
  {
    name:  'Gupta',
    expertise: 'Love, Career',
    experience: '8 Years',
    rating: 4.3,
    reviews: 987,
    price: '10',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
    online: false
  },
]

export default function TopAstrologers() {
  const slider = useRef(null)

  const scroll = (dir) => {
    if (!slider.current) return
    const amount = slider.current.offsetWidth * 0.8
    slider.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

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
                {/* CARD HEADER */}
                <div className="card-header">
                  <div className="astrologer-image">
                    <img src={a.image} alt={a.name} />
                    <span className={`status-indicator ${a.online ? 'online' : 'offline'}`} />
                  </div>
                  <button className="btn follow-btn">+ Follow</button>
                </div>

                {/* CARD BODY */}
                <div className="card-body">
                  {/* Left side: details */}
                  <div className="info-left">
                    <h3>{a.name}</h3>
                    <p className="expertise">{a.expertise}</p>
                    <p className="experience">{a.experience}</p>
                    <div className="rating">
                      <div className="stars">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={idx < Math.floor(a.rating) ? 'star filled' : 'star'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">
                        {a.rating} ({a.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Right side: price & actions */}
                  <div className="info-right">
                    <span className="price">₹ {a.price}/Min</span>
                    <div className="action-buttons">
                      <button className="btn primary small">Call</button>
                      <button className="btn outline small">Chat</button>
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
    
  )
}
