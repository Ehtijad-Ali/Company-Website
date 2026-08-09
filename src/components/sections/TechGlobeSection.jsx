import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import TechGlobe3D from '../ui/TechGlobe3D'
import SectionHeader from '../ui/SectionHeader'
import { METRICS as SITE, format } from '../../data/metrics'

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
  { value: '18+', label: 'Technologies' },                       // local to this section
  { value: format('years'),    label: SITE.years.label },
  { value: format('projects'), label: SITE.projects.label },
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

        <SectionHeader
          num="04"
          label="Stack"
          title={[{ t: 'Chosen for the next five years, ' }, { t: 'not the hype cycle', em: true }]}
          subtitle="Battle-tested tools picked for performance, developer experience and long-term maintainability."
          inView={inView}
          className="mb-12"
        />

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 xl:gap-16 items-center [&>*]:min-w-0">

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
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase w-20 shrink-0"
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
                    <p className="font-mono text-[10px] uppercase tracking-widest mt-1.5"
                      style={{ color: 'var(--text-muted)' }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#services"
                whileHover={{ gap: '0.75rem' }}
                className="tap flex items-center gap-2 text-sm font-semibold shrink-0"
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
