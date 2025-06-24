// src/components/Pages/TarotPage.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../Header'
import TopAstrologers from '../TopAstrologers'
import Blogs from '../Blog'
import Footer from '../Footer'
import './TarotPage.css'

const API_KEY = '882962b3-7f89-538b-8c7d-e83dbe5d5826'
const BASE_URL = 'https://api.vedicastroapi.com/v3-json/tarot/daily'

export default function TarotPage({
  user,
  onSignInClick,
  onProfileClick,
  onLogout
}) {
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    axios
      .get(BASE_URL, {
        params: { api_key: API_KEY, card_name: 'the_fool', lang: 'en' }
      })
      .then(res => {
        const { status, response } = res.data || {}
        if (status === 200 && response && typeof response === 'object') {
          setCard(response)
        } else if (response) {
          // API returned a message string
          setError(response)
        } else {
          setError('No tarot data returned.')
        }
      })
      .catch(err => {
        console.error('Tarot API error:', err)
        setError('Failed to load tarot card.')
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

      <div className="tarot-page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <strong>Tarot</strong>
        </nav>

        <section className="tarot-content">
          <h1>Daily Tarot: {card?.name ?? ''}</h1>

          {loading && <div className="loader" />}

          {error && <p className="error">{error}</p>}

          {card && !error && (
            <div className="tarot-card-detail">
              <div className="tarot-image">
                <img
                  src={card.card_image.classic}
                  alt={card.name}
                />
              </div>
              <div className="tarot-readings">
                <div className="reading">
                  <h3>Health</h3>
                  <p>{card.health}</p>
                </div>
                <div className="reading">
                  <h3>Relationship</h3>
                  <p>{card.relationship}</p>
                </div>
                <div className="reading">
                  <h3>Career</h3>
                  <p>{card.career}</p>
                </div>
                <div className="reading">
                  <h3>Finance</h3>
                  <p>{card.finance}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <TopAstrologers />
        <Blogs />
      </div>

      <Footer />
    </>
  )
}
