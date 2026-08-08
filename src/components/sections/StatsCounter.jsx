import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { METRICS } from '../../data/metrics'

const KEYS = ['satisfaction', 'projects', 'revenue', 'rating']
const STATS = KEYS.map(k => {
  const m = METRICS[k]
  return { end: m.value, prefix: m.prefix, suffix: m.suffix, decimals: m.decimals ?? 0,
           label: m.label, desc: m.desc }
})

function Counter({ end, prefix = '', suffix = '', decimals = 0, inView }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 1800
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(+(end * eased).toFixed(decimals))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(end)
    }
    requestAnimationFrame(tick)
  }, [inView, end, decimals])

  return (
    <span style={{ color: 'var(--text-primary)' }}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* Header */}
        <SectionHeader
          num="05"
          label="Impact"
          title={[{ t: 'Numbers that ' }, { t: 'move the needle', em: true }]}
          inView={inView}
          className="mb-12"
        />

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-7 flex flex-col relative overflow-hidden group"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              {/* Hover glow */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />

              {/* Big number */}
              <p className="tnum mb-2 leading-none"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500,
                         fontSize: 'clamp(2.6rem,4.5vw,3.6rem)', letterSpacing: '-0.03em',
                         color: 'var(--text-primary)' }}>
                <Counter {...stat} inView={inView} />
              </p>

              {/* Label */}
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4"
                style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>

              {/* Divider + desc */}
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {stat.desc}
                </p>
              </div>

              {/* Bottom hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, var(--border-hover), transparent)' }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom statement bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="font-mono text-xs text-center sm:text-left" style={{ color: 'var(--text-secondary)' }}>
            Every metric above is tracked, reported, and verifiable — no made-up numbers.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Updated quarterly
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
