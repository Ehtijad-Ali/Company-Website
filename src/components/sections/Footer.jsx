import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp, Send, Linkedin, Twitter, Github, Instagram, Dribbble } from 'lucide-react'
import { useContact } from '../../context/ContactContext'
import CodeNodeLogo from '../CodeNodeLogo'

const NAV = {
  Company:  [['About',     '/about'],['Team','/team'],['Portfolio','/portfolio'],['Careers','#'],['Blog','/blog']],
  Services: [['Web Dev',   '/services'],['Mobile Apps','/services'],['UI/UX','/services'],['AI & ML','/services'],['Marketing','/services']],
  Legal:    [['Privacy',   '/privacy'],['Terms','/terms'],['Cookies','/cookies'],['Sitemap','/sitemap']],
}
const SOCIALS = [[Linkedin,'LinkedIn'],[Twitter,'Twitter'],[Github,'GitHub'],[Instagram,'Instagram'],[Dribbble,'Dribbble']]

export default function Footer() {
  const [email, setEmail]         = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { openContact } = useContact()
  const { pathname } = useLocation()

  /* Routes that already end with a dedicated CTA section — showing the footer
     banner too would ask twice in a row. */
  const hasOwnCTA = pathname === '/'

  return (
    <footer className="relative pt-20 footer-fab-clear" style={{ background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="container relative z-10">
        {/* CTA banner — suppressed on routes that close with their own CTA */}
        {!hasOwnCTA && <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="rounded-3xl p-10 md:p-14 mb-20 text-center overflow-hidden relative"
          style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
          <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
            <div className="anim-glow absolute w-[500px] h-[200px] rounded-full -top-20 left-1/2 -translate-x-1/2"
              style={{ background:'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)' }} />
          </div>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl mb-3 relative z-10" style={{ color:'var(--text-primary)' }}>
            Ready to ship something <span className="text-accent">great?</span>
          </h2>
          <p className="section-sub mx-auto mb-8 relative z-10">Turn your ideas into reality. No lengthy proposals — just results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button onClick={openContact} className="btn btn-primary">Start a Project</button>
            <Link to="/portfolio" className="btn btn-secondary">See Our Work</Link>
          </div>
        </motion.div>}

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="tap flex items-center mb-5 group" style={{ textDecoration: 'none' }}>
              <CodeNodeLogo height={28} />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color:'var(--text-secondary)' }}>
              Premium digital agency crafting extraordinary web experiences, AI solutions, and mobile applications for ambitious companies worldwide.
            </p>
            {/* Newsletter */}
            <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color:'var(--text-secondary)' }}>Newsletter</p>
            {subscribed
              ? <p className="text-sm font-medium text-green-400">✓ Subscribed!</p>
              : (
                <form onSubmit={e=>{e.preventDefault();if(email){setSubscribed(true);setEmail('')}}} className="flex">
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 rounded-l-xl text-sm"
                    style={{ background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-primary)', outline:'none' }} />
                  <button type="submit" className="px-4 py-2.5 rounded-r-xl" style={{ background:'var(--primary)', color:'var(--primary-contrast)' }}>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
          </div>

          {/* Links */}
          {Object.entries(NAV).map(([title, links]) => (
            <div key={title}>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-5" style={{ color:'var(--text-secondary)' }}>{title}</p>
              <ul className="space-y-1 lg:space-y-3">
                {links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="tap text-sm transition-colors hover:text-accent"
                      style={{ color:'var(--text-secondary)' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8"
          style={{ borderTop:'1px solid var(--border)' }}>
          <p className="font-mono text-xs" style={{ color:'var(--text-secondary)' }}>
            © {new Date().getFullYear()} CodeNode. Crafted with ♥
          </p>
          <div className="flex gap-2">
            {SOCIALS.map(([Icon, label]) => (
              <motion.a key={label} href="#" title={label} whileHover={{ y:-3 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:border-accent"
                style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
                <Icon className="w-3.5 h-3.5" style={{ color:'var(--text-secondary)' }} />
              </motion.a>
            ))}
          </div>
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            className="tap flex items-center gap-2 font-mono text-xs transition-colors hover:text-accent"
            style={{ color:'var(--text-secondary)' }}>
            <ArrowUp className="w-3.5 h-3.5" />Back to top
          </button>
        </div>
      </div>

      {/* Brand watermark */}
      <div className="overflow-hidden mt-10 select-none pointer-events-none"
        style={{ paddingLeft: 'max(1.5rem, calc((100% - 1200px) / 2 + 1.5rem))', marginBottom: '-0.25rem' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.25rem, 16vw, 230px)',
          fontWeight: 500,
          letterSpacing: '-0.045em',
          lineHeight: 0.88,
          color: 'var(--text-primary)',
          opacity: 0.05,
          display: 'block',
          whiteSpace: 'nowrap',
        }}>
          CODENODE
        </span>
      </div>
    </footer>
  )
}
