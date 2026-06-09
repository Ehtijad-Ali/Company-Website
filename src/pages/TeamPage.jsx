import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Github, Twitter, Dribbble, ArrowRight, Globe2, Clock, Zap, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const FULL_TEAM = [
  { name:'James Sterling',    role:'CEO & Founder',        dept:'Leadership',  bio:'Visionary leader with 20+ years driving digital innovation. Founded CodeNode with a mission to make world-class digital craftsmanship accessible to ambitious companies everywhere.',
    img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Twitter] },
  { name:'Elena Vos',         role:'Lead Data Scientist',   dept:'AI/ML',       bio:'PhD in Statistics from MIT. Spent 5 years at Bloomberg building real-time market prediction systems before joining CodeNode to lead our data science practice.',
    img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Github] },
  { name:'Dr. Arinze Okafor', role:'Senior AI Engineer',    dept:'AI/ML',       bio:'Ex-Google Research. Published author in NLP and computer vision. Leads our ML engineering team, building production-grade AI that actually ships and scales.',
    img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Github] },
  { name:'Alex Thompson',     role:'Lead UX Designer',      dept:'Design',      bio:'10+ years crafting interfaces for Fortune 500 companies. Certified NN/g UX specialist with a philosophy that great design is invisible — it just works.',
    img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Dribbble] },
  { name:'Sophie Martin',     role:'Product Designer',      dept:'Design',      bio:'Former product designer at Figma and Notion. Bridges the gap between business strategy and beautiful execution. Speaker at design conferences across Europe.',
    img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Dribbble] },
  { name:'David Kim',         role:'Lead Developer',        dept:'Engineering', bio:'15-year full-stack veteran. Built infrastructure serving 50M+ users at two unicorn startups. Obsessed with performance, clean APIs, and mentoring junior engineers.',
    img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Github] },
  { name:'Jennifer Lee',      role:'Marketing Lead',        dept:'Marketing',   bio:'Former Head of Growth at two Y Combinator companies. Expertise in data-driven paid and organic strategies that compound. Led campaigns generating $20M+ in pipeline.',
    img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Twitter] },
  { name:'Marcus Johnson',    role:'Creative Director',     dept:'Design',      bio:'Award-winning global brand designer. Work featured in Print, Communication Arts, and Awwwards. Transforms brands from forgettable to iconic.',
    img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Dribbble] },
  { name:'Michael Brown',     role:'E-commerce Lead',       dept:'Engineering', bio:'Generated $50M+ in e-commerce revenue for clients across fashion, beauty, and consumer goods. Shopify Plus expert with deep experience in conversion rate optimisation.',
    img:'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Twitter] },
  { name:'Nina Patel',        role:'UX Researcher',         dept:'Design',      bio:'Mixed-methods researcher who turns ambiguity into actionable insights. Experience at Google and Airbnb shaping product decisions through user empathy.',
    img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face', socials:[Linkedin] },
  { name:'Carlos Garcia',     role:'UI Designer',           dept:'Design',      bio:'Craft-obsessed visual designer with a background in fine arts and motion graphics. Creates design systems that scale and interfaces that delight.',
    img:'https://images.unsplash.com/photo-1560250097-0dc05ffedb3d?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Dribbble] },
  { name:'Emma Wilson',       role:'Interaction Designer',  dept:'Design',      bio:'Motion design meets interaction design. Makes interfaces feel alive with micro-interactions and transitions that communicate meaning, not just decoration.',
    img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face', socials:[Linkedin,Dribbble] },
]

export default function TeamPage() {
  return (
    <>
      <section className="section pt-36" style={{ background:'var(--bg-surface)' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
            className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:'var(--text-muted)' }}>/ 01 — Team</p>
            <div className="flex items-end gap-6">
              <h1 className="section-title shrink-0">Our People</h1>
              <div className="flex-1 h-px mb-2.5" style={{ background:'var(--border)' }} />
              <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
                style={{ fontSize:'clamp(3.5rem,6vw,6rem)', lineHeight:1, color:'transparent', WebkitTextStroke:'1px var(--ghost-stroke)', letterSpacing:'-0.04em' }}>01</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FULL_TEAM.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-40px' }}
                transition={{ delay:(i%4)*.08, duration:.55 }}
                className="card p-6 group"
              >
                <div className="relative mb-5">
                  <img src={m.img} alt={m.name}
                    className="w-full aspect-square rounded-xl object-cover"
                    style={{ objectPosition:'top' }}
                    onError={e=>{ e.target.src=`https://ui-avatars.com/api/?name=${m.name}&bg=6366f1&color=fff&bold=true&size=400` }} />
                  <span className="absolute bottom-3 left-3 chip text-[9px]">{m.dept}</span>
                </div>
                <h3 className="font-syne font-bold text-base mb-0.5" style={{ color:'var(--text-primary)' }}>{m.name}</h3>
                <p className="font-mono text-xs mb-3 text-accent">{m.role}</p>
                <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color:'var(--text-secondary)' }}>{m.bio}</p>
                <div className="flex gap-2">
                  {m.socials.map((Icon, si) => (
                    <button key={si} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:border-accent"
                      style={{ background:'var(--bg)', border:'1px solid var(--border)' }}>
                      <Icon className="w-3 h-3" style={{ color:'var(--text-secondary)' }} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <JoinUsSection />
    </>
  )
}

const OPEN_ROLES = [
  { title: 'Senior React Engineer',     dept: 'Engineering', type: 'Full-time · Remote',  desc: 'Build complex, performant UIs for our most demanding clients. 5+ years React required.' },
  { title: 'AI/ML Engineer',            dept: 'AI/ML',       type: 'Full-time · Remote',  desc: 'Design and ship production LLM pipelines, RAG systems, and fine-tuning workflows.' },
  { title: 'Product Designer',          dept: 'Design',      type: 'Full-time · Remote',  desc: 'Craft end-to-end product experiences from zero. Figma expert with a portfolio that proves it.' },
  { title: 'Growth Marketing Manager',  dept: 'Marketing',   type: 'Full-time · Remote',  desc: 'Own our paid and organic growth channels. Data-driven, experiment-first mindset essential.' },
]

const PERKS = [
  { icon: Globe2, label: '100% Remote',         desc: 'Work from anywhere. We have teammates in 18 countries.' },
  { icon: Clock,  label: 'Async-first culture', desc: 'No mandatory stand-ups. Deep work is protected.' },
  { icon: Zap,    label: '20% R&D time',        desc: 'Dedicated learning hours built into every quarter.' },
  { icon: Heart,  label: 'Top-of-market pay',   desc: 'Competitive salary + equity + full benefits.' },
]

function JoinUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>/ 02 — Careers</p>
          <div className="flex items-end gap-6">
            <h2 className="section-title shrink-0">Join the Team</h2>
            <div className="flex-1 h-px mb-2.5" style={{ background: 'var(--border)' }} />
            <span className="font-syne font-extrabold hidden lg:block shrink-0 select-none"
              style={{ fontSize: 'clamp(3.5rem,6vw,6rem)', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px var(--ghost-stroke)', letterSpacing: '-0.04em' }}>02</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            We hire exceptional people and get out of their way. If you're obsessed with craft and love working on hard problems, you'll fit right in.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10">

          {/* Open roles */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Open positions</p>
            <div className="space-y-3">
              {OPEN_ROLES.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group card p-6 flex items-start justify-between gap-4"
                  style={{ borderRadius: 14, cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ''}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-syne font-bold text-base" style={{ color: 'var(--text-primary)' }}>{role.title}</h3>
                      <span className="chip text-[9px]">{role.dept}</span>
                    </div>
                    <p className="font-mono text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{role.type}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{role.desc}</p>
                  </div>
                  <Link to="/contact"
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors group-hover:border-accent"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Why you'll love it here</p>
            <div className="space-y-3">
              {PERKS.map(({ icon: Icon, label, desc }, i) => (
                <div key={label} className="card p-5 flex items-start gap-4" style={{ borderRadius: 14 }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-syne font-bold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 card p-5 flex flex-col gap-3" style={{ borderRadius: 14, borderColor: 'var(--accent)', borderWidth: 1 }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Don't see your role? We hire for attitude and aptitude — send us your work.</p>
              <Link to="/contact" className="btn btn-primary w-full justify-center text-sm py-2.5">
                Send a Speculative Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
