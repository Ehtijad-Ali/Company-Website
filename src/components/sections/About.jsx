import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ParallaxSection } from '../ui/AnimationKit'

const E = [0.22, 1, 0.36, 1]

const PILLARS = [
  { n: '01', text: 'Innovation-first on every project'    },
  { n: '02', text: 'Pixel-perfect design execution'       },
  { n: '03', text: 'Performance-optimised from day one'   },
  { n: '04', text: 'Transparent, agile collaboration'     },
  { n: '05', text: 'Post-launch growth & support'         },
  { n: '06', text: 'World-class engineering standards'    },
]


function ManifestoPanel({ inView }) {
  const words = ['WE', 'BUILD', 'WHAT', 'OTHERS', 'ONLY', 'IMAGINE.']
  const solid = [false, true, false, false, true, false]

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: E }}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        overflow: 'hidden',
        padding: '3rem 2.5rem 2.5rem',
        minHeight: 420,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 20% 110%, rgba(120,80,255,0.07), transparent)',
      }} />

      {/* Scan line */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Top label */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>/ Manifesto</span>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
      </div>

      {/* Large statement */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.1em' }}>
        {words.map((w, i) => (
          <div key={w} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.8, ease: E }}
              style={{
                fontFamily: 'Nasalization, Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: solid[i] ? 'var(--text-primary)' : 'transparent',
                WebkitTextStroke: solid[i] ? undefined : '1px var(--border-hover, var(--border))',
              }}
            >{w}</motion.div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{
          marginTop: '2.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Est. 2014
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          30+ Countries
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative section" style={{ background: 'var(--bg-surface)' }}>

      <div className="container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex items-start justify-between gap-8"
        >
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg mb-5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase"
                style={{ color: 'var(--text-secondary)' }}>About CodeNode</span>
            </div>

            <h2 className="section-title mb-4">Who We Are</h2>

            <p className="section-sub" style={{ maxWidth: '32rem' }}>
              A full-stack digital powerhouse bridging stunning design and powerful
              engineering — serving ambitious clients across 30+ countries.
            </p>
          </div>

          {/* Watermark + founded pill */}
          <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
            <span
              className="font-syne font-extrabold"
              style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1, color: 'transparent',
                       WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em', userSelect: 'none' }}
            >02</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
              <span className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}>Founded 2024 · New agency</span>
            </div>
          </div>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 xl:gap-14 mb-0">

          {/* Left — manifesto */}
          <ManifestoPanel inView={inView} />

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: E }}
            className="flex flex-col justify-center"
          >
            <p className="section-sub mb-10">
              Every pixel we craft, every line of code we write — in service of one goal:
              making your digital presence impossible to ignore.
            </p>

            {/* Numbered pillars */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: E }}
                  className="group flex items-center gap-5 py-3.5"
                  style={{ borderBottom: '1px solid var(--border)', cursor: 'default' }}
                >
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
                    letterSpacing: '0.12em', color: 'var(--text-muted)',
                    transition: 'color 0.2s', width: '1.8rem', flexShrink: 0,
                  }}
                    className="group-hover:text-[var(--text-primary)]"
                  >{p.n}</span>
                  <div className="w-px h-3 shrink-0" style={{ background: 'var(--border)' }} />
                  <span style={{
                    fontSize: '0.82rem', color: 'var(--text-secondary)',
                    transition: 'color 0.2s',
                  }}
                    className="group-hover:text-[var(--text-primary)]"
                  >{p.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-8"
            >
              <Link to="/about" className="btn btn-primary btn-hover-micro micro-click hover-lift">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
