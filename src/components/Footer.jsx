import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <img className='img' src="/assets/image 4.png" alt="AstroPing" />
              </div>
              <h2>AstroPing</h2>
            </div>
            <div className="company-info">
              <p>5th Floor, RR building, Biryani times<br/>
              Oppo, Madhapur - 500081, Hyderabad,<br/>
              Telangana, India</p>
              <p className="company-name">Credmarg technologies Pvt Ltd</p>
            </div>
          </div>
          
          <div className="footer-sections">
            <div className="footer-section">
              <h3>Astrologer</h3>
              <ul>
                <li><a href="#">Astrologer Registration</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Horoscope</h3>
              <ul>
                <li><a href="/horoscope">Daily Horoscope</a></li>
                <li><a href="/DeleteAccount">Delete Account</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Corporate Info</h3>
              <ul>
                <li><a href="#">Terms And Conditions</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Disclaimer</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer