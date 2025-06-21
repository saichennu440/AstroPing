// src/App.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HoroscopePage from './components/HoroscopePage'
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
import AllBlogs from './components/AllBlogs'
import Stats from './components/Stats'
import Astrologers from './components/Astrologers'
import WhyHoroscope from './components/WhyHoroscope'
import Footer from './components/Footer'
import SignDetailPage from './components/Pages/SignDetailPage'
import SignInModal from './components/SignInModal'
import ProfileModal from './components/ProfileModal'
import AllTopAstrologers from './components/AllTopAstrologers'
import AllAstrologers from './components/AllAstrologers'
import './components/SignInForm.css'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE

function App() {
  // Sign‑in modal
  const [showSignIn, setShowSignIn] = useState(false)
  // Profile modal
  const [showProfile, setShowProfile] = useState(false)
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
      handleLogout()
    }
  }

  // Handle successful login
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

  // The “home” page layout, pulled into its own component for clarity
  const HomePage = () => (
    <div className="App">
      <Header
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
      />
      <main>
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
      </main>
      <Footer />
    </div>
  )

  return (
    <Router>
       <ScrollToTop/>
      {/* Route‑aware rendering */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/astrologers" element={<AllAstrologers/>}/>
        <Route path="/horoscope/:sign" element={<SignDetailPage/>} />
        <Route path="/horoscope/:sign/:day" element={<SignDetailPage />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route
          path="/topastrologers"
          element={<AllTopAstrologers />}
        />
        
      </Routes>

      {/* Modals live outside of <Routes> so they’re always mountable */}
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
    </Router>
  )
}

export default App
