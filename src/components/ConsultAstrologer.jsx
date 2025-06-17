import './ConsultAstrologer.css'

const ConsultAstrologer = () => {
  const consultTypes = [
    {
      icon: '💬',
      title: 'Live Compatibility',
      description: 'Chat with astrologers in real-time'
    },
    {
      icon: '💑',
      title: 'Marriage & Birth',
      description: 'Get marriage and birth chart analysis'
    },
    {
      icon: '📋',
      title: 'Career',
      description: 'Professional guidance and career advice'
    },
    {
      icon: '📍',
      title: 'Travel Astrologer',
      description: 'Travel predictions and suggestions'
    },
    {
      icon: '🔄',
      title: 'Reincarnation',
      description: 'Past life and spiritual guidance'
    }
  ]

  return (
    <section className="consult-astrologer section">
      <div className="container">
        <h2 className="section-title">Consult The Right Astrologer For You</h2>
        
        <div className="consult-grid">
          {consultTypes.map((type, index) => (
            <div key={index} className="consult-card card">
              <div className="consult-icon">
                <span>{type.icon}</span>
              </div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConsultAstrologer