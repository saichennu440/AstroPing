import Header from './components/Header'
import Hero from './components/Hero'
//import Services from './components/Services'
import TopAstrologers from './components/TopAstrologers'
import ScheduleAppointment from './components/ScheduleAppointment'
import TodaysPrediction from './components/TodaysPrediction'
import OurServices from './components/OurServices'
import ConsultAstrologer from './components/ConsultAstrologer'
//import FreeServices from './components/FreeServices'
import Blog from './components/Blog'
import Stats from './components/Stats'
import Astrologers from './components/Astrologers'
import WhyHoroscope from './components/WhyHoroscope'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      {/* <Services /> */}
      <TopAstrologers />
      <ScheduleAppointment />
      <TodaysPrediction />
      <OurServices />
      <ConsultAstrologer />
      
      <Blog />
      <Stats />
      <Astrologers />
      <WhyHoroscope />
      <Footer />
    </div>
  )
}

export default App