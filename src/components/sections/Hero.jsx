import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { TypingText, ParallaxSection } from '../ui/AnimationKit'

const STATS = [
  { value: '500+', label: 'Projects'     },
  { value: '98%',  label: 'Satisfaction' },
  { value: '10+',  label: 'Years'        },
  { value: '30+',  label: 'Countries'   },
]

const TECH = ['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'TypeScript', 'TensorFlow', 'Docker', 'GraphQL', 'Figma', 'Three.js', 'Kubernetes']

const E = [0.22, 1, 0.36, 1]
const LINES = ['We Build', 'What Others', 'Only Imagine.']

/* ─── Syntax colours ─── */
const K = '#c084fc'
const S = '#fb923c'
const F = '#60a5fa'
const D = 'var(--terminal-text)'
const C = 'var(--terminal-comment)'
const G = '#34d399'
const Y = '#fbbf24'

const CODE_LINES = [
  [[C, '# CodeNode · AI Stack Configuration']],
  null,
  [[K,'from'],[D,' codenode.ai '],[K,'import'],[D,' '],[F,'Agent'],[D,', '],[F,'Pipeline']],
  [[K,'from'],[D,' codenode.tools '],[K,'import'],[D,' '],[F,'search'],[D,', '],[F,'execute']],
  null,
  [[F,'agent'],[D,' = '],[F,'Agent'],[D,'(']],
  [[D,'    model='],[S,'"claude-opus-4"'],[D,',']],
  [[D,'    tools=['],[F,'search'],[D,', '],[F,'execute'],[D,'],']],
  [[D,'    memory='],[K,'True'],[D,',']],
  [[D,')']],
  null,
  [[Y,'@agent.on'],[D,'('],[S,'"reasoning"'],[D,')']],
  [[K,'async'],[D,' '],[K,'def'],[D,' '],[F,'handle_step'],[D,'(step):']],
  [[D,'    '],[F,'print'],[D,'('],[S,'f"→ {step.thought}"'],[D,')']],
  null,
  [[F,'pipeline'],[D,' = '],[F,'Pipeline'],[D,'([']],
  [[D,'    agent.'],[F,'analyse'],[D,',']],
  [[D,'    agent.'],[F,'synthesise'],[D,',']],
  [[D,'    agent.'],[F,'report'],[D,',']],
  [[D,'])']],
  null,
  [[D,'result = '],[K,'await'],[D,' '],[F,'pipeline'],[D,'.'],[F,'run'],[D,'(']],
  [[D,'    task='],[S,'"Optimise tech stack"'],[D,',']],
  [[D,')']],
  null,
  [[C,'# → Loading context...']],
  [[C,'# → Analysing stack...']],
  [[C,'# → Generating plan...']],
  [[G,'# ✓ Done in 1.8s']],
]

function CodeTerminal() {
  const [shown, setShown]   = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    if (shown >= CODE_LINES.length) {
      const id = setTimeout(() => setShown(0), 3200)
      return () => clearTimeout(id)
    }
    const isBlank = CODE_LINES[shown] === null
    const id = setTimeout(() => setShown(v => v + 1), isBlank ? 50 : 360)
    return () => clearTimeout(id)
  }, [shown])

  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  const WINDOW = 15
  const offset = Math.max(0, shown - WINDOW)
  const frameLines = Array.from({ length: WINDOW }, (_, i) => CODE_LINES[offset + i] ?? null)

  /* 15 lines × (0.72rem × 1.72 line-height) = 18.576rem */
  const CODE_H = '18.576rem'

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: E }}
      style={{
        background: 'var(--terminal-bg)',
        border: '1px solid var(--terminal-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.1rem', flexShrink: 0,
        borderBottom: '1px solid var(--terminal-divider)',
        background: 'var(--terminal-header)',
      }}>
        {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{ marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--terminal-label)', letterSpacing: '0.05em' }}>
          agent.py
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--terminal-label)' }}>running</span>
        </div>
      </div>

      {/* Code area — fixed height so the card stays stable */}
      <div style={{ flex: 1, padding: '1rem 1.4rem', overflow: 'hidden', minHeight: CODE_H }}>
        <pre style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          lineHeight: 1.72,
          margin: 0, padding: 0,
          whiteSpace: 'pre',
          minHeight: CODE_H,
        }}>
          {frameLines.map((line, li) =>
            line === null
              ? <div key={li} style={{ height: '1.72em' }} />
              : (
                <div key={li}>
                  {line.map(([col, txt], ti) => (
                    <span key={ti} style={{ color: col }}>
                      {txt}
                    </span>
                  ))}
                </div>
              )
          )}
          <span style={{ opacity: cursor ? 1 : 0, color: D }}>▌</span>
        </pre>
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.5rem 1.1rem', flexShrink: 0,
        borderTop: '1px solid var(--terminal-divider)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--terminal-footer)' }}>
          Python 3.12 · UTF-8
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--terminal-footer)' }}>
          Ln {shown}, Col 1
        </span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}>

      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% -5%, var(--glow), transparent)' }} />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6, ease: E }}
        className="container relative z-10 flex items-center justify-between"
        style={{ paddingTop: '7rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--text-muted)' }}>
              CodeNode / Studio
            </span>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--text-secondary)' }}>
              Founded 2024
            </span>
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--text-secondary)' }}>
              Cozy · Inviting · Timeless
            </span>
          </div>
          <span
            className="font-syne font-extrabold hidden lg:block pointer-events-none select-none"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1, color: 'transparent',
                     WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em' }}
          >01</span>
        </div>
        <span className="badge">
          <span className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)', animation: 'pulse-ring 2s ease-in-out infinite' }} />
          Available for new projects
        </span>
      </motion.div>

      {/* Two-column hero — items-stretch so terminal matches left height */}
      <div className="container relative z-10 flex-1 grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-stretch py-14">

        {/* ── Left: content ── */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: E }}
            className="font-mono text-[10px] tracking-[0.35em] uppercase mb-7"
            style={{ color: 'var(--text-muted)' }}
          >
            01 — Crafting the Future
          </motion.p>

          {LINES.map((line, i) => (
            <div key={line} style={{ overflow: 'hidden', lineHeight: 1.1 }}>
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.28 + i * 0.13, duration: 0.95, ease: E }}
                className="font-syne font-extrabold"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  letterSpacing: '-0.02em',
                  color: i === 2 ? 'transparent' : 'var(--text-primary)',
                  WebkitTextStroke: i === 2 ? '1px var(--text-primary)' : undefined,
                  paddingBottom: i < 2 ? '0.05em' : '0.15em',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: E }}
            style={{ height: '1px', background: 'var(--border)', transformOrigin: 'left', marginTop: '2rem', marginBottom: '2rem' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: E }}
            className="section-sub mb-3"
          >
            A premium digital agency specialising in{' '}
            <TypingText
              words={['AI-driven platforms.', 'immersive 3D experiences.', 'enterprise web apps.', 'stunning UI/UX design.']}
              speed={62}
              pauseMs={1800}
              style={{ color: 'var(--text-primary)', fontWeight: 600 }}
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: E }}
            className="section-sub mb-8"
            style={{ fontSize: '0.92rem', marginTop: '0.25rem' }}
          >
            We don't follow trends — we set them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: E }}
            className="flex gap-3 flex-wrap"
          >
            <Link to="/contact" className="btn btn-primary btn-hover-micro micro-click hover-lift">
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="btn btn-secondary btn-hover-micro hover-scale">
              View Work
            </Link>
          </motion.div>
        </div>

        {/* ── Right: code terminal ── */}
        <CodeTerminal />

      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="container relative z-10 grid grid-cols-2 md:grid-cols-4"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {STATS.map(({ value, label }, i) => (
          <div key={label} className="py-6 text-center"
            style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
            <p className="font-syne font-extrabold"
              style={{ fontSize: '1.6rem', lineHeight: 1, color: 'var(--text-primary)' }}>{value}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest mt-1.5"
              style={{ color: 'var(--text-secondary)' }}>{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Tech ticker */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="relative z-10 overflow-hidden py-3"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      >
        <div className="flex anim-marquee" style={{ width: 'max-content' }}>
          {[...TECH, ...TECH].map((t, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 mx-8">
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-muted)' }} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--text-secondary)' }}>{t}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
