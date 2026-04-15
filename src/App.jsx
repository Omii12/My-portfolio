import { useState, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const canvasRef = useRef(null)
  const busyRef   = useRef(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme(btnEl) {
    if (busyRef.current) return
    busyRef.current = true

    const next   = theme === 'dark' ? 'light' : 'dark'
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const r0   = btnEl.getBoundingClientRect()
    const cx   = r0.left + r0.width  / 2
    const cy   = r0.top  + r0.height / 2
    const maxR = Math.hypot(Math.max(cx, canvas.width - cx), Math.max(cy, canvas.height - cy))
    const fill = next === 'light' ? '#f4f4ff' : '#09090e'

    let r = 0, applied = false
    canvas.style.opacity = '1'

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = fill; ctx.fill()
      r += maxR / 16
      if (!applied && r >= maxR * 0.45) { setTheme(next); applied = true }
      if (r < maxR + 20) {
        requestAnimationFrame(frame)
      } else {
        let op = 1
        const fade = setInterval(() => {
          op -= 0.12
          canvas.style.opacity = Math.max(0, op)
          if (op <= 0) {
            clearInterval(fade)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvas.style.opacity = '0'
            busyRef.current = false
          }
        }, 16)
      }
    }
    frame()
  }

  return (
    <>
      <canvas id="theme-canvas" ref={canvasRef} />

      {/* Ambient orbs */}
      <div className="orb animate-orb fixed rounded-full pointer-events-none z-0 w-[600px] h-[600px] -top-[180px] -left-[150px]"
           style={{ background: 'var(--accent)', opacity: 'var(--orb-op)', filter: 'blur(110px)' }} />
      <div className="orb animate-orb fixed rounded-full pointer-events-none z-0 w-[450px] h-[450px] bottom-[5%] -right-[100px] [animation-delay:-8s]"
           style={{ background: 'var(--accent2)', opacity: 'var(--orb-op)', filter: 'blur(110px)' }} />
      <div className="orb animate-orb fixed rounded-full pointer-events-none z-0 w-[350px] h-[350px] top-[45%] left-[40%] [animation-delay:-15s]"
           style={{ background: 'var(--accent3)', opacity: 'var(--orb-op)', filter: 'blur(110px)' }} />

      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <div className="h-px bg-[var(--border)] relative z-[1]" />
        <Skills />
        <div className="h-px bg-[var(--border)] relative z-[1]" />
        <Experience />
        <div className="h-px bg-[var(--border)] relative z-[1]" />
        <Projects theme={theme} onToggleTheme={toggleTheme} />
        <div className="h-px bg-[var(--border)] relative z-[1]" />
        <About />
      </main>

      <Footer />
    </>
  )
}
