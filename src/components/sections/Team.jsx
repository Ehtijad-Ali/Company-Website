import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Linkedin, Github, Twitter, Dribbble, ArrowUpRight } from 'lucide-react'

const TEAM = [
  { name:'James Sterling',    role:'CEO & Founder',       dept:'Leadership', bio:'Visionary leader with 20+ years driving digital innovation across global markets.',
    img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=top',
    skills:['Strategic Vision','Global Expansion','Investor Relations'], socials:[Linkedin,Twitter] },
  { name:'Elena Vos',         role:'Lead Data Scientist',  dept:'AI/ML',      bio:'Turning raw data into actionable business intelligence through ML wizardry.',
    img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=top',
    skills:['Big Data','Predictive Modelling','Machine Learning'], socials:[Linkedin,Github] },
  { name:'Dr. Arinze Okafor', role:'Senior AI Engineer',  dept:'AI/ML',      bio:'Building intelligent systems that scale. Ex-Google Research, NLP & Vision.',
    img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=top',
    skills:['NLP','Computer Vision','Neural Networks'], socials:[Linkedin,Github] },
  { name:'Alex Thompson',     role:'Lead UX Designer',    dept:'Design',     bio:'Creating intuitive experiences that delight users and drive measurable results.',
    img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=top',
    skills:['User Research','Prototyping','Usability Testing'], socials:[Linkedin,Dribbble] },
  { name:'Sophie Martin',     role:'Product Designer',    dept:'Design',     bio:'End-to-end product design balancing visual beauty and functional precision.',
    img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=top',
    skills:['Product Strategy','Interaction Design','Design Systems'], socials:[Linkedin,Dribbble] },
  { name:'David Kim',         role:'Lead Developer',      dept:'Engineering',bio:'Full-stack architect obsessed with performance, clean code, and scalable systems.',
    img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=top',
    skills:['React / Next.js','Node.js','System Architecture'], socials:[Linkedin,Github] },
  { name:'Jennifer Lee',      role:'Marketing Lead',      dept:'Marketing',  bio:'Growing brands via data-driven digital channels with measurable ROI.',
    img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=top',
    skills:['SEO / SEM','Content Strategy','PPC Campaigns'], socials:[Linkedin,Twitter] },
  { name:'Marcus Johnson',    role:'Creative Director',   dept:'Design',     bio:'Award-winning global brand designer with an eye for premium visual stories.',
    img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=top',
    skills:['Art Direction','Brand Development','Campaign Design'], socials:[Linkedin,Dribbble] },
]

const DEPTS = ['All','Leadership','AI/ML','Design','Engineering','Marketing']

function Card({ m, i }) {
  const [hovered, setHovered] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 4) * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shadow-elevate"
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, aspectRatio: '3/4',
               border: '1px solid var(--border)', cursor: 'default' }}
    >
      {/* Photo */}
      <motion.img
        src={m.img} alt={m.name}
        animate={{ scale: hovered ? 1.07 : 1, filter: hovered ? 'grayscale(0%)' : 'grayscale(60%)' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&bg=111&color=fff&bold=true&size=600` }}
      />

      {/* Permanent bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(4,4,6,0.98) 0%, rgba(4,4,6,0.6) 35%, rgba(4,4,6,0.08) 65%, transparent 100%)',
      }} />

      {/* Dept badge — fades in on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
        transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
        style={{ position: 'absolute', top: 14, right: 14 }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '0.28rem 0.65rem', borderRadius: 99,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
        }}>{m.dept}</span>
      </motion.div>

      {/* Slide-up info panel */}
      <motion.div
        animate={{ y: hovered ? 0 : 'calc(100% - 68px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: '0 0 0 0', top: 'auto', padding: '1.25rem' }}
      >
        {/* Skills */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: hovered ? 0.18 : 0 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.875rem' }}
        >
          {m.skills.map(s => (
            <span key={s} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
              padding: '0.2rem 0.55rem', borderRadius: 99,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.55)',
            }}>{s}</span>
          ))}
        </motion.div>

        {/* Name + role — always visible when panel is showing */}
        <div style={{ marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 style={{ fontFamily: 'Nasalization, Montserrat, sans-serif', fontWeight: 800,
              fontSize: '0.95rem', color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{m.name}</h3>
          </div>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            letterSpacing: '0.08em', color: 'rgba(255,255,255,0.42)', marginTop: '0.2rem' }}>{m.role}</p>
        </div>

        {/* Bio */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: hovered ? 0.22 : 0 }}
          style={{ fontFamily: 'Nasalization, Montserrat, sans-serif', fontSize: '0.72rem',
            lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', marginBottom: '0.875rem' }}
        >{m.bio}</motion.p>

        {/* Socials */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: hovered ? 0.28 : 0 }}
          style={{ display: 'flex', gap: '0.4rem' }}
        >
          {m.socials.map((Icon, si) => (
            <button key={si} className="hover-scale micro-click" style={{
              width: 28, height: 28, borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', transition: 'background 0.2s, transform 0.2s',
            }}>
              <Icon style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.6)' }} />
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Index number — top left */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
        color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

export default function Team() {
  const [dept, setDept] = useState('All')
  const filtered = dept === 'All' ? TEAM : TEAM.filter(m => m.dept === dept)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3"
              style={{ color: 'var(--text-muted)' }}>/ Team</p>
            <h2 className="section-title">The People</h2>
          </div>
          <div className="flex items-end gap-5">
            <span
              className="font-syne font-extrabold hidden lg:block"
              style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1, color: 'transparent',
                       WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em', userSelect: 'none' }}
            >06</span>
            <Link to="/team"
              className="shrink-0 mb-2 flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              View All
              <span style={{ width: 28, height: 28, borderRadius: 8, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <ArrowUpRight style={{ width: 13, height: 13, color: 'var(--text-secondary)' }} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* ── Dept filter tabs — underline style ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-0 mb-10"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {DEPTS.map(d => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className="relative pb-3 mr-7 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
              style={{ color: dept === d ? 'var(--text-primary)' : 'var(--text-muted)',
                       background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {d}
              {dept === d && (
                <motion.div
                  layoutId="team-underline"
                  style={{ position: 'absolute', bottom: -1, left: 0, right: 0,
                           height: 1, background: 'var(--primary)' }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Card grid ── */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => (
              <motion.div key={m.name} layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card m={m} i={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
