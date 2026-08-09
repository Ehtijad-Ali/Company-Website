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

/**
 * Founding year. The About page previously ran a 2014–2024 timeline claiming
 * 500 projects and 50+ staff, while its own prose said "we started in 2024"
 * and "in our first year". 2014 is consistent with `years` above; the numbers
 * around it are now the boutique ones the rest of the site states.
 */
export const FOUNDED = 2014
export const TEAM_SIZE = 12

/** "60+", "$50M+", "4.9★" — one formatter so every surface renders alike. */
export const format = key => {
  const m = METRICS[key]
  if (!m) return ''
  const n = m.decimals ? m.value.toFixed(m.decimals) : m.value
  return `${m.prefix ?? ''}${n}${m.suffix ?? ''}`
}
