import React, { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import TechCube from '../ui/TechCube'

const STACK = [
  { name:'React',        cat:'Frontend'   },
  { name:'Next.js',      cat:'Frontend'   },
  { name:'TypeScript',   cat:'Language'   },
  { name:'Tailwind CSS', cat:'Styling'    },
  { name:'Node.js',      cat:'Backend'    },
  { name:'Python',       cat:'Backend'    },
  { name:'GraphQL',      cat:'API'        },
  { name:'PostgreSQL',   cat:'Database'   },
  { name:'MongoDB',      cat:'Database'   },
  { name:'Redis',        cat:'Cache'      },
  { name:'AWS',          cat:'Cloud'      },
  { name:'Docker',       cat:'DevOps'     },
  { name:'Kubernetes',   cat:'DevOps'     },
  { name:'TensorFlow',   cat:'AI/ML'      },
  { name:'PyTorch',      cat:'AI/ML'      },
  { name:'LangChain',    cat:'AI/ML'      },
  { name:'Three.js',     cat:'3D/XR'      },
  { name:'Framer Motion',cat:'Animation'  },
  { name:'Figma',        cat:'Design'     },
  { name:'Stripe',       cat:'Payments'   },
]

const CATS = ['All','Frontend','Backend','AI/ML','Cloud','DevOps','Database']

export default function TechStack() {
  const [active, setActive] = React.useState('All')
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const shown  = active === 'All' ? STACK : STACK.filter(t => t.cat === active)

  return (
    <section id="stack" ref={ref} className="section" style={{ background:'var(--bg-surface)' }}>
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background:'var(--border)' }} />
      <div className="container">
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:'var(--text-muted)' }}>/ Technology</p>
          <div className="flex items-end gap-6">
            <h2 className="section-title shrink-0">Our Stack</h2>
            <div className="flex-1 h-px mb-2.5" style={{ background:'var(--border)' }} />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: interactive 3D cube */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.7 }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 0 60px var(--cube-glow)',
            }}>
              <TechCube />
            </div>
          </motion.div>

          {/* Right: category filter + badge grid */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.7 }}>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATS.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: active===c ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  {active===c && (
                    <motion.span layoutId="stack-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background:'var(--accent-glow)', border:'1px solid var(--border)' }}
                      transition={{ type:'spring', bounce:.15, duration:.4 }} />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>

            {/* Tech grid */}
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {shown.map((t, i) => (
                  <motion.div key={t.name} layout
                    initial={{ opacity:0, scale:.88 }} animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0, scale:.88 }} transition={{ delay:i*.04, duration:.35 }}
                    className="card p-4 flex flex-col items-center text-center cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 font-mono text-xs font-bold"
                      style={{ background:'var(--bg)', border:'1px solid var(--border)', color:'var(--accent)' }}>
                      {t.name.slice(0,2).toUpperCase()}
                    </div>
                    <p className="text-xs font-semibold" style={{ color:'var(--text-primary)' }}>{t.name}</p>
                    <p className="font-mono text-[9px] mt-1" style={{ color:'var(--text-secondary)' }}>{t.cat}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
