/**
 * Headline metrics — the single source for every number quoted on the site.
 *
 * These were previously hardcoded per section and had drifted into open
 * contradictions on the same page: the hero claimed 500+ projects while the
 * stats section claimed 60+, and countries were 30+ in two places and 18+ in
 * a third — directly beneath a bar reading "no made-up numbers".
 *
 * ⚠️  The values below resolve those clashes by taking the more conservative,
 * more specifically-described figure in each case. They are still YOUR numbers
 * to set — edit them here once and every section follows.
 */
export const METRICS = {
  projects:     { value: 60,  suffix: '+',  label: 'Projects delivered',
                  desc: 'From zero-to-one MVPs to large-scale enterprise rewrites.' },
  satisfaction: { value: 98,  suffix: '%',  label: 'Client satisfaction',
                  desc: "Measured post-delivery across every engagement we've shipped." },
  revenue:      { value: 50,  prefix: '$', suffix: 'M+', label: 'Revenue unlocked',
                  desc: 'Measurable business impact our products have driven for clients.' },
  rating:       { value: 4.9, suffix: '★', decimals: 1, label: 'Average rating',
                  desc: 'Verified across Clutch, Upwork, and direct client surveys.' },
  countries:    { value: 30,  suffix: '+',  label: 'Countries served' },
  industries:   { value: 12,  suffix: '+',  label: 'Industries' },
  years:        { value: 10,  suffix: '+',  label: 'Years in practice' },
}

/** "60+", "$50M+", "4.9★" — one formatter so every surface renders alike. */
export const format = key => {
  const m = METRICS[key]
  if (!m) return ''
  const n = m.decimals ? m.value.toFixed(m.decimals) : m.value
  return `${m.prefix ?? ''}${n}${m.suffix ?? ''}`
}
