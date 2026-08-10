import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'

const PROJECTS = [
  { title:'NeuroCommerce', cat:'AI/ML',    year:'2026', desc:'AI-powered e-commerce with real-time personalisation and predictive inventory management.',
    img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=600&fit=crop', tags:['React','TensorFlow','Node.js'], featured:true },
  { title:'HealthPulse',   cat:'Mobile',   year:'2026', desc:'Cross-platform health monitoring app with ML-driven biometric insights and wearable sync.',
    img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop', tags:['React Native','Python'] },
  { title:'Aether CRM',    cat:'SaaS',     year:'2026', desc:'Next-gen CRM featuring an AI sales assistant and automated pipeline management.',
    img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop', tags:['Next.js','PostgreSQL'] },
  { title:'MetaVerse Hub', cat:'Web3',     year:'2025', desc:'Immersive 3D virtual workspace with WebXR and blockchain identity layer.',
    img:'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=900&h=600&fit=crop', tags:['Three.js','Solidity'], featured:true },
  { title:'FlowDesk',      cat:'SaaS',     year:'2025', desc:'Real-time collaborative design tool built entirely in the browser with live cursors.',
    img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&h=600&fit=crop', tags:['WebSockets','Canvas API'] },
  { title:'SkyAnalytics',  cat:'AI/ML',    year:'2025', desc:'Satellite imagery analysis platform powering agricultural decisions at enterprise scale.',
    img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop', tags:['PyTorch','GIS'] },
]

const CATS = ['All','AI/ML','SaaS','Mobile','Web3']

export default function Portfolio() {
  const [cat, setCat] = useState('All')
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const shown  = cat === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === cat)

  return (
    <section id="portfolio" ref={ref} className="section" style={{ background:'var(--bg-surface)' }}>
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background:'var(--border)' }} />
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="mb-14 flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:'var(--text-muted)' }}>/ Work</p>
            <h2 className="section-title">Our Portfolio</h2>
          </div>
          <span
            className="font-syne font-extrabold hidden lg:block"
            style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 1, color: 'transparent',
                     WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em', userSelect: 'none' }}
          >07</span>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="relative px-4 py-2 rounded-xl text-sm font-medium"
              style={{ color: cat===c ? 'var(--accent)' : 'var(--text-secondary)' }}>
              {cat===c && (
                <motion.span layoutId="port-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background:'var(--accent-glow)', border:'1px solid var(--border)' }}
                  transition={{ type:'spring', bounce:.15, duration:.4 }} />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div key={p.title} layout
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, scale:.9 }} transition={{ delay:i*.07, duration:.45 }}
                className="port-item card card-hover shadow-elevate overflow-hidden group cursor-pointer"
              >
                <div className="relative img-zoom-wrap aspect-[16/10]">
                  <img src={p.img} alt={p.title} className="img-zoom w-full h-full object-cover" />
                  <div className="port-overlay">
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="font-syne font-bold text-white text-lg mb-1">{p.title}</p>
                      <p className="text-sm text-white/70 mb-3">{p.desc}</p>
                      <div className="flex gap-2">
                        {p.tags.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                            style={{ background:'rgba(255,255,255,0.12)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background:'rgba(255,255,255,0.15)' }}>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="chip text-[10px]">{p.cat}</span>
                    {p.featured && <span className="chip text-[10px]">Featured</span>}
                  </div>
                </div>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop:'1px solid var(--border)' }}>
                  <div>
                    <p className="font-syne font-semibold text-sm" style={{ color:'var(--text-primary)' }}>{p.title}</p>
                    <p className="font-mono text-[10px] mt-0.5" style={{ color:'var(--text-secondary)' }}>{p.year} · {p.cat}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[Github, ExternalLink].map((Icon, ii) => (
                      <button key={ii} className="w-8 h-8 rounded-lg flex items-center justify-center hover-scale micro-click"
                        style={{ background:'var(--bg)', border:'1px solid var(--border)', transition:'transform 0.2s ease, box-shadow 0.2s ease' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color:'var(--text-secondary)' }} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
