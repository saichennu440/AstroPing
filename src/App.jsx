// src/App.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Hero from './components/Hero'
// import Services from './components/Services'
import TopAstrologers from './components/TopAstrologers'
import ScheduleAppointment from './components/ScheduleAppointment'
import TodaysPrediction from './components/TodaysPrediction'
import OurServices from './components/OurServices'
import ConsultAstrologer from './components/ConsultAstrologer'
import FreeServices from './components/FreeServices'
import Blog from './components/Blog'
import Stats from './components/Stats'
import Astrologers from './components/Astrologers'
import WhyHoroscope from './components/WhyHoroscope'
import Footer from './components/Footer'

import SignInModal from './components/SignInModal'
import ProfileModal from './components/ProfileModal'

import './components/SignInForm.css'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE

function App() {
  // Sign‑in modal
  const [showSignIn, setShowSignIn] = useState(false)
  // Profile modal
  const [showProfile, setShowProfile] = useState(false)
    console.log('showProfile:', showProfile);
  // Logged‑in user
  const [currentUser, setCurrentUser] = useState(null)

  // On mount, check for existing JWT and fetch user
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUser()
    }
  }, [])

  // Fetch user profile
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/user`)
      if (data.success) {
        setCurrentUser(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch user:', err)
      // token might be invalid – clear it
      handleLogout()
    }
  }

  // Handle successful login (receive JWT from SignInModal)
  const handleLogin = (token) => {
    localStorage.setItem('jwt', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setShowSignIn(false)
    fetchCurrentUser()
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwt')
    delete axios.defaults.headers.common['Authorization']
    setCurrentUser(null)
    setShowProfile(false)
  }

  return (
    <div className="App">
      <Header
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      <Hero />
      {/* <Services /> */}
      <TopAstrologers />
      <ScheduleAppointment />
      <TodaysPrediction />
      <OurServices />
      <ConsultAstrologer />
      <FreeServices />
      <Blog />
      <Stats />
      <Astrologers />
      <WhyHoroscope />
      <Footer />

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onLogin={handleLogin}
      />

      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={currentUser}
        onUpdate={fetchCurrentUser}
      />
    </div>
  )
}

export default App
