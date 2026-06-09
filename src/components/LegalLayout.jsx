import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function SectionBlock({ section, i, onInView }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-35% 0px -55% 0px' })

  useEffect(() => { if (inView) onInView() }, [inView])

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em',
          color: 'var(--text-muted)', paddingTop: '0.45rem', flexShrink: 0,
        }}>{String(i + 1).padStart(2, '0')}</span>
        <h2 style={{
          fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 700, fontSize: '1.2rem',
          color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
        }}>{section.title}</h2>
      </div>

      <div style={{ paddingLeft: '2.25rem' }}>
        {section.content.map((block, bi) => {
          if (block.type === 'p') return (
            <p key={bi} style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: '0.9rem' }}>
              {block.text}
            </p>
          )
          if (block.type === 'list') return (
            <ul key={bi} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
              {block.items.map((item, ii) => (
                <li key={ii} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', paddingTop: '0.3rem', flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          )
          if (block.type === 'highlight') return (
            <div key={bi} style={{
              padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '1rem',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
            }}>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: 0 }}>{block.text}</p>
            </div>
          )
          return null
        })}
      </div>
    </motion.div>
  )
}

export default function LegalLayout({ badge, title, tagline, updated, number, sections }) {
  const [active, setActive] = useState(sections[0].id)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div style={{ background: 'var(--bg-surface)', minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* Top hero strip */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', paddingTop: '7rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
        {/* Ghost number */}
        <span className="hidden lg:block" style={{
          position: 'absolute', right: 'max(1.5rem, calc((100% - 1200px)/2 + 1.5rem))',
          top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 800,
          fontSize: 'clamp(6rem, 14vw, 15rem)', lineHeight: 1,
          color: 'transparent', WebkitTextStroke: '1px var(--ghost-stroke)',
          letterSpacing: '-0.04em', userSelect: 'none', pointerEvents: 'none',
        }}>{number}</span>

        <div className="container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase mb-8 transition-colors hover:text-accent"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <ArrowLeft style={{ width: '0.75rem', height: '0.75rem' }} /> Back to Home
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="chip text-[10px]">{badge}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Last updated: {updated}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Nasalization, Montserrat, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', letterSpacing: '-0.02em',
            color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem',
          }}>{title}</h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '38rem', lineHeight: 1.75 }}>
            {tagline}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ paddingTop: '4rem' }}>
        <div style={{ display: 'flex', gap: '3.5rem', alignItems: 'flex-start' }}>

          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block" style={{ width: '13rem', flexShrink: 0, position: 'sticky', top: '6rem' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Contents
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {sections.map(s => (
                <li key={s.id}>
                  <button onClick={() => scrollTo(s.id)} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '0.45rem 0.75rem', borderRadius: '8px',
                    fontFamily: 'Syne, Montserrat, sans-serif',
                    fontSize: '0.78rem', fontWeight: active === s.id ? 600 : 400,
                    color: active === s.id ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: active === s.id ? 'var(--bg-card)' : 'transparent',
                    border: active === s.id ? '1px solid var(--border)' : '1px solid transparent',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}>{s.title}</button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div style={{ flex: 1, maxWidth: '54rem' }}>
            {sections.map((s, i) => (
              <SectionBlock key={s.id} section={s} i={i} onInView={() => setActive(s.id)} />
            ))}

            {/* Footer note */}
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>📬</span>
              <div>
                <p style={{ fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Questions about this policy?
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Reach us at <a href="mailto:legal@codenode.io" style={{ color: 'var(--accent)', textDecoration: 'none' }}>legal@codenode.io</a> — we aim to respond within 2 business days.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
