import { useEffect, useRef } from 'react'

const observers = new WeakMap()

function getObserver(margin = '0px 0px -60px 0px', threshold = 0) {
  // Reuse a single observer per config to reduce overhead
  const key = `${margin}|${threshold}`
  if (!getObserver._cache) getObserver._cache = {}
  if (!getObserver._cache[key]) {
    getObserver._cache[key] = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            getObserver._cache[key].unobserve(entry.target)
          }
        })
      },
      { rootMargin: margin, threshold }
    )
  }
  return getObserver._cache[key]
}

/**
 * Attach to a ref — adds `.revealed` when the element enters the viewport.
 * variant: '' | 'fade' | 'left' | 'right' | 'scale'
 * delay: 0-4 (adds .reveal-delay-N class)
 */
export function useScrollReveal({ variant = '', delay = 0, margin } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cls = variant ? `reveal-${variant}` : 'reveal'
    el.classList.add(cls)
    if (delay > 0) el.classList.add(`reveal-delay-${delay}`)

    const obs = getObserver(margin)
    obs.observe(el)

    return () => {
      obs.unobserve(el)
      el.classList.remove(cls, `reveal-delay-${delay}`, 'revealed')
    }
  }, [variant, delay, margin])

  return ref
}

export default useScrollReveal
