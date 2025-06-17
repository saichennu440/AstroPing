import './Services.css'

const Services = () => {
  const services = [
    {
      icon: '💬',
      title: 'Chat',
      description: 'Chat with astrologers'
    },
    {
      icon: '📞',
      title: 'Call',
      description: 'Talk to astrologers'
    },
    {
      icon: '📊',
      title: 'Horoscope',
      description: 'Daily predictions'
    },
    {
      icon: '🛍️',
      title: 'Store',
      description: 'Astrology products'
    }
  ]

  return (
    <section className="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-icon">
                <span>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services