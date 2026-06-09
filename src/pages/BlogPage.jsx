import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, User } from 'lucide-react'

const POSTS = [
  { title:'The Architecture of a $100M SaaS Platform', cat:'Engineering', date:'Apr 2025', read:'8 min',
    author:'David Kim', excerpt:'Breaking down the infrastructure decisions that allowed us to scale from 0 to 500K daily active users without re-platforming.',
    img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop' },
  { title:'Why LLM Fine-Tuning is Overrated', cat:'AI/ML', date:'Apr 2025', read:'6 min',
    author:'Elena Vos', excerpt:'When prompt engineering, RAG, and context windows solve 80% of use cases, fine-tuning is often an expensive solution to a problem that doesn\'t exist.',
    img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop' },
  { title:'The Real Cost of Design Systems', cat:'Design', date:'Mar 2025', read:'5 min',
    author:'Sophie Martin', excerpt:'A design system is a bet on the future. Here\'s how to evaluate whether it\'s worth making — and what we\'ve learned from building them at scale.',
    img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop' },
  { title:'Core Web Vitals: From 45 to 98 in 3 Weeks', cat:'Performance', date:'Mar 2025', read:'7 min',
    author:'David Kim', excerpt:'A step-by-step account of how we diagnosed and eliminated every performance bottleneck in a legacy Next.js application.',
    img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop' },
  { title:'Mobile App Retention: The Metrics That Matter', cat:'Mobile', date:'Feb 2025', read:'4 min',
    author:'Jennifer Lee', excerpt:'Day-1, Day-7, Day-30 retention frameworks are table stakes. Here\'s how we track the leading indicators that predict churn before it happens.',
    img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop' },
  { title:'3D on the Web in 2025: What\'s Worth Using', cat:'Engineering', date:'Feb 2025', read:'9 min',
    author:'Dr. Arinze Okafor', excerpt:'Three.js, WebGPU, React Three Fiber, Babylon.js — an opinionated guide to which 3D libraries are worth your time and which are hype.',
    img:'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&h=500&fit=crop' },
]

export default function BlogPage() {
  return (
    <section className="section pt-36" style={{ background:'var(--bg-surface)' }}>
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
          className="mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:'var(--text-muted)' }}>/ 01 — Blog</p>
          <div className="flex items-end gap-6">
            <h1 className="section-title shrink-0">Insights</h1>
            <div className="flex-1 h-px mb-2.5" style={{ background:'var(--border)' }} />
            <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
              style={{ fontSize:'clamp(3.5rem,6vw,6rem)', lineHeight:1, color:'transparent', WebkitTextStroke:'1px var(--ghost-stroke)', letterSpacing:'-0.04em' }}>01</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <motion.article key={p.title}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:(i%3)*.08, duration:.55 }}
              className="card overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 left-4 chip text-[10px]">{p.cat}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4" style={{ color:'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5 font-mono text-[10px]"><User className="w-3 h-3" />{p.author}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px]"><Clock className="w-3 h-3" />{p.read} read</span>
                  <span className="font-mono text-[10px] ml-auto">{p.date}</span>
                </div>
                <h2 className="font-syne font-bold text-lg leading-snug mb-3 group-hover:text-accent transition-colors"
                  style={{ color:'var(--text-primary)' }}>{p.title}</h2>
                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color:'var(--text-secondary)' }}>{p.excerpt}</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
