import React from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import { Link } from 'react-router-dom'
import {
  Code2, Palette, Brain, Smartphone, BarChart3, Cloud, Shield, Zap,
  ArrowRight, CheckCircle2, Clock, GitBranch, HeartHandshake,
  Rocket, Lock, Headphones, Trophy, Star,
} from 'lucide-react'
import { useContact } from '../context/ContactContext'

const ALL_SERVICES = [
  { icon:Code2,     title:'Web Development',    price:'From $8,000',
    features:['Custom React / Next.js applications','RESTful & GraphQL APIs','Database design & optimisation','Performance-first architecture','CI/CD & DevOps setup','3 months post-launch support'],
    desc:'We architect blazing-fast, scalable web applications that set you apart from the competition.' },
  { icon:Palette,   title:'UI/UX Design',        price:'From $5,000',
    features:['Discovery & user research','Information architecture','High-fidelity prototypes','Design system creation','Usability testing','Figma hand-off'],
    desc:'Award-winning interfaces that balance aesthetic beauty with conversion-focused interaction design.' },
  { icon:Brain,     title:'AI & Machine Learning',price:'From $12,000',
    features:['Custom model training & fine-tuning','LLM integration (GPT-4, Claude, Llama)','Predictive analytics dashboards','Computer vision pipelines','NLP & document processing','MLOps & monitoring'],
    desc:'Intelligent systems that automate the complex and turn your data into a strategic advantage.' },
  { icon:Smartphone,title:'Mobile Development',  price:'From $10,000',
    features:['React Native cross-platform','Native iOS (Swift)','Native Android (Kotlin)','App Store & Play Store submission','Push notifications & deep linking','Offline-first architecture'],
    desc:'Beautiful, performant mobile apps that users actually want to open — every single day.' },
  { icon:BarChart3, title:'Digital Marketing',   price:'From $3,000/mo',
    features:['SEO strategy & technical audit','Google / Meta paid campaigns','Content strategy & creation','Conversion rate optimisation','Monthly reporting dashboards','A/B testing programmes'],
    desc:'Data-driven growth strategies that compound over time and deliver measurable ROI.' },
  { icon:Cloud,     title:'Cloud & DevOps',       price:'From $6,000',
    features:['AWS / GCP / Azure architecture','Kubernetes & container orchestration','Infrastructure as Code (Terraform)','Zero-downtime deployment','Security hardening','Cost optimisation'],
    desc:'Scalable, resilient infrastructure that grows with your business without breaking the bank.' },
  { icon:Shield,    title:'Cybersecurity',        price:'From $4,000',
    features:['Full penetration testing','OWASP Top 10 audit','SOC 2 preparation','Vulnerability assessments','Employee security training','Incident response planning'],
    desc:'Comprehensive security solutions that protect your assets, reputation, and customers.' },
  { icon:Zap,       title:'Performance Audit',    price:'From $2,500',
    features:['Core Web Vitals optimisation','Lighthouse audit & fixes','Bundle analysis & code splitting','CDN configuration','Image & asset optimisation','Monthly performance report'],
    desc:'Sub-second load times, top Core Web Vitals scores, and users who actually stick around.' },
]

export default function ServicesPage() {
  const { openContact } = useContact()
  return (
    <>
      {/* Services grid */}
      <section className="section pt-36" style={{ background:'var(--bg-surface)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-12">
            <p className="eyebrow mb-3">
              <span style={{ color: 'var(--brand)' }}>01</span>
              <span style={{ margin: '0 0.6rem', opacity: 0.4 }}>/</span>Services
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--step-5)', fontWeight: 500,
              lineHeight: 1.05, letterSpacing: '-0.028em', color: 'var(--text-primary)',
            }}>
              Eight disciplines you can <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--brand)' }}>buy separately</em>
            </h1>
            <p className="section-sub mt-4">
              Each one is a standalone engagement. Most projects combine two or three —
              we'll tell you which after a discovery call, including when the answer is "fewer".
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {ALL_SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.title}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-60px' }} transition={{ delay:(i%2)*.1, duration:.6 }}
                  className="card p-8 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px] pointer-events-none"
                    style={{ background:'radial-gradient(circle at 0% 0%, var(--accent-glow) 0%, transparent 55%)' }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background:'var(--bg-surface)', border:'1px solid var(--border)' }}>
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="chip text-[10px]">{s.price}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.375rem',
                                 letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color:'var(--text-secondary)' }}>{s.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {s.features.map(f => (
                        <div key={f} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent" />
                          <span className="text-xs" style={{ color:'var(--text-secondary)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={openContact} className="tap inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color:'var(--accent)', background:'none', border:'none', cursor:'pointer', padding:0, textDecoration:'underline', textUnderlineOffset:'4px' }}>
                      Get a quote <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <WhyUsSection />
      <GuaranteeSection />
      <TechStackSection />
    </>
  )
}

/* ─── WHY CHOOSE US ────────────────────────────────────────────── */
const WHY_US = [
  { icon: Rocket,       stat: '3×',   color: 'var(--brand)', title: 'Faster Time-to-Market',   desc: 'Our battle-tested sprint framework cuts typical agency timelines by two-thirds — without skipping a single quality gate.' },
  { icon: Lock,         stat: '100%', color: 'var(--brand)', title: 'IP Fully Owned by You',    desc: 'Every line of code and asset belongs to you from day one. We sign an IP assignment clause in every contract — no exceptions.' },
  { icon: Headphones,   stat: '24/7', color: 'var(--brand)', title: 'Always-On Support',        desc: 'Real humans, fast responses, zero ticket limbo. Your dedicated team is one Slack message away, around the clock.' },
  { icon: Trophy,       stat: '98%',  color: 'var(--brand)', title: 'Client Satisfaction',      desc: 'Measured after every engagement, not cherry-picked. Most clients come back for a second project.' },
]

function WhyUsSection() {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)' }}>
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: 'var(--border)' }} />
      <div className="container">
          <SectionHeader
            num="02"
            label="Advantage"
            title={[{ t: 'Why teams keep ' }, { t: 'coming back', em: true }]}
            inView={inView}
            className="mb-12"
          />

        <div className="grid sm:grid-cols-2 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative card p-8 overflow-hidden" style={{ borderRadius: 20 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${item.color}22 0%, transparent 60%)` }} />
                <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="tnum" style={{ fontFamily: 'var(--font-display)', fontWeight: 500,
                                 fontSize: '2.25rem', letterSpacing: '-0.025em', color: item.color }}>{item.stat}</span>
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── GUARANTEE SECTION (unchanged) ───────────────────────────── */
const GUARANTEES = [
  { icon: Clock,          stat: '97%',  statSub: 'on-time delivery rate',         title: 'Deadline or Discount',    desc: 'We set realistic timelines upfront and protect them ruthlessly. Miss a milestone? You get a credit on the next sprint — no excuses, no exceptions.' },
  { icon: Zap,            stat: '<1s',  statSub: 'load time on all web builds',   title: 'Speed as a Feature',      desc: 'Every web product ships only after passing our Core Web Vitals audit. Lighthouse scores are baked into our definition of done — not an afterthought.' },
  { icon: GitBranch,      stat: '100%', statSub: 'IP ownership from day one',     title: 'Your Code, Always',       desc: 'Full source ownership, documented CI/CD pipelines, and a recorded architecture walkthrough. Zero vendor lock-in — ever.' },
  { icon: HeartHandshake, stat: '3 mo', statSub: 'post-launch support included',  title: 'We Stay After Launch',    desc: "Three months of bug fixes, uptime monitoring, and direct Slack access to the engineers who built it — because shipping is the beginning, not the end." },
]

function GuaranteeSection() {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: 'var(--border)' }} />
      <div className="container">
          <SectionHeader
            num="03"
            label="Promise"
            title={[{ t: 'Commitments, ' }, { t: 'not assurances', em: true }]}
            subtitle="Vague promises are easy. These are specific and measurable, and we back them."
            inView={inView}
            className="mb-12"
          />
        <div className="grid sm:grid-cols-2 gap-5">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon
            return (
              <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative card p-8 overflow-hidden" style={{ borderRadius: 20 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 0% 100%, var(--accent-glow) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="tnum select-none"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '2.5rem',
                               lineHeight: 1, color: 'var(--brand)', opacity: 0.35 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-syne font-extrabold text-4xl" style={{ color: 'var(--text-primary)' }}>{g.stat}</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>{g.statSub}</span>
                  </div>
                  <div className="h-px my-4" style={{ background: 'var(--border)' }} />
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{g.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10 text-center font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Every engagement. No fine print.
        </motion.p>
      </div>
    </section>
  )
}

/* ─── TECH STACK SECTION ───────────────────────────────────────── */
const TECH = [
  { name: 'React',       abbr: 'Re',  color: '#61DAFB', cat: 'Frontend'  },
  { name: 'Next.js',     abbr: 'N▲',  color: '#E0C8AC', cat: 'Frontend'  },
  { name: 'TypeScript',  abbr: 'TS',  color: '#3178C6', cat: 'Language'  },
  { name: 'Node.js',     abbr: 'No',  color: '#539E43', cat: 'Backend'   },
  { name: 'Python',      abbr: 'Py',  color: '#3776AB', cat: 'Backend'   },
  { name: 'PostgreSQL',  abbr: 'PG',  color: '#336791', cat: 'Database'  },
  { name: 'MongoDB',     abbr: 'Mg',  color: '#47A248', cat: 'Database'  },
  { name: 'AWS',         abbr: 'AWS', color: '#FF9900', cat: 'Cloud'     },
  { name: 'Docker',      abbr: 'Do',  color: '#2496ED', cat: 'DevOps'    },
  { name: 'Kubernetes',  abbr: 'K8s', color: '#326CE5', cat: 'DevOps'    },
  { name: 'TensorFlow',  abbr: 'TF',  color: '#FF6F00', cat: 'AI / ML'   },
  { name: 'OpenAI',      abbr: 'AI',  color: '#10A37F', cat: 'AI / ML'   },
]

function TechStackSection() {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
          <SectionHeader
            num="04"
            label="Stack"
            title={[{ t: 'The tools behind ' }, { t: 'the work', em: true }]}
            subtitle="We pick per problem rather than per résumé. These are the ones we reach for most."
            inView={inView}
            className="mb-12"
          />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {TECH.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative card p-5 overflow-hidden flex flex-col items-center text-center gap-3"
              style={{ borderRadius: 16, cursor: 'default' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-[16px] pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${t.color}18 0%, transparent 65%)` }} />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-extrabold text-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 relative z-10"
                style={{ background: `${t.color}15`, border: `1px solid ${t.color}35`, color: t.color, letterSpacing: '-0.02em' }}>
                {t.abbr}
              </div>
              <div className="relative z-10">
                <p className="font-syne font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.cat}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }} className="mt-14 text-center"
        >
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            Not sure what stack is right for your project? Let's talk — we'll guide you to the best choice.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
