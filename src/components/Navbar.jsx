import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useContact } from '../context/ContactContext'
import { Sun, Moon, Menu, X } from 'lucide-react'
import CodeNodeLogo from './CodeNodeLogo'

const LINKS = [
  { to: '/',            label: 'Home'         },
  { to: '/about',       label: 'About'        },
  { to: '/services',    label: 'Services'     },
  { to: '/portfolio',   label: 'Portfolio'    },
  { to: '/team',        label: 'Team'         },
  { to: '/blog',        label: 'Blog'         },
]

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  const { openContact } = useContact()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 py-4"
    >
      <div
        className={`max-w-[1500px] mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-400${scrolled ? ' navbar-blur' : ''}`}
        style={{
          background: scrolled ? 'var(--bg-card)' : 'transparent',
          border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.10)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <CodeNodeLogo height={32} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ color: active ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                {active && (
                  <motion.span
                    layoutId="nav-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover-scale micro-click"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
          >
            <AnimatePresence mode="wait">
              {isDark
                ? <motion.span key="sun"  initial={{ rotate: -90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:.2 }}><Sun  className="w-4 h-4" style={{ color: '#FBBF24' }} /></motion.span>
                : <motion.span key="moon" initial={{ rotate:  90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:.2 }}><Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} /></motion.span>
              }
            </AnimatePresence>
          </button>

          <button onClick={openContact} className="hidden md:flex btn btn-primary btn-hover-micro micro-click text-sm">
            Let's Talk
          </button>

          <button onClick={() => setOpen(v => !v)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-[1500px] mx-auto mt-2 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {LINKS.map(({ to, label }, i) => (
              <motion.div key={to} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={to}
                  className="flex items-center px-6 py-4 text-sm font-medium transition-colors"
                  style={{ color: pathname === to ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <div className="p-4">
              <button onClick={() => { openContact(); setOpen(false) }} className="btn btn-primary w-full justify-center">Let's Talk</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
