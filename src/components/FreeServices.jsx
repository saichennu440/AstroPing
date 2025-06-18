import './FreeServices.css'

const FreeServices = () => {
  const freeServices = [
    {
      title: 'Free Panchang',
      subtitle: 'with Nakshatra, Karanh, and Predictions',
      icon: '📅'
    },
    {
      title: 'Free Nakshatra',
      subtitle: 'with Nakshatra, Karanh, and Predictions',
      icon: '⭐'
    },
    {
      title: 'Free Moon Sign',
      subtitle: 'with Nakshatra, Karanh, and Predictions',
      icon: '🌙'
    }
  ]

  return (
    <section className="free-services">
      <div className="container">
        <div className="section-header">
          <h2 className="sectionn-title">Consult The Right Astrologer For You</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="free-services-grid">
          {freeServices.map((service, index) => (
            <div key={index} className="free-service-card">
              <div className="service-icon">
                <span>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.subtitle}</p>
              <button className="btn btn-primary">Get it now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FreeServices