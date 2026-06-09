import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ROW1 = [
  { text: 'E-Commerce',  dot: '#F59E0B' },
  { text: 'FinTech',     dot: '#3B82F6' },
  { text: 'HealthTech',  dot: '#22C55E' },
  { text: 'EdTech',      dot: '#A855F7' },
  { text: 'SaaS',        dot: '#EF4444' },
  { text: 'Enterprise',  dot: '#06B6D4' },
  { text: 'Logistics',   dot: '#F97316' },
  { text: 'MarTech',     dot: '#EC4899' },
  { text: 'Gov Tech',    dot: '#84CC16' },
  { text: 'Real Estate', dot: '#8B5CF6' },
  { text: 'PropTech',    dot: '#14B8A6' },
  { text: 'LegalTech',   dot: '#F59E0B' },
]

const ROW2 = [
  { text: 'React',       dot: '#61DAFB' },
  { text: 'Next.js',     dot: '#ffffff' },
  { text: 'Node.js',     dot: '#539E43' },
  { text: 'Python',      dot: '#3178C6' },
  { text: 'AWS',         dot: '#FF9900' },
  { text: 'TypeScript',  dot: '#3178C6' },
  { text: 'GraphQL',     dot: '#E10098' },
  { text: 'Docker',      dot: '#2496ED' },
  { text: 'PostgreSQL',  dot: '#336791' },
  { text: 'AI / ML',     dot: '#A855F7' },
  { text: 'Figma',       dot: '#F24E1E' },
  { text: 'Flutter',     dot: '#54C5F8' },
]

const KEYFRAMES = `
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
`

function Pill({ text, dot }) {
  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 px-5 py-2.5 rounded-full mx-2"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        fontFamily: "'Courier New', monospace",
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
      {text}
    </span>
  )
}

function MarqueeRow({ items, direction = 'left', speed = 38 }) {
  const doubled = [...items, ...items]
  const anim = direction === 'left' ? 'marquee-left' : 'marquee-right'
  return (
    <div className="overflow-hidden relative">
      <div style={{ display: 'flex', animation: `${anim} ${speed}s linear infinite`, width: 'max-content' }}>
        {doubled.map((item, i) => <Pill key={i} {...item} />)}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-surface)', overflow: 'hidden' }}>
      <style>{KEYFRAMES}</style>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{ background: 'linear-gradient(90deg, var(--bg-surface), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{ background: 'linear-gradient(-90deg, var(--bg-surface), transparent)' }} />

      <div className="container relative z-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--text-muted)' }}>/ 06 — Reach</p>
            <h2 className="section-title">Powering products<br />across every industry.</h2>
          </div>
          <span className="font-syne font-extrabold hidden lg:block"
            style={{ fontSize: 'clamp(4rem,7vw,7rem)', lineHeight: 1, color: 'transparent',
                     WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em', userSelect: 'none' }}>
            06
          </span>
        </motion.div>
      </div>

      {/* Rows */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="space-y-3"
      >
        <MarqueeRow items={ROW1} direction="left"  speed={40} />
        <MarqueeRow items={ROW2} direction="right" speed={34} />
      </motion.div>

      {/* Bottom statement */}
      <div className="container relative z-10 mt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="section-sub mb-0 text-center md:text-left" style={{ maxWidth: '32rem' }}>
            No matter the domain — we've shipped production-ready software in it.
          </p>
          <div className="flex gap-6 shrink-0">
            {[['12+', 'Industries'], ['18+', 'Countries'], ['60+', 'Clients']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="font-syne font-extrabold text-2xl leading-none"
                  style={{ color: 'var(--text-primary)' }}>{val}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest mt-1"
                  style={{ color: 'var(--text-muted)' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
