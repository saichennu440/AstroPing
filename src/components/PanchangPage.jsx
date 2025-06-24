// src/components/Pages/PanchangPage.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Header from './Header'
import TopAstrologers from './TopAstrologers'
import Blogs from './Blog'
import Footer from './Footer'
import { formatDDMMYYYY } from '../utils/date'
import './PanchangPage.css'

const API_KEY  = '882962b3-7f89-538b-8c7d-e83dbe5d5826'
const BASE_URL = 'https://api.vedicastroapi.com/v3-json/panchang/panchang'

export default function PanchangPage({
  user,
  onSignInClick,
  onProfileClick,
  onLogout
}) {
  const [panchang, setPanchang] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    // dynamically format today:
    const today = formatDDMMYYYY(new Date())

    // for now, hard‐code lat/lon/tz; you can replace with user location later
    const params = {
      api_key: API_KEY,
      date:    today,
      tz:      5.5,
      lat:     11.2,
      lon:     77.0,
      // you can include current time if you want exact "rahukaal" etc
      time:    '',
      lang:    'en'
    }

    axios
      .get(BASE_URL, { params })
      .then(res => {
        if (res.data?.response) {
          setPanchang(res.data.response)
        } else {
          setError('No panchang data returned.')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load Panchang.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />

      <div className="panchang-page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <strong>Panchang</strong>
        </nav>

        <section className="panchang-content">
          <h1>Daily Panchang</h1>

          {loading && <div className="loader" />}

          {error && <p className="error">{error}</p>}

          {panchang && (
            <table className="panchang-table">
              <tbody>
                <tr>
                  <th>Day</th>
                  <td>{panchang.day?.name ?? '—'}</td>
                </tr>
                <tr>
                  <th>Tithi</th>
                  <td>
                    {panchang.tithi?.name ?? '—'}
                    {panchang.tithi?.number != null && ` (${panchang.tithi.number})`}
                  </td>
                </tr>
                <tr>
                  <th>Next Tithi</th>
                  <td>{panchang.tithi?.next_tithi ?? '—'}</td>
                </tr>
                <tr>
                  <th>Tithi Type</th>
                  <td>{panchang.tithi?.type ?? '—'}</td>
                </tr>
                <tr>
                  <th>Nakshatra</th>
                  <td>
                    {panchang.nakshatra?.name ?? '—'}
                    {panchang.nakshatra?.number != null && ` (${panchang.nakshatra.number})`}
                  </td>
                </tr>
                <tr>
                  <th>Next Nakshatra</th>
                  <td>{panchang.nakshatra?.next_nakshatra ?? '—'}</td>
                </tr>
                <tr>
                  <th>Yoga</th>
                  <td>
                    {panchang.yoga?.name ?? '—'}
                    {panchang.yoga?.number != null && ` (${panchang.yoga.number})`}
                  </td>
                </tr>
                <tr>
                  <th>Karana</th>
                  <td>
                    {panchang.karana?.name ?? '—'}
                    {panchang.karana?.number != null && ` (${panchang.karana.number})`}
                  </td>
                </tr>
                <tr>
                  <th>Ayanamsa</th>
                  <td>{panchang.ayanamsa?.name ?? '—'}</td>
                </tr>
                <tr>
                  <th>Moon Sign (Rasi)</th>
                  <td>{panchang.rasi?.name ?? '—'}</td>
                </tr>
                <tr>
                  <th>Sunrise</th>
                  <td>{panchang.advanced_details?.sun_rise ?? '—'}</td>
                </tr>
                <tr>
                  <th>Sunset</th>
                  <td>{panchang.advanced_details?.sun_set ?? '—'}</td>
                </tr>
                <tr>
                  <th>Moonrise</th>
                  <td>{panchang.advanced_details?.moon_rise ?? '—'}</td>
                </tr>
                <tr>
                  <th>Moonset</th>
                  <td>{panchang.advanced_details?.moon_set ?? '—'}</td>
                </tr>
                <tr>
                  <th>Rahukaal</th>
                  <td>{panchang.rahukaal ?? '—'}</td>
                </tr>
                <tr>
                  <th>Gulika</th>
                  <td>{panchang.gulika ?? '—'}</td>
                </tr>
                <tr>
                  <th>Yamakantaka</th>
                  <td>{panchang.yamakanta ?? '—'}</td>
                </tr>
                <tr>
                  <th>Next Full Moon</th>
                  <td>{panchang.advanced_details?.next_full_moon ?? '—'}</td>
                </tr>
                <tr>
                  <th>Next New Moon</th>
                  <td>{panchang.advanced_details?.next_new_moon ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </section>

        <TopAstrologers />
        <Blogs />
      </div>

      <Footer />
    </>
  )
}
