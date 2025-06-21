import './Stats.css'

const Stats = () => {
  const stats = [
    {
      number: '27+',
      label: 'Million',
      sublabel: 'Total Customers'
    },
    {
      number: '25,000+',
      label: 'Total astrologers',
      sublabel: ''
    }
  ]

  return (
    <section className="statss">
      <div className="container">
        <div className="statss-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats