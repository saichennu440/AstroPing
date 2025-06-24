// src/pages/KundliReportPage.jsx
import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header'
import TopAstrologers from '../TopAstrologers'
import Blogs from '../Blog'
import Footer from '../Footer'
import './KundliReportPage.css'

const API_BASE = import.meta.env.VITE_API_BASE

const TABS = [
  { key: 'basic',       label: 'Basic Details' },
  { key: 'predictions', label: 'Kundli Predictions' },
  { key: 'positions',   label: 'Position of Planet' },
  { key: 'chart',       label: 'Divisional Charts' },
  { key: 'dosha',       label: 'Dosha' },
  { key: 'dasha',       label: 'Dasha' },
  { key: 'remedies',    label: 'Remedies' }
]

const API_MAP = {
  basic:       { url: '/user/getUserBasicDetails',  body: d => ({ userId: d.userId }) },
  predictions: { url: '/user/getKundliChart',       body: d => ({ userId: d.userId, chart_type: 'navamasaChart', lang: 'en' }) },
  positions:   { url: '/user/getPlanets',           body: d => ({ userId: d.userId }) },
  chart:       { url: '/user/getDivisionalCharts',  body: d => ({ userId: d.userId }) },
  dosha:       { url: '/user/getDoshas',            body: d => ({ userId: d.userId, lang: 'en' }) },
  dasha:       { url: '/user/getDashas',            body: d => ({ userId: d.userId, lang: 'en', isFrom: 'kotlin' }) },
  remedies:    { url: '/user/getAshtakvarga',        body: d => ({ userId: d.userId }) }
}

export default function KundliReportPage({ user, onSignInClick, onProfileClick, onLogout }) {
  const formData = useLocation().state || {}
  const [activeTab, setActiveTab] = useState('basic')
  const [data, setData]       = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!formData.userId) {
      setError('Missing user data. Please refill the form.')
      return
    }
    const { url, body } = API_MAP[activeTab]
    setLoading(true)
    setError('')
    axios.post(`${API_BASE}${url}`, body(formData))
      .then(res => setData(prev => ({ ...prev, [activeTab]: res.data })))
      .catch(err => {
        console.error(err)
        setError(err.response?.data?.message || err.message)
      })
      .finally(() => setLoading(false))
  }, [activeTab, formData])

  // Renderers for each tab
  const renderBasic = () => {
    const details = data.basic?.userBasicDetails
    if (!details) return <p>No basic details available.</p>
    const { birthDetails, panchangDetails, avakadaDetails } = details
    return (
      <div className="basic-details">
        {['Birth Details', 'Panchang Details', 'Avakada Details'].map((section, idx) => {
          const obj = [birthDetails, panchangDetails, avakadaDetails][idx]
          return (
            <div key={section} className="object-section">
              <h2>{section}</h2>
              <ul>
                {Object.entries(obj).map(([k,v]) => (
                  <li key={k}><strong>{k.replace(/([A-Z])/g, ' $1')}:</strong> {v}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }

  const renderPredictions = () => {
    const chart = data.predictions?.userKundiChart?.navamasaChart
    if (!chart) return <p>No chart available.</p>
    return (
      <div className="predictions">
        <h2>Kundli Charts</h2>
        <div className="chart-images">
          <img src={chart.northIndian} alt="North Indian Chart" />
          <img src={chart.southIndian} alt="South Indian Chart" />
        </div>
      </div>
    )
  }

  const renderPositions = () => {
    const list = data.positions?.userPlanets?.sign
    if (!list) return <p>No planet positions available.</p>
    return (
      <div className="positions">
        <h2>Planet Positions</h2>
        <ul>
          {list.map(p => (
            <li key={p.planetName}>
              <strong>{p.planetName}:</strong> {p.zodiac_sign} ({p.degree}°) in house {p.house}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderChart = () => {
    const charts = data.chart?.userDivisionalChart
    if (!charts) return <p>No divisional charts available.</p>
    return (
      <div className="divisional-charts">
        <h2>Divisional Charts</h2>
        {Object.entries(charts).map(([name, urls]) => (
          <div key={name} className="chart-images">
            <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <img src={urls.northIndian} alt={`${name} North`} />
            <img src={urls.southIndian} alt={`${name} South`} />
          </div>
        ))}
      </div>
    )
  }

  const renderDosha = () => {
    const doshas = data.dosha?.userDoshas
    if (!doshas) return <p>No dosha information available.</p>
    return (
      <div className="dosha-list">
        <h2>Doshas</h2>
        <ul>
          {Object.entries(doshas).map(([key, val]) => (
            <li key={key}><strong>{key}:</strong> {val}</li>
          ))}
        </ul>
      </div>
    )
  }

  const renderDasha = () => {
    const d = data.dasha?.userDashas
    if (!d) return <p>No dasha data available.</p>
    return (
  <div className="dasha">
      <h2>Mahadasha</h2>
      {d.mahadasha.map(m => (
        <div key={m._id} className="dasha-item">
          <input type="checkbox" id={`mah-${m._id}`} />
          <label htmlFor={`mah-${m._id}`}>
            {m.planetName} ({m.startDate} – {m.endDate})
          </label>
          <div className="content">
            <ul>
              <li>Start Date: {m.startDate}</li>
              <li>End Date: {m.endDate}</li>
              {/* Add more fields from m if available */}
            </ul>
          </div>
        </div>
      ))}

      <h2>Antardasha</h2>
      {d.antardasha.map(a => (
        <div key={a._id} className="dasha-item">
          <input type="checkbox" id={`ant-${a._id}`} />
          <label htmlFor={`ant-${a._id}`}>
            {a.planetName} ({a.startDate} – {a.endDate})
          </label>
          <div className="content">
            <ul>
              <li>Start Date: {a.startDate}</li>
              <li>End Date: {a.endDate}</li>
              {/* Add more fields from a if available */}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

  const renderRemedies = () => {
    const r = data.remedies?.userAshtakvarga
    if (!r) return <p>No remedies available.</p>
    return (
      <div className="remedies">
        <h2>Ashtakvarga Points</h2>
        <table>
          <thead><tr><th>Planet</th><th>Points (12 Houses)</th></tr></thead>
          <tbody>
            {r.planets.map(p => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.points.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderContent = () => {
    if (loading) return <p>Loading {TABS.find(t=>t.key===activeTab).label}…</p>
    if (error)   return <p className="error">Error: {error}</p>
    switch (activeTab) {
      case 'basic':       return renderBasic()
      case 'predictions': return renderPredictions()
      case 'positions':   return renderPositions()
      case 'chart':       return renderChart()
      case 'dosha':       return renderDosha()
      case 'dasha':       return renderDasha()
      case 'remedies':    return renderRemedies()
      default:            return null
    }
  }

  return (
    <>
      <Header user={user} onSignInClick={onSignInClick} onProfileClick={onProfileClick} onLogout={onLogout} />
      <div className="kundli-report-page">
        <nav className="breadcrumb">
          <NavLink to="/">Home</NavLink> &gt; <NavLink to="/panchang/kundli">Kundli</NavLink> &gt; <span className="current">Report</span>
        </nav>
        <section className="report-banner">
          <img src="/assets/report-banner.jpg" alt="Kundli Report Banner" />
          <h1>Kundli Report</h1>
        </section>
        <nav className="report-tabs">
          {TABS.map(tab => (
            <button key={tab.key} className={activeTab===tab.key?'active':''} onClick={()=>setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </nav>
        <section className="report-content">
          {renderContent()}
        </section>
        <TopAstrologers />
        <Blogs />
      </div>
      <Footer />
    </>
  )
}
