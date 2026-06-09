import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x: -100, y: -100 })
  const cur  = useRef({ x: -100, y: -100 })
  const raf  = useRef(null)

  useEffect(() => {
    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      d.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.13
      cur.current.y += (pos.current.y - cur.current.y) * 0.13
      r.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(tick)
    }

    const enter = () => r.classList.add('hov')
    const leave = () => r.classList.remove('hov')

    window.addEventListener('mousemove', move, { passive: true })
    raf.current = requestAnimationFrame(tick)

    const cleanup = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    const t = setTimeout(cleanup, 3000)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div id="cur-dot"  ref={dot}  />
      <div id="cur-ring" ref={ring} />
    </>
  )
}
