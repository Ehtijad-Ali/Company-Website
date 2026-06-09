import React from 'react'
import { ArrowUp } from 'lucide-react'

export default function SectionFooter() {
  return (
    <div style={{
      marginTop: '3rem',
      paddingTop: '1.25rem',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        margin: 0,
        letterSpacing: '0.04em',
      }}>
        © {new Date().getFullYear()} CodeNode. Crafted with ♥
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
          color: 'var(--text-muted)', background: 'none', border: 'none',
          cursor: 'pointer', transition: 'color 0.2s', letterSpacing: '0.04em',
          padding: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowUp style={{ width: '0.7rem', height: '0.7rem' }} />
        Back to top
      </button>
    </div>
  )
}
