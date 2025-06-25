// src/App.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import TarotPage from './components/Pages/TarotPage'
import ScrollToTop from './components/ScrollToTop'
import HoroscopePage from './components/HoroscopePage'
import Header from './components/Header'
import Hero from './components/Hero'
import PanchangPage from './components/PanchangPage'
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
import KundliPage from './components/Pages/KundliPage'
import KundliReportPage from './components/Pages/KundliReportPage'
import cooming from './components/cooming'
import DeleteAccount from './components/DeleteAccount'
import DeleteForm from './components/DeleteForm'
import './components/SignInForm.css'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE

function App() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUser()
    }
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/user`)
      if (data.success) {
        setCurrentUser(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch user:', err)
      handleLogout()
    }
  }

  const handleLogin = (token) => {
    localStorage.setItem('jwt', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setShowSignIn(false)
    fetchCurrentUser()
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    delete axios.defaults.headers.common['Authorization']
    setCurrentUser(null)
    setShowProfile(false)
  }

  const HomePage = () => (
    <main>
      <Hero />
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
      <Footer/>
    </main>
  )

  return (
    <Router>
      <ScrollToTop />

      {/* ✅ Header on all pages */}
      <Header
        user={currentUser}
        onSignInClick={() => setShowSignIn(true)}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
<Route
  path="/horoscope"
  element={
    <HoroscopePage
      user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
    />
  }
/>

<Route path="/DeleteAccount" element={<DeleteAccount 
 user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
/>} />

<Route path="/DeleteForm" element={<DeleteForm 
 user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
/>} />

        <Route path="/astrologers" element={<AllAstrologers 
        user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/horoscope/:sign" element={<SignDetailPage 
            user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/horoscope/:sign/:day" element={<SignDetailPage
          user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/blogs" element={<AllBlogs 
          user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/panchang/kundli" element={<KundliPage 
        user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/kundli/report" element={<KundliReportPage
         user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />
        <Route path="/topastrologers" element={<AllTopAstrologers
        user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
        />} />

        <Route path="/coming" element={<cooming />} />

        <Route
         path="/panchang"
         element={
           <PanchangPage
             user={currentUser}
             onSignInClick={() => setShowSignIn(true)}
             onProfileClick={() => setShowProfile(true)}
             onLogout={handleLogout}
           />
         }
       />

       <Route
  path="/tarot"
  element={
    <TarotPage
      user={currentUser}
      onSignInClick={() => setShowSignIn(true)}
      onProfileClick={() => setShowProfile(true)}
      onLogout={handleLogout}
    />
  }
/>
      </Routes>

      {/* ✅ Footer on all pages */}
      

      {/* ✅ Modals (globally accessible) */}
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
