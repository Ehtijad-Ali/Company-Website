import React, { useEffect, useState } from 'react'
import CodeNodeLogo from './CodeNodeLogo'

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

export default function Loader({ done }) {
  const [pct,     setPct]     = useState(0)
  const [visible, setVisible] = useState(false)
  const [phase,   setPhase]   = useState('idle') // idle | in | cut | open | gone

  // Fade content in shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setPhase('in'), 120)
    const v = setTimeout(() => setVisible(true), 80)
    return () => { clearTimeout(t); clearTimeout(v) }
  }, [])

  // Progress ticker
  useEffect(() => {
    const t = setInterval(() => setPct(p => Math.min(p + Math.random() * 22, 100)), 110)
    return () => clearInterval(t)
  }, [])

  // Exit sequence when done
  useEffect(() => {
    if (!done) return
    const t1 = setTimeout(() => setPhase('cut'),  80)   // content fades + line glows
    const t2 = setTimeout(() => setPhase('open'), 480)  // panels slide apart
    const t3 = setTimeout(() => setPhase('gone'), 1600) // unmount
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [done])

  if (phase === 'gone') return null

  const isIn   = phase === 'in'
  const isCut  = phase === 'cut'
  const isOpen = phase === 'open'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      overflow: 'hidden',
    }}>

      {/* ── Left panel ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '50%', height: '100%',
        background: 'var(--bg)',
        transformOrigin: 'left center',
        transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: isOpen ? `transform 1.1s ${EASE}` : 'none',
        willChange: 'transform',
      }}>
        {/* Inner shadow at crease */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 48,
          background: 'linear-gradient(90deg, transparent, rgba(27,20,18,0.05))',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.25s',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Right panel ── */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50%', height: '100%',
        background: 'var(--bg)',
        transformOrigin: 'right center',
        transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
        transition: isOpen ? `transform 1.1s ${EASE}` : 'none',
        willChange: 'transform',
      }}>
        {/* Inner shadow at crease */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 48,
          background: 'linear-gradient(-90deg, transparent, rgba(27,20,18,0.05))',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.25s',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Center spine / cut line ── */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: 1, zIndex: 20,
        background: isCut
          ? 'linear-gradient(180deg, transparent 0%, var(--primary) 30%, var(--primary) 70%, transparent 100%)'
          : 'var(--border)',
        boxShadow: isCut ? '0 0 16px 2px var(--primary)' : 'none',
        opacity: isOpen ? 0 : 1,
        transition: 'background 0.25s, box-shadow 0.25s, opacity 0.2s',
        pointerEvents: 'none',
      }} />

      {/* Blade dot — sharp zig-zag cut (keyframe in index.css) */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', zIndex: 21,
        width: 7, height: 7, borderRadius: '50%',
        background: 'var(--primary)',
        boxShadow: '0 0 12px 4px var(--primary)',
        opacity: isCut ? 1 : 0,
        animation: isCut ? 'blade-cut 0.55s linear forwards' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ── Centered content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 30,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: isIn ? 1 : 0,
        transform: isIn ? 'translateY(0)' : isCut ? 'translateY(-14px)' : 'translateY(10px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: 'none',
      }}>

        {/* The real wordmark — same component the navbar and footer render, so
            the first thing a visitor sees is the actual brand rather than a
            placeholder chevron and a text approximation of the name. */}
        <div style={{
          marginBottom: 18,
          opacity: isIn ? 1 : 0,
          transform: isIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
          maxWidth: 'calc(100vw - 3rem)',
        }}>
          <CodeNodeLogo height={46} />
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem', letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)', margin: '0 0 38px',
        }}>
          Digital Product Studio
        </p>

        {/* Progress bar */}
        <div style={{ width: 210 }}>
          <div style={{
            height: 2, borderRadius: 'var(--r-full)', marginBottom: 10,
            overflow: 'hidden', background: 'var(--border)',
          }}>
            <div style={{
              height: '100%', borderRadius: 'var(--r-full)',
              background: 'var(--brand)',
              width: `${pct}%`,
              transition: 'width 0.1s linear',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.12em',
                           textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Loading
            </span>
            <span className="tnum" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-secondary)' }}>
              {Math.round(pct)}%
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
