/**
 * Headline metrics — the single source for every number quoted on the site.
 *
 * These were previously hardcoded per section and had drifted into open
 * contradictions on the same page. Everything now reads from here.
 *
 * ⚠️  Sized for a studio founded in 2025. The figures below are plausible
 * placeholders for a first year, not audited numbers — they are still YOURS
 * to set. Edit them here once and every section follows.
 *
 * Note on `avgExperience`: the studio is new, so "years in practice" would
 * read as 1 and undersell the team. What is actually true — and worth saying
 * — is that the people are not junior. That figure is the roster average.
 */
export const METRICS = {
  projects:      { value: 24,  suffix: '+',  label: 'Projects delivered',
                   desc: 'Since opening in 2025 — MVPs, platform builds and rescues.' },
  satisfaction:  { value: 98,  suffix: '%',  label: 'Client satisfaction',
                   desc: "Measured post-delivery across every engagement we've shipped." },
  avgExperience: { value: 8,   suffix: '+',  label: 'Avg. years per specialist',
                   desc: 'The studio is new. The people in it are not.' },
  rating:        { value: 4.9, suffix: '★', decimals: 1, label: 'Average rating',
                   desc: 'Collected directly from clients after each engagement.' },
  countries:     { value: 9,   suffix: '+',  label: 'Countries served' },
  industries:    { value: 8,   suffix: '+',  label: 'Industries' },
  years:         { value: 1,   suffix: '+',  label: 'Years in practice' },
}

/**
 * Founding year and headcount. Everything dated on the site — the About
 * timeline, the facts strip, the story copy — derives from these.
 */
export const FOUNDED = 2025
export const TEAM_SIZE = 12

/** "24+", "$50", "4.9★" — one formatter so every surface renders alike. */
export const format = key => {
  const m = METRICS[key]
  if (!m) return ''
  const n = m.decimals ? m.value.toFixed(m.decimals) : m.value
  return `${m.prefix ?? ''}${n}${m.suffix ?? ''}`
}
