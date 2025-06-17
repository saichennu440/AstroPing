import './Astrologers.css'

const Astrologers = () => {
  const astrologers = [
    {
      name: 'Shyam Rani',
      rating: 4.8,
      image: '/assets/image2.png'
    },
    {
      name: 'Shyam Rani',
      rating: 4.9,
      image: '/assets/image2.png'
    },
    {
      name: 'Shyam Rani',
      rating: 4.7,
      image: '/assets/image2.png'
    }
  ]

  return (
    <section className="astrologers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Astrologers</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="astrologers-showcase">
          {astrologers.map((astrologer, index) => (
            <div key={index} className="astrologer-showcase-card">
              <div className="astrologer-showcase-image">
                <img src={astrologer.image} alt={astrologer.name} />
              </div>
              <h3>{astrologer.name}</h3>
              <div className="rating">
                <span className="rating-value">{astrologer.rating}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(astrologer.rating) ? 'star filled' : 'star'}>
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
  )
}

export default Astrologers