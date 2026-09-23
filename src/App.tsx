import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'
import SmoothScroll from './components/ui/SmoothScroll'
import Hero from './sections/Hero/Hero'
import SelectedWork from './sections/SelectedWork/SelectedWork'
import StudioIntro from './sections/StudioIntro/StudioIntro'
import Numbers from './sections/Numbers/Numbers'
import Approach from './sections/Approach/Approach'
import FeaturedProject from './sections/FeaturedProject/FeaturedProject'
import Services from './sections/Services/Services'
import Journal from './sections/Journal/Journal'
import Contact from './sections/Contact/Contact'

export default function App() {
  return (
    <SmoothScroll>
      {/* Custom cursor — desktop pointer:fine only */}
      <Cursor />

      {/* Sticky navbar — slides in after hero scroll */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* Hero section — full viewport, editorial layout */}
        <Hero />

        {/* Selected Work — horizontal glide stage with StudioIntro reveal */}
        <SelectedWork reveal={<StudioIntro />} />

        {/* Numbers & Philosophy — dark section */}
        <Numbers />

        {/* Our Approach — 4 numbered steps */}
        <Approach />

        {/* Featured Project — Casa Lumen case study */}
        <FeaturedProject />

        {/* Services — hover-reveal image list */}
        <Services />

        {/* Journal — 3-column post grid */}
        <Journal />

        {/* Contact & CTA */}
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
