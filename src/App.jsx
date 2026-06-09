import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContactProvider } from './context/ContactContext'
import CustomCursor    from './components/CustomCursor'
import ScrollProgress  from './components/ScrollProgress'
import Loader          from './components/Loader'
import Navbar          from './components/Navbar'
import Footer          from './components/sections/Footer'
import ContactModal    from './components/ContactModal'

import HomePage        from './pages/HomePage'
import AboutPage       from './pages/AboutPage'
import ServicesPage    from './pages/ServicesPage'
import PortfolioPage   from './pages/PortfolioPage'
import TeamPage        from './pages/TeamPage'
import BlogPage        from './pages/BlogPage'
import PrivacyPage     from './pages/PrivacyPage'
import TermsPage       from './pages/TermsPage'
import CookiesPage     from './pages/CookiesPage'
import SitemapPage     from './pages/SitemapPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AnimatedRoutes({ children }) {
  const { pathname } = useLocation()
  const key = useRef(pathname)
  if (key.current !== pathname) key.current = pathname
  return (
    <div key={key.current} className="page-enter">
      {children}
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923110868172"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25d366, #128c7e)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        boxShadow: '0 4px 24px rgba(37,211,102,0.5)',
        zIndex: 9999,
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        animation: 'waPulse 2s ease-in-out infinite',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.14) rotate(-6deg)'
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(37,211,102,0.75)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.5)'
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.468.648 4.883 1.882 7.01L2 30l7.2-1.854A13.93 13.93 0 0016.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.46a11.58 11.58 0 01-5.892-1.608l-.424-.25-4.272 1.1 1.126-4.152-.276-.436A11.46 11.46 0 014.54 16.004c0-6.32 5.144-11.46 11.464-11.46s11.46 5.14 11.46 11.46-5.14 11.456-11.46 11.456zm6.288-8.572c-.344-.172-2.04-1.004-2.356-1.12-.316-.112-.548-.172-.776.172-.232.344-.892 1.12-1.092 1.348-.2.228-.4.256-.744.084-.344-.172-1.452-.536-2.764-1.704-1.02-.912-1.708-2.036-1.908-2.38-.2-.344-.02-.528.15-.7.156-.156.344-.4.516-.604.172-.2.228-.344.344-.572.116-.228.056-.428-.028-.604-.084-.172-.776-1.872-1.064-2.56-.28-.672-.564-.58-.776-.588l-.66-.012c-.228 0-.6.084-.916.428-.316.344-1.208 1.18-1.208 2.876s1.236 3.336 1.408 3.564c.172.228 2.432 3.712 5.892 5.204.824.356 1.468.568 1.968.728.828.264 1.58.228 2.176.14.664-.1 2.04-.832 2.328-1.636.288-.8.288-1.488.2-1.632-.084-.144-.312-.228-.656-.4z"/>
      </svg>
    </a>
  )
}

function AppContent() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Inject WhatsApp pulse keyframe once
    if (!document.getElementById('wa-keyframe')) {
      const s = document.createElement('style')
      s.id = 'wa-keyframe'
      s.textContent = `@keyframes waPulse{0%{box-shadow:0 4px 24px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 4px 24px rgba(37,211,102,.5),0 0 0 18px rgba(37,211,102,0)}100%{box-shadow:0 4px 24px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,0)}}`
      document.head.appendChild(s)
    }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setLoaded(true)
      document.body.style.overflow = ''
    }, 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <ScrollProgress />
      <Loader done={loaded} />
      <Navbar />
      <ContactModal />
      <WhatsAppButton />
      <main>
        <AnimatedRoutes>
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/services"  element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/team"      element={<TeamPage />} />
            <Route path="/blog"      element={<BlogPage />} />
            <Route path="/privacy"   element={<PrivacyPage />} />
            <Route path="/terms"     element={<TermsPage />} />
            <Route path="/cookies"   element={<CookiesPage />} />
            <Route path="/sitemap"   element={<SitemapPage />} />
            <Route path="/contact"   element={<Navigate to="/" replace />} />
            <Route path="*"          element={<HomePage />} />
          </Routes>
        </AnimatedRoutes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ContactProvider>
          <AppContent />
        </ContactProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
