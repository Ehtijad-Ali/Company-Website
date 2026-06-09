import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = `${(window.scrollY / max) * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="scroll-progress" style={{ width: '0%' }} />
}
