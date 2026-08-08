import React from 'react'
import Hero             from '../components/sections/Hero'
import About            from '../components/sections/About'
import Services         from '../components/sections/Services'
import TechGlobeSection from '../components/sections/TechGlobeSection'
import StatsCounter     from '../components/sections/StatsCounter'
import MarqueeSection   from '../components/sections/MarqueeSection'
import Team             from '../components/sections/Team'
import Testimonials     from '../components/sections/Testimonials'
import FAQ              from '../components/sections/FAQ'
import CTA              from '../components/sections/CTA'

/**
 * Home page order follows the questions a prospect actually asks, in order:
 * who are you (01–02) → what do you do (03–04) → does it work (05–06) →
 * who would I work with (07) → do others trust you (08) → what about… (09)
 * → and then the ask.
 *
 * Team, FAQ and the closing CTA were built but never mounted here; the page
 * previously ended on testimonials without ever asking for the business.
 */
export default function HomePage() {
  return (
    <>
      <Hero />              {/* 01 */}
      <About />             {/* 02 */}
      <Services />          {/* 03 */}
      <TechGlobeSection />  {/* 04 */}
      <StatsCounter />      {/* 05 */}
      <MarqueeSection />    {/* 06 */}
      <Team />              {/* 07 */}
      <Testimonials />      {/* 08 */}
      <FAQ />               {/* 09 */}
      <CTA />
    </>
  )
}
