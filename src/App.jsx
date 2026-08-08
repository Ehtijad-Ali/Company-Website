import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContactProvider } from './context/ContactContext'
import { AuthProvider } from './context/AuthContext'
import CustomCursor    from './components/CustomCursor'
import ScrollProgress  from './components/ScrollProgress'
import Loader          from './components/Loader'
import Navbar          from './components/Navbar'
import Footer          from './components/sections/Footer'
import ContactModal    from './components/ContactModal'
import ChatWidget      from './components/ChatWidget'
import ProtectedRoute  from './components/ProtectedRoute'

import HomePage        from './pages/HomePage'
import AboutPage       from './pages/AboutPage'
import ServicesPage    from './pages/ServicesPage'
import PortfolioPage   from './pages/PortfolioPage'
import TeamPage        from './pages/TeamPage'
import MemberProfilePage from './pages/MemberProfilePage'
import BlogPage        from './pages/BlogPage'
import PrivacyPage     from './pages/PrivacyPage'
import TermsPage       from './pages/TermsPage'
import CookiesPage     from './pages/CookiesPage'
import SitemapPage     from './pages/SitemapPage'
import LoginPage       from './pages/LoginPage'
import RegisterPage    from './pages/RegisterPage'
import AdminPage       from './pages/AdminPage'
import NotFoundPage    from './pages/NotFoundPage'

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

function AppContent() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
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
      <ChatWidget />
      <main>
        <AnimatedRoutes>
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/services"  element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/team"       element={<TeamPage />} />
            <Route path="/team/:slug" element={<MemberProfilePage />} />
            <Route path="/blog"      element={<BlogPage />} />
            <Route path="/privacy"   element={<PrivacyPage />} />
            <Route path="/terms"     element={<TermsPage />} />
            <Route path="/cookies"   element={<CookiesPage />} />
            <Route path="/sitemap"   element={<SitemapPage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />
            <Route path="/admin"     element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
            <Route path="/contact"   element={<Navigate to="/" replace />} />
            <Route path="/404"        element={<NotFoundPage />} />
            <Route path="*"          element={<Navigate to="/404" replace />} />
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
        <AuthProvider>
          <ContactProvider>
            <AppContent />
          </ContactProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
