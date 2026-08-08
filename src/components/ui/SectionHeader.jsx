import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const E = [0.22, 1, 0.36, 1]

/**
 * The one section header used across the site.
 *
 * Replaces the per-section copies that each rebuilt an eyebrow, a heading and
 * a giant outline-stroke number — five near-identical implementations that
 * drifted apart. Outline-stroke display type is deliberately gone: it reads as
 * a template at the best of times, and badly in a high-contrast serif.
 *
 * `title` takes a string, or an array of parts where `{ em: true }` marks the
 * one phrase set in italic brand colour:
 *   title={[{ t: 'Numbers that ' }, { t: 'move', em: true }, { t: ' the needle' }]}
 */
export default function SectionHeader({
  num,
  label,
  title,
  subtitle,
  action,       // { to, label }
  align = 'split',  // 'split' puts the action opposite the heading; 'stack' drops it below
  inView = true,
  className = '',
}) {
  const parts = Array.isArray(title) ? title : [{ t: title }]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: E }}
      className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-5 ${className}`}
    >
      <div style={{ maxWidth: '46rem' }}>
        {(num || label) && (
          <p className="eyebrow mb-3">
            {num && <span style={{ color: 'var(--brand)' }}>{num}</span>}
            {num && label && <span style={{ margin: '0 0.6rem', opacity: 0.4 }}>/</span>}
            {label}
          </p>
        )}

        <h2 className="section-title">
          {parts.map((p, i) =>
            p.em
              ? <em key={i} style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--brand)' }}>{p.t}</em>
              : <span key={i}>{p.t}</span>
          )}
        </h2>

        {subtitle && <p className="section-sub mt-4">{subtitle}</p>}
      </div>

      {action && align === 'split' && (
        <Link to={action.to} className="shrink-0 flex items-center gap-2 mb-1 text-sm"
          style={{ color: 'var(--text-secondary)' }}>
          {action.label}
          <span style={{
            width: 30, height: 30, borderRadius: 'var(--r-sm)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)', background: 'var(--bg-card)',
          }}>
            <ArrowUpRight style={{ width: 13, height: 13 }} />
          </span>
        </Link>
      )}
    </motion.div>
  )
}
