import { useEffect, useRef } from 'react'

export function useAlObserver() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const items = section.querySelectorAll('.al-item')

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.05 })

    items.forEach(el => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('in')
      } else {
        obs.observe(el)
      }
    })

    return () => obs.disconnect()
  }, [])

  return ref
}
