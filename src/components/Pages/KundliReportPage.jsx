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
  { key: 'chart',       label: 'Chart' },
  { key: 'dosha',       label: 'Dosha' },
  { key: 'dasha',       label: 'Dasha' },
  { key: 'remedies',    label: 'Remedies' }
]

// **only** the part _after_ /api
const API_MAP = {
  basic:       { url: '/user/getUserBasicDetails',  body: d => ({ userId: d.userId }) },
  predictions: { url: '/user/getKundliChart',       body: d => ({ userId: d.userId, chart_type: 'navamasaChart', lang: 'en' }) },
  positions:   { url: '/user/getPlanets',           body: d => ({ userId: d.userId }) },
  chart:       { url: '/user/getDivisionalCharts',  body: d => ({ userId: d.userId }) },
  dosha:       { url: '/user/getDoshas',            body: d => ({ userId: d.userId, lang: 'en' }) },
  dasha:       { url: '/user/getDashas',            body: d => ({ userId: d.userId, lang: 'en', isFrom: 'kotlin' }) },
  remedies:    { url: '/user/getAshtakvarga',        body: d => ({ userId: d.userId }) }
}

export default function KundliReportPage({
  user,
  onSignInClick,
  onProfileClick,
  onLogout
}) {
  // grab the formData you passed via navigate()
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

    axios
      .post(`${API_BASE}${url}`, body(formData))
      .then(res => {
        if (res.data) {
          setData(prev => ({ ...prev, [activeTab]: res.data }))
        } else {
          setError('No data returned.')
        }
      })
      .catch(err => {
        console.error(err)
        setError(err.response?.data?.message || err.message)
      })
      .finally(() => setLoading(false))
  }, [activeTab, formData])

  return (
    <>
      <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />

      <div className="kundli-report-page">
        <nav className="breadcrumb">
          <NavLink to="/">Home</NavLink> &gt;{' '}
          <NavLink to="/panchang/kundli">Kundli</NavLink> &gt;{' '}
          <span className="current">Report</span>
        </nav>

        <section className="report-banner">
          <img
            src="/assets/report-banner.jpg"
            alt="Kundli Report Banner"
          />
          <h1>Kundli Report</h1>
        </section>

        <nav className="report-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? 'active' : ''}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="report-content">
          {loading && (
            <p>Loading {TABS.find(t => t.key === activeTab).label}…</p>
          )}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && data[activeTab] && (
            <pre className="json-block">
              {JSON.stringify(data[activeTab], null, 2)}
            </pre>
          )}
        </section>

        <TopAstrologers />
        <Blogs />
      </div>

      <Footer />
    </>
  )
}
