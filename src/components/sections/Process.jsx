import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { MessageSquare, Lightbulb, Layers, Rocket, BarChart2 } from 'lucide-react'

const E = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    icon: MessageSquare,
    num: '01',
    title: 'Discovery',
    phase: 'Week 1 – 2',
    desc: 'Deep-dive sessions to understand your goals, audience, and competitive landscape. We ask the hard questions others skip.',
    deliverables: ['Requirements doc', 'Competitor audit', 'Project brief'],
  },
  {
    icon: Lightbulb,
    num: '02',
    title: 'Strategy',
    phase: 'Week 2 – 3',
    desc: 'A tailored roadmap covering architecture, tech stack, design direction, and success metrics — before a single pixel is drawn.',
    deliverables: ['Tech spec', 'Design direction', 'Milestones'],
  },
  {
    icon: Layers,
    num: '03',
    title: 'Design & Build',
    phase: 'Week 3 – 10',
    desc: 'Iterative design sprints followed by agile engineering. You see progress every week, not just at the end.',
    deliverables: ['UI/UX designs', 'Working builds', 'Weekly reviews'],
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Launch',
    phase: 'Week 10 – 11',
    desc: 'Production-grade deployment with full CI/CD, monitoring, and zero-downtime releases. We never just "push and pray".',
    deliverables: ['Live product', 'CI/CD pipeline', 'Monitoring setup'],
  },
  {
    icon: BarChart2,
    num: '05',
    title: 'Grow',
    phase: 'Ongoing',
    desc: 'Post-launch analytics, A/B testing, and iterative improvements keep compounding your results over time.',
    deliverables: ['Analytics reports', 'A/B tests', 'Optimisations'],
  },
]

function StepCard({ icon: Icon, num, title, phase, desc, deliverables }) {
  return (
    <div
      className="card p-6 group transition-all duration-300 hover:translate-y-[-2px]"
      style={{ '--hover-border': 'var(--border-hover)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = ''}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="font-syne font-bold text-[0.95rem]" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <span
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: 'var(--accent)', opacity: 0.7 }}
            >{phase}</span>
          </div>
        </div>
        <span
          className="tnum text-4xl leading-none shrink-0 select-none"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--brand)', opacity: 0.4 }}
        >{num}</span>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {deliverables.map(d => (
          <span
            key={d}
            className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >{d}</span>
        ))}
      </div>
    </div>
  )
}

export default function Process({ num = '03' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* Header */}
        <SectionHeader
          num={num}
          label="Process"
          title={[{ t: 'Five phases, ' }, { t: 'no surprises', em: true }]}
          subtitle="A framework that turns an idea into a shipped product, with a checkpoint you can act on at the end of each phase."
          inView={inView}
          className="mb-4"
        />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-14"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
          <span className="eyebrow" style={{ fontSize: '0.5625rem' }}>5 phases · ~12 weeks</span>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line — desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'var(--border)' }}
          />
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top"
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: .4, duration: 1.8, ease: 'easeOut' }}
            style={{ background: 'var(--accent)', height: '100%', opacity: .5 }}
          />

          {/* Vertical line — mobile */}
          <div
            className="lg:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
          />
          <motion.div
            className="lg:hidden absolute left-4 top-0 w-px origin-top"
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: .4, duration: 1.8, ease: 'easeOut' }}
            style={{ background: 'var(--accent)', height: '100%', opacity: .5 }}
          />

          <div className="space-y-10 lg:space-y-12">
            {STEPS.map(({ icon: Icon, num, title, phase, desc, deliverables }, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: .25 + i * .15, duration: .65, ease: E }}
                  className="relative pl-12 lg:pl-0 lg:grid lg:grid-cols-[1fr_88px_1fr] lg:items-start"
                >
                  {/* Desktop left slot */}
                  <div className="hidden lg:block">
                    {isLeft && <StepCard icon={Icon} num={num} title={title} phase={phase} desc={desc} deliverables={deliverables} />}
                  </div>

                  {/* Centre node */}
                  <div className="hidden lg:flex flex-col items-center pt-5">
                    <motion.div
                      initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: .35 + i * .15, type: 'spring', bounce: .55 }}
                      className="w-11 h-11 rounded-full flex items-center justify-center z-10 relative"
                      style={{
                        background: 'var(--bg)',
                        border: '2px solid var(--accent)',
                        boxShadow: '0 0 0 5px var(--bg)',
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    </motion.div>
                    <span className="font-mono text-[9px] mt-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>{num}</span>
                  </div>

                  {/* Desktop right slot */}
                  <div className="hidden lg:block">
                    {!isLeft && <StepCard icon={Icon} num={num} title={title} phase={phase} desc={desc} deliverables={deliverables} />}
                  </div>

                  {/* Mobile node */}
                  <motion.div
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: .35 + i * .15, type: 'spring', bounce: .55 }}
                    className="lg:hidden absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{ background: 'var(--bg)', border: '2px solid var(--accent)' }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                  </motion.div>

                  {/* Mobile card */}
                  <div className="lg:hidden">
                    <StepCard icon={Icon} num={num} title={title} phase={phase} desc={desc} deliverables={deliverables} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: .6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div>
            <p className="font-syne font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
              Ready to start your project?
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Book a free 30-min discovery call — no strings attached.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn-primary shrink-0"
          >
            Start Discovery
          </a>
        </motion.div>

      </div>
    </section>
  )
}
