// src/components/Pages/KundliPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Header from '../Header';
import TopAstrologers from '../TopAstrologers';
import Blogs from '../Blog';
import Footer from '../Footer';
import './KundliPage.css';

const ICONS = [
  { label: 'Kundli',        icon: '/assets/icon-kundli.png' },
  { label: 'Mangal Dosha',  icon: '/assets/icon-mangal.png' },
  { label: 'Ascendant',     icon: '/assets/icon-asc.png' },
  { label: 'Mahadasha',     icon: '/assets/icon-maha.png' },
  { label: 'Dasha',         icon: '/assets/icon-dasha.png' },
  { label: 'House',         icon: '/assets/icon-house.png' },
  { label: 'Yoga',          icon: '/assets/icon-yoga.png' },
  { label: 'Types',         icon: '/assets/icon-types.png' },
  { label: 'Marriage',      icon: '/assets/icon-marriage.png' },
];

export default function KundliPage({
  user,
  onSignInClick,
  onProfileClick,
  onLogout
}) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('12:00');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // If no user is signed in, show the sign-in modal:
    if (!user?._id) {
      onSignInClick();
      return;
    }

    // Otherwise navigate to the report page:
    const formData = {
      userId: user._id,
      fullName,
      dob,
      tob,
      location,
      gender
    }
  // ← PASS IT FLAT:
    navigate('/kundli/report', { state: formData })
  }   

  return (
    <>
      {/* pass the same props through to the header */}
      <Header
        user={user}
        onSignInClick={onSignInClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />

      <div className="kundli-page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt;{' '}
          <Link to="/horoscope">Horoscope</Link> &gt;{' '}
          <strong>Kundli</strong>
        </nav>

        <section className="kundli-top">
          <div className="kundli-banner">
            <img src="/assets/kundli-banner.png" alt="Kundli" />
            <div className="kundli-banner-text">
              <h2>Kundali</h2>
              <p>
                A Kundli, also known as Janam Kundli, is a birth chart mapping the positions
                of planets and stars at your exact moment of birth. Astrologers use it to
                interpret your personality, life events, and future potentials. Enter your
                birth details below to generate your personalized Kundli instantly.
              </p>
              <p>
                You can scroll within this box if the text is longer than the visible area.
              </p>
            </div>
          </div>

          <div className="kundli-icons-grid">
            {ICONS.map(item => (
              <div key={item.label} className="kundli-icon-card">
                <img src={item.icon} alt={item.label} />
                <span className="bold-text">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

      <section className="form-bg-wrapper">
  <div className="custom-kundli-form">
          <h2>Get Your Free Kundli Today!</h2>
          <form className="kundli-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Full Name*
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </label>
              <label>
                Date of Birth*
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Time of Birth*
                <TimePicker
                  onChange={setTob}
                  value={tob}
                  disableClock={true}
                  clearIcon={null}
                  className="tob-picker"
                  required
                />
              </label>
              <label>
                Location*
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-row radios">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  required
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />{' '}
                Female
              </label>
            </div>

            <button type="submit" className="btn-get-kundli">
              GET YOUR KUNDLI
            </button>
          </form>
          </div>
        </section>
               {/* Content Sections */}
        <section className="kundli-content">
          <h3>What Is a Janam Kundli or Birth Chart?</h3>
          <p>A Janam Kundli, or Birth chart, is like a cosmic blueprint of your life. Vedic astrologers create your Kundli based on your exact birth date, birthplace, and birth time. It's like a roadmap that shows the exact positions of planets, zodiac signs, houses, and all major astrological aspects present at the time of your birth. These aspects in your natal or birth chart are considered significant in an astrological analysis.
Vedic astrology uses your Kundli chart to interpret your destiny, personality, strengths, and weaknesses. Astrologers can provide insights into various aspects of your life by analyzing your Kundli, including career, relationships, and wealth. Your Janam Kundali can reveal patterns and influences that can shape your journey through life.  A Janam Kundli, or Birth chart, is a cosmic blueprint of your life...
          </p>
<br></br>
          <h3>Why Is Janam Kundli Crucial?</h3>
          <p>
           Janam Kundli, or your birth chart, is crucial because it provides insights into your life based on your birth details. By analyzing the positions of planets at the time of birth, a Janam Kundli can reveal personality traits, career prospects, relationship dynamics, and more. With the convenience of getting a Kundli online, understanding oneself becomes more accessible.
This age-old method helps people make decisions, understand their strengths and weaknesses, and navigate life's challenges. Your Kundli is like a personalized roadmap, offering valuable information to help you lead a more fulfilling and purposeful life.
          </p>
<br></br>
          <h3>How to Get Your Kundli?</h3>
          <p>
           Kundli is your life's cosmic blueprint, which can help you understand many things and transform your life better. You can get your Kundli prepared by expert astrologers online on Astroyogi through a call or chat consultation with them. In addition, you can also explore our free online Kundli-making software on the Astroyogi app or our website to get your hands on your personalized Kundli instantly.
          </p>
<br></br>
          <h3>Create Your Own Free Online Kundali Using Kundli Software</h3>
          <p>
Astrology has gone digital, making it more accessible than ever. Astroyogi's free Kundali-making software generates an online horoscope for free. Astroyogi's Kundali software is a feature trusted by millions of users across the globe to get accurate and detailed predictions about themselves. Our free Kundli-making tool will provide you with a thorough understanding of your destiny, allowing you to make more accurate and precise decisions in life.
If you want to get your Kundli online, our mobile app, available on Android and iOS, will be a valuable asset. It has some fabulous features for astrology enthusiasts. Our Kundli software is multilingual and supports both English and Hindi. So, whether you want your Janam kundli in Hindi or English, our software will provide immediate access to your birth chart information.
Once you have a basic analysis of your horoscope, you can consult Astroyogi's expert astrologers online for more detailed and accurate Kundli predictions. The best thing is that you can talk to the top astrologers online 24/7, from the convenience of your home or on the go.          </p>
        </section>

        <TopAstrologers />
        <Blogs />
      </div>

      <Footer />
    </>
  );
}
