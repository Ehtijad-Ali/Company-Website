import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'


const E = [0.22, 1, 0.36, 1]

const TESTIMONIALS = [
  {
    name: 'John Smith',
    role: 'CEO',
    company: 'TechStart Inc.',
    rating: 5,
    metric: '+42%',
    metricLabel: 'Conversion rate',
    img: 'https://images.unsplash.com/photo-1560250097-0dc05ffedb3d?w=100&h=100&fit=crop&crop=face',
    text: 'CodeNode transformed our entire platform in 6 weeks. Performance gains were beyond what we expected. Conversion rate jumped 42%.',
  },
  {
    name: 'Sarah Johnson',
    role: 'CMO',
    company: 'BrandCo',
    rating: 5,
    metric: '3×',
    metricLabel: 'Lead generation',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    text: 'The redesign was jaw-dropping. Not just beautiful — it converts. 3x lead generation in the first month post-launch.',
  },
  {
    name: 'Michael Chen',
    role: 'Founder',
    company: 'StartupHub',
    rating: 5,
    metric: '6 wks',
    metricLabel: 'Full delivery',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    text: "Their AI integration turned our raw data into real business intelligence. The team's depth of knowledge is unparalleled.",
  },
  {
    name: 'Priya Patel',
    role: 'CTO',
    company: 'HealthTech',
    rating: 5,
    metric: '0',
    metricLabel: 'Tech debt left',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    text: "We've worked with many agencies. CodeNode stands alone. Their attention to code quality saved us months of technical debt.",
  },
  {
    name: 'Lucas Schmidt',
    role: 'Director',
    company: 'EuroBank',
    rating: 5,
    metric: '0',
    metricLabel: 'Downtime on launch',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    text: 'Trusted them with our core banking UI rebuild. Zero downtime, perfect execution, genuinely world-class result.',
  },
  {
    name: 'Yuna Kim',
    role: 'Head of Product',
    company: 'SaasCo',
    rating: 5,
    metric: '+28',
    metricLabel: 'NPS points',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    text: 'From discovery to launch in 10 weeks. The collaborative process was smooth, the code is pristine, NPS up 28 points.',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[active]

  return (
    <section id="testimonials" ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6 }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>/ 07 — Clients</p>
            <h2 className="section-title">What They Say</h2>
          </div>
          <span
            className="font-syne font-extrabold hidden lg:block"
            style={{
              fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1,
              color: 'transparent', WebkitTextStroke: '1px var(--ghost-stroke)',
              letterSpacing: '-0.04em', userSelect: 'none',
            }}
          >07</span>
        </motion.div>

        {/* Featured spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: .2, duration: .7, ease: E }}
          className="mb-14 rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="grid lg:grid-cols-[1fr_300px]">

            {/* Left — quote */}
            <div className="p-8 md:p-12 flex flex-col justify-between">

              {/* Big metric */}
              <div className="flex items-start gap-6 mb-8">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active + '-metric'}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: .35 }}
                      className="font-syne font-extrabold leading-none"
                      style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', color: 'var(--accent)' }}
                    >{t.metric}</motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active + '-mlabel'}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: .3 }}
                      className="font-mono text-[10px] uppercase tracking-widest mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >{t.metricLabel}</motion.p>
                  </AnimatePresence>
                </div>
                <div className="w-px self-stretch" style={{ background: 'var(--border)' }} />
                <div className="flex items-center gap-1.5 pt-1">
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Verified result</span>
                </div>
              </div>

              {/* Quote text */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active + '-text'}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: .4, ease: E }}
                  className="font-syne font-medium text-lg md:text-xl leading-relaxed mb-8"
                  style={{ color: 'var(--text-primary)' }}
                >
                  "{t.text}"
                </motion.blockquote>
              </AnimatePresence>

              {/* Client + nav */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + '-client'}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={t.img} alt={t.name}
                      className="w-11 h-11 rounded-full object-cover"
                      style={{ outline: '2px solid var(--accent)', outlineOffset: 2 }}
                      onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${t.name}&bg=C96A4A&color=FFFCF8&bold=true&size=100` }}
                    />
                    <div>
                      <p className="font-syne font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: 'var(--text-secondary)' }}>{t.role} · {t.company}</p>
                    </div>
                    <div className="flex ml-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  ><ChevronLeft className="w-4 h-4" /></button>

                  <div className="flex gap-1.5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i} onClick={() => setActive(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === active ? '1.75rem' : '0.5rem',
                          height: '0.5rem',
                          background: i === active ? 'var(--accent)' : 'var(--border)',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  ><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Right — client list */}
            <div
              className="hidden lg:flex flex-col justify-center gap-1.5 p-6"
              style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-surface)' }}
            >
              <p className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>All clients</p>
              {TESTIMONIALS.map((c, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: i === active ? 'var(--bg-card)' : 'transparent',
                    border: `1px solid ${i === active ? 'var(--accent)' : 'transparent'}`,
                  }}
                >
                  <img
                    src={c.img} alt={c.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&bg=C96A4A&color=FFFCF8&bold=true&size=100` }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-syne font-semibold text-xs truncate" style={{ color: i === active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{c.name}</p>
                    <p className="font-mono text-[9px] truncate" style={{ color: 'var(--text-muted)' }}>{c.company}</p>
                  </div>
                  {i === active && (
                    <span className="font-syne font-bold text-xs shrink-0" style={{ color: 'var(--accent)' }}>
                      {c.metric}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: .5, duration: .6 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-14"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}
        >
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '98%',  label: 'Satisfaction Rate' },
            { value: '5.0',  label: 'Average Rating' },
            { value: '30+',  label: 'Countries Served' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="font-syne font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>{value}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
