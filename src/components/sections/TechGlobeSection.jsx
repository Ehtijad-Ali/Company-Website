import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import TechGlobe3D from '../ui/TechGlobe3D'

const STACKS = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Vite'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'GraphQL', 'PostgreSQL', 'Prisma'],
  },
  {
    label: 'DevOps',
    items: ['Docker', 'AWS', 'Azure', 'Linux'],
  },
  {
    label: 'Tooling',
    items: ['Figma', 'Redux', 'Nginx', 'Jest'],
  },
]

const METRICS = [
  { value: '18+', label: 'Technologies' },
  { value: '5+',  label: 'Years Expertise' },
  { value: '60+', label: 'Projects Shipped' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
})

export default function TechGlobeSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-surface)' }}>

      <div className="container relative z-10">

        {/* ── Full-width header ── */}
        <motion.div {...fade(0)} className="mb-14 flex items-start justify-between gap-8">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg mb-5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase"
                style={{ color: 'var(--text-secondary)' }}>Technology Stack</span>
            </div>

            <h2 className="section-title mb-4">Our Stack</h2>

            <p className="section-sub" style={{ maxWidth: '32rem' }}>
              Battle-tested tools chosen for performance, developer experience,
              and long-term maintainability — not hype cycles.
            </p>
          </div>

          {/* Watermark + live count */}
          <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
            <span
              className="font-syne font-extrabold"
              style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1, color: 'transparent',
                       WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em', userSelect: 'none' }}
            >04</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
              <span className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--text-muted)' }}>18+ technologies</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 xl:gap-16 items-center">

          {/* ── Left: Globe ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <TechGlobe3D />
          </motion.div>

          {/* ── Right: Content ── */}
          <div>

            {/* Stack rows */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {STACKS.map((stack, si) => (
                <motion.div
                  key={stack.label}
                  {...fade(0.22 + si * 0.07)}
                  className="flex items-center gap-5 py-4 group"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  {/* Label */}
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase w-20 shrink-0"
                    style={{ color: 'var(--text-muted)' }}>
                    {stack.label}
                  </span>

                  {/* Thin divider */}
                  <div className="w-px h-4 shrink-0" style={{ background: 'var(--border)' }} />

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {stack.items.map(item => (
                      <span key={item} style={{
                        display: 'inline-flex', alignItems: 'center',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '99px',
                        fontSize: '0.7rem',
                        fontFamily: 'JetBrains Mono, monospace',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                        className="hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Metrics + CTA */}
            <motion.div {...fade(0.5)} className="mt-8 pt-8 flex items-end justify-between gap-6"
              style={{ borderTop: '1px solid var(--border)' }}>

              {/* Stats */}
              <div className="flex gap-8">
                {METRICS.map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-syne font-extrabold text-2xl"
                      style={{ color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest mt-1.5"
                      style={{ color: 'var(--text-muted)' }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#services"
                whileHover={{ gap: '0.75rem' }}
                className="flex items-center gap-2 text-sm font-semibold shrink-0"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Explore services
                <span style={{
                  width: '1.75rem', height: '1.75rem', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)', flexShrink: 0,
                }}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
