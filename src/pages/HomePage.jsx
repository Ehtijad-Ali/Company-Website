import React from 'react'
import Hero             from '../components/sections/Hero'
import About            from '../components/sections/About'
import Services         from '../components/sections/Services'
import TechGlobeSection from '../components/sections/TechGlobeSection'
import StatsCounter     from '../components/sections/StatsCounter'
import MarqueeSection   from '../components/sections/MarqueeSection'
import Testimonials     from '../components/sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <TechGlobeSection />
      <StatsCounter />
      <MarqueeSection />
      <Testimonials />
    </>
  )
}
