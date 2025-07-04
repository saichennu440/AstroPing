// src/components/Header.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// nav items with dropdown indicator
const NAV_ITEMS = [
  { label: 'Home', hasDropdown: false, path: '/'  },
  { label: 'Consult Now', hasDropdown: false, path: '/topastrologers' },
  { label: 'Horoscope', hasDropdown: false, path: '/horoscope' },
  { label: 'Year 2025', hasDropdown: true, path:'/coming'},
  { label: 'Panchang', hasDropdown: true, path: '/panchang' },
  { label: 'Kundli', hasDropdown: false, path: '/panchang/kundli' },
  //{ label: 'Numerology', hasDropdown: false },
 { label: 'Tarot', hasDropdown: false, path:'/tarot' },
  { label: 'Free Readings', hasDropdown: true },
  { label: 'Blog', hasDropdown: false, path:'/blogs' },
  //{ label: 'Session Booking', hasDropdown: false },
]

export default function Header({
  user,
  onSignInClick,
  onProfileClick,
  onLogout,
}) {
  const [active, setActive] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
    // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

    const handleNavClick = (label, path) => {
    setActive(label)
    navigate(path)
    setMobileMenuOpen(false) // close mobile menu if open
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="header-container">
       <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .header-container {
        position: static;    /* ← make it stick */
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Desktop Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


        .container {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 0 60px;
        }
.nav-link {
      background-color: transparent;
    }
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          border-bottom: 1px solid #ECECEC;
        }

        .bottom-bar {
          display: flex;
          align-items: center;
          height: 48px;
          border-bottom: 1px solid #ECECEC;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FF6B35;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: #333;
          padding: 8px;
        }

        .sign-in-btn {
          background: #FF6B35;
          color: #fff;
          padding: 8px 20px;
          border-radius: 4px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .sign-in-btn:hover {
          background: #e55d2a;
        }

        .nav {
          display: flex;
          justify-content: center;
          flex: 1;
          gap: 10px;
              
        }

        .nav-link {
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
        color: #333;
          text-decoration: none;
          padding-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .nav-link.active,
        .nav-link:hover {
          color: #FF6B35;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: #FF6B35;
          border-radius: 2px 2px 0 0;
        }

        .caret {
          display: inline-block;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          width: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
        }
.user-menu {
          position: relative;
        }
        .user-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        /* Inline SVG will scale automatically */
        .user-icon-btn svg {
          width: 32px;
          height: 32px;
          fill: #333;
        }
        .user-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          background: white;
          list-style: none;         /* remove bullets */
          margin: 0;                 /* remove default margin */
          padding: 8px 0;            /* vertical padding */
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          z-index: 1500;
          min-width: 140px;
        }
        .user-dropdown li {
          padding: 8px 16px;
          cursor: pointer;
          white-space: nowrap;
        }
        .user-dropdown li + li {
          margin-top: 4px;
        }
        .user-dropdown li:hover {
          background: #f5f5f5;
        }
        .mobile-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: #333;
          transition: 0.3s;
          border-radius: 1px;
        }

        .mobile-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Hide mobile navigation on desktop */
        .mobile-nav {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .container {
            padding: 0 15px;
          }

          .top-bar {
            height: 60px;
            position: relative;
          }

          .bottom-bar {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .mobile-nav {
            display: block;
          }

          .header-controls {
            gap: 15px;
          }

          .sign-in-btn {
            padding: 6px 16px;
            font-size: 0.9rem;
          }

          .logo-text {
            font-size: 1.3rem;
            margin-top: -15px;
          }

          .logo-icon {
            width: 35px;
            height: 35px;
          }

          .mobile-nav {
            position: fixed;
            top: 60px;
            bottom: 0;               /* extend to bottom */
            left: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
            height: calc(100vh - 60px);  /* full height under header */
            overflow-y: auto;            /* now scrollable */
            -webkit-overflow-scrolling: touch;
          }

          .mobile-nav.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .mobile-nav-content {
            padding: 20px 15px;
          }

          .mobile-nav-link {
  display: block;              /* full width */
  width: 100%;
  padding: 12px 16px;          /* comfortable touch area */
  font-size: 1rem;
  font-weight: 500;
  color: #333;                 /* default text color */
  text-align: left;            /* left align */
  background: none;            /* transparent background */
  border: none;                /* remove default button styles */
  border-bottom: 1px solid #f0f0f0;  /* thin separator */
  cursor: pointer;
  transition: color 0.2s;
  position: relative;          /* for pseudo/caret */
          }

          .mobile-nav-link:last-child {
            border-bottom: none;
          }

          .mobile-nav-link:hover,
          .mobile-nav-link.active {
            color: #FF6B35;
          }

          /* Caret on the right for dropdowns */
.mobile-nav-link .caret {
  margin-left: auto;           /* push it to far right */
  transition: transform 0.2s;
}

          .mobile-nav-link.active .caret,
.mobile-nav-link:hover .caret {
  transform: rotate(180deg);
}
.mobile-nav.open .mobile-nav-content {
  padding: 0; /* remove the 20px horizontal from before */
}

/* If you still want a bit of left padding overall: */
.mobile-nav-content {
  padding: 0 8px; /* small gutter instead of 20px */
}
        @media (max-width: 480px) {
          .container {
            padding: 0 10px;
          }

          .logo-text {
            font-size: 1.0rem;
            margin-left:4px;
            margin-top: -12px;
          }
img.img {
      width: 37px; /* Or your desired width */
      height: auto; /* To maintain aspect ratio, or a specific height */
 margin-right:6px;
 margin-top:3px;
      }
          .logo-icon {
            width: 32px;
            height: 32px;
          }
.mobile-nav-link {
background-color: transparent;
}
          .header-controls {
            gap: 10px;
          }

          .sign-in-btn {
            padding: 6px 12px;
            font-size: 0.85rem;
          }

          .btn {
            font-size: 0.85rem;
            padding: 6px;
          }
        }
      `}</style>

      <header className="header">
        {/* top bar */}
        <div className="container top-bar">
          <div className="logo">
            <div className="logo-icon">
              <img
                className="img"
                src="/assets/image 4.png"
                alt="AstroPing"
              />
            </div>
            <span className="logo-text">AstroPing</span>
          </div>

          <div className="header-controls">
            <button className="btn lang-btn">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM1.083 8a6.917 6.917 0 0 1 12.272-4.71v1.345H9.625A13.32 13.32 0 0 0 8 8c.61.01 1.226.07 1.973.365l1.756.545v1.345H3.356a6.91 6.91 0 0 1-2.273-2.255zM8 14.917A6.917 6.917 0 0 1 1.083 8h1.345v1.345c.065.01.13.026.195.038a13.32 13.32 0 0 0 4.382 3.2v1.345zm1.963-1.209a13.33 13.33 0 0 0 4.383-3.2c.065-.011.13-.027.195-.038V8h1.345A6.917 6.917 0 0 1 8 14.917v-1.209z"/>
              </svg>
              
              <span>Eng</span>
            </button>

            <button className="btn notif-btn" aria-label="Notifications">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            {!user ? (
              <button
                className="btn sign-in-btn"
                onClick={onSignInClick}
              >
                Sign In
              </button>
            ) : (
              <div className="user-menu">
                <button
                  className="user-icon-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-label="User menu"
                >
                 {/* Inline user SVG */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <ul className="user-dropdown">
                    <li
                      onClick={() => {
                        setUserMenuOpen(false)
                        onProfileClick()
                      }}
                    >
                      My Profile
                    </li>
                    <li
                      onClick={() => {
                        setUserMenuOpen(false)
                        onLogout()
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            )}

            <button
              className={`mobile-toggle ${
                mobileMenuOpen ? 'open' : ''
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Desktop bottom nav bar */}
        <div className="container bottom-bar">
          <nav className="nav">
            {NAV_ITEMS.map(({ label, hasDropdown, path }) => (
              <button
                key={label}
                className={`nav-link${active === label ? ' active' : ''}`}
                onClick={() => handleNavClick(label, path)}
              >
                {label}
                {hasDropdown && <span className="caret">▾</span>}
              </button>
            ))}
          </nav>
        </div>


        {/* Mobile navigation */}
        <div
          className={`mobile-nav ${
            mobileMenuOpen ? 'open' : ''
          }`}
        >
          <div className="mobile-nav-content">
            {NAV_ITEMS.map(({ label, hasDropdown, path }) => (
              <button
                key={label}
                className={`mobile-nav-link${active === label ? ' active' : ''}`}
                onClick={() => handleNavClick(label, path)}
              >
                <span>{label}</span>
                {hasDropdown && (
                  <svg
                    className="caret"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>
    </div>
  )
}
Header.propTypes = {
  user: PropTypes.object,
  onSignInClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}
