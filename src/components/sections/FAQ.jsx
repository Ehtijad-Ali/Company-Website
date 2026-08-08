import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { Plus, Minus } from 'lucide-react'
import { useContact } from '../../context/ContactContext'

const FAQS = [
  { q: 'How long does a typical project take?',
    a: 'It depends on scope. A focused landing page takes 2–3 weeks. A full SaaS platform typically runs 3–6 months. We always define clear milestones upfront so you know exactly what to expect.' },
  { q: 'Do you work with early-stage startups or only enterprises?',
    a: 'Both. We have flexible engagement models — from lean MVP sprints for startups to long-term retainers for enterprise teams. Budget range starts at $5,000 for targeted projects.' },
  { q: 'What makes CodeNode different from other agencies?',
    a: 'We\'re engineers who design and designers who understand code. No handoff chaos, no "waterfall" gaps. Every team member contributes to both vision and execution, which means faster delivery and fewer revisions.' },
  { q: 'Can you take over an existing codebase?',
    a: 'Yes — we\'ve rescued many projects. We start with a thorough audit, honest assessment, and a clear remediation plan before touching a single line of code.' },
  { q: 'How do you handle post-launch support?',
    a: 'Every project includes a 30-day warranty window. After that, we offer flexible monthly retainer plans for ongoing maintenance, feature development, and performance monitoring.' },
  { q: 'What is your tech stack preference?',
    a: 'We\'re stack-agnostic but opinionated. For most projects: React/Next.js on the frontend, Node.js or Python on the backend, PostgreSQL or MongoDB for data, AWS or GCP for infrastructure. We go where the problem leads.' },
  { q: 'How do you price projects?',
    a: 'Fixed-price for well-scoped projects; time & materials for exploratory or evolving work. We\'ll recommend the model that best protects both sides after the discovery call.' },
  { q: 'Do you offer AI integration services?',
    a: 'Absolutely — it\'s one of our fastest-growing service lines. From LLM-powered features to full ML pipelines, we\'ve shipped production AI at scale for clients in fintech, health, and e-commerce.' },
]

function Item({ q, a, i }) {
  const [open, setOpen] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-30px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:i*.06, duration:.5 }}
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{ border:`1px solid ${open ? 'var(--border-subtle)' : 'var(--border)'}`, background:'var(--bg-card)' }}
    >
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-syne font-semibold text-base pr-4" style={{ color:'var(--text-primary)' }}>{q}</span>
        <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: open ? 'var(--primary)' : 'var(--bg)', border:`1px solid ${open ? 'transparent' : 'var(--border)'}` }}>
          {open
            ? <Minus className="w-3.5 h-3.5" style={{ color:'var(--primary-contrast)' }} />
            : <Plus  className="w-3.5 h-3.5" style={{ color:'var(--text-secondary)' }} />
          }
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:.3, ease:[.22,1,.36,1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const { openContact } = useContact()

  return (
    <section id="faq" ref={ref} className="section" style={{ background:'var(--bg)' }}>
      <div className="container">

        <SectionHeader
          num="09"
          label="FAQ"
          title={[{ t: 'The questions we get ' }, { t: 'before every project', em: true }]}
          inView={inView}
          className="mb-4"
        />
        <p className="text-sm mb-12" style={{ color: 'var(--text-secondary)' }}>
          Still have questions?{' '}
          <button onClick={openContact} className="underline underline-offset-2"
            style={{ color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
            Let's talk
          </button>
        </p>

        {/* ── Accordion ── */}
        <div className="space-y-3">
          {FAQS.map((item, i) => <Item key={item.q} {...item} i={i} />)}
        </div>

      </div>
    </section>
  )
}
