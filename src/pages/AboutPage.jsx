import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe2, FlaskConical, Heart } from 'lucide-react'
import Process from '../components/sections/Process'

const VALUES = [
  { title:'Craft Over Speed',    desc:'We never ship things we\'re not proud of. Quality is non-negotiable, even when deadlines are tight.' },
  { title:'Radical Transparency', desc:'No hidden blockers, no surprise timelines. You always know exactly where things stand.' },
  { title:'Outcomes Not Outputs', desc:'We measure success by business results — not deliverables, tickets, or hours logged.' },
  { title:'Always Learning',     desc:'Technology moves fast. We invest 20% of every quarter in R&D, experimentation, and upskilling.' },
]

const MILESTONES = [
  { year:'2014', event:'Founded in San Francisco with a team of 3.' },
  { year:'2016', event:'Crossed 100 projects milestone. Opened London office.' },
  { year:'2018', event:'Launched AI/ML practice. First Fortune 500 client.' },
  { year:'2020', event:'Grew to 50+ team members across 4 time zones.' },
  { year:'2022', event:'500 projects shipped. $50M+ client revenue generated.' },
  { year:'2024', event:'Recognised as Top Digital Agency by Clutch & Forbes.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Story + Values */}
      <section className="section pt-36" style={{ background:'var(--bg-surface)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
            className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:'var(--text-muted)' }}>/ 01 — Story</p>
            <div className="flex items-end gap-6">
              <h1 className="section-title shrink-0">Our Story</h1>
              <div className="flex-1 h-px mb-2.5" style={{ background:'var(--border)' }} />
              <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
                style={{ fontSize:'clamp(3.5rem,6vw,6rem)', lineHeight:1, color:'transparent', WebkitTextStroke:'1px var(--ghost-stroke)', letterSpacing:'-0.04em' }}>01</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
              <h2 className="section-title mb-6">Our <span className="text-accent">Story</span></h2>
              <div className="space-y-4 section-sub" style={{ fontSize:'.95rem' }}>
                <p>CodeNode was born from a simple frustration: most agencies promise premium quality and deliver average work wrapped in expensive presentations.</p>
                <p>Our founders — engineers and designers who had worked at companies like Google, Figma, and Shopify — decided to build something different. A studio where technical excellence and design craft were equally valued, not traded off.</p>
                <p>In our first year, we've already shipped dozens of projects, helped early-stage startups launch, and built AI experiences for ambitious teams.</p>
                <p>We're still obsessed with the same thing we were when we started in 2024: making things that actually work, beautifully.</p>
              </div>
              <Link to="/contact" className="btn btn-primary mt-8">
                Start Your Story With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Timeline */}
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
              <h3 className="font-syne font-bold text-xl mb-6" style={{ color:'var(--text-primary)' }}>Milestones</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-[18px] top-3 bottom-3 w-[1px]" style={{ background:'var(--border)' }} />
                {MILESTONES.map(({ year, event }, i) => (
                  <motion.div key={year} initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay:i*.08 }}
                    className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center z-10 relative"
                      style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ background:'var(--accent)' }} />
                    </div>
                    <div className="pb-2">
                      <span className="font-mono text-xs text-accent">{year}</span>
                      <p className="text-sm mt-0.5" style={{ color:'var(--text-secondary)' }}>{event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="flex items-end gap-6 mb-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase shrink-0" style={{ color:'var(--text-muted)' }}>/ 02 — Values</p>
            <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
            <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
              style={{ fontSize:'clamp(3.5rem,6vw,6rem)', lineHeight:1, color:'transparent', WebkitTextStroke:'1px var(--ghost-stroke)', letterSpacing:'-0.04em' }}>02</span>
          </div>
          <h2 className="section-title mb-10">Our <span className="text-accent">Values</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ title, desc }, i) => (
              <motion.div key={title} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*.1, duration:.55 }}
                className="card p-6">
                <span className="font-syne font-extrabold text-4xl mb-4 block select-none"
                  style={{ lineHeight:1, color:'transparent', WebkitTextStroke:'1.5px var(--accent)' }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                <h3 className="font-syne font-bold text-base mb-2" style={{ color:'var(--text-primary)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CultureSection />
    </>
  )
}

/* ── Culture Section ─────────────────────────────────────────────────── */

const CULTURE_STATS = [
  { icon: Globe2,       value: '100%',   label: 'Remote-first',      desc: 'Talent from 18 countries, working async-first with zero mandatory 9-to-5.' },
  { icon: FlaskConical, value: '20%',    label: 'R&D every quarter',  desc: 'Every engineer has protected time each quarter for experimentation and learning.' },
  { icon: Zap,          value: '<48h',   label: 'Decision speed',     desc: 'Flat hierarchy. No approval chains. The right person decides the right thing, fast.' },
  { icon: Heart,        value: '4.9/5',  label: 'Team satisfaction',  desc: 'Measured twice a year. We publish the results publicly — good or bad.' },
]

const BELIEFS = [
  'Great code is read far more often than it is written.',
  'Design without engineering constraints is decoration.',
  'The best feature is the one you choose not to build.',
  'Slow is smooth. Smooth is fast.',
  'Every bug is a process failure, not a person failure.',
  'Ship early, iterate publicly, improve relentlessly.',
]

function CultureSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>/ 04 — Culture</p>
          <div className="flex items-end gap-6">
            <h2 className="section-title shrink-0">How We're Wired</h2>
            <div className="flex-1 h-px mb-2.5" style={{ background: 'var(--border)' }} />
            <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
              style={{ fontSize:'clamp(3.5rem,6vw,6rem)', lineHeight:1, color:'transparent', WebkitTextStroke:'1px var(--ghost-stroke)', letterSpacing:'-0.04em' }}>04</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Culture isn't a perk list. It's the sum of every decision we make when no one is watching.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CULTURE_STATS.map(({ icon: Icon, value, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group card p-6 relative overflow-hidden"
              style={{ borderRadius: 18 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[18px]"
                style={{ background: 'radial-gradient(circle at 0% 0%, var(--accent-glow) 0%, transparent 65%)' }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-syne font-extrabold select-none"
                    style={{ fontSize: '2.5rem', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px var(--ghost-stroke)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', lineHeight: 1, letterSpacing: '-0.03em',
                  color: 'var(--text-primary)', marginBottom: '0.25rem',
                }}>{value}</p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                  {label}
                </p>
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '0.875rem' }} />
                <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Founder quote + beliefs */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8 flex flex-col justify-between"
            style={{ borderRadius: 20, borderLeft: '3px solid var(--accent)' }}
          >
            <div>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                / Founder's Note
              </p>
              <blockquote style={{
                fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 600,
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', lineHeight: 1.55,
                color: 'var(--text-primary)', marginBottom: '2rem',
              }}>
                "We didn't set out to build the biggest agency. We set out to build the one we would have hired — obsessive about craft, honest about timelines, and allergic to mediocrity."
              </blockquote>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 800, fontSize: '0.85rem',
                color: 'var(--text-primary)',
              }}>A</div>
              <div>
                <p style={{ fontFamily: 'Syne, Montserrat, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0 }}>Alex Chen</p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Co-founder & CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Beliefs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              / Things We Actually Believe
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {BELIEFS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-4 py-3.5"
                  style={{ borderBottom: i < BELIEFS.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'default' }}
                >
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.1em',
                    color: 'var(--text-muted)', paddingTop: '0.2rem', flexShrink: 0, width: '1.5rem',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{
                    fontSize: '0.88rem', lineHeight: 1.6,
                    color: 'var(--text-secondary)', margin: 0,
                    transition: 'color 0.2s',
                  }} className="group-hover:text-[var(--text-primary)]">{b}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
