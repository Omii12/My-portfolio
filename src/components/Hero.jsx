import { useEffect, useState } from 'react'
import { useAlObserver } from '../hooks/useAlObserver'
import data from '../data/portfolio.json'

const { hero, personal } = data

function useTypewriter() {
  const [greeting, setGreeting] = useState('')
  const [name, setName]         = useState('')

  useEffect(() => {
    let cancelled = false
    function typeText(setText, text, speed, cb) {
      let i = 0
      function tick() {
        if (cancelled) return
        setText(text.slice(0, i++))
        if (i <= text.length) setTimeout(tick, speed)
        else if (cb) setTimeout(cb, 140)
      }
      tick()
    }
    const timer = setTimeout(() => {
      typeText(setGreeting, hero.greeting, 68, () => {
        let i = 0
        function typeMain() {
          if (cancelled) return
          setName(hero.typedName.slice(0, i) + (i < hero.typedName.length ? '|' : ''))
          i++
          if (i <= hero.typedName.length) setTimeout(typeMain, 90)
          else setName(hero.typedName)
        }
        typeMain()
      })
    }, 300)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  return { greeting, name }
}

function RippleBtn({ className, href, children }) {
  function handleClick(e) {
    const btn = e.currentTarget
    const el  = document.createElement('span')
    el.classList.add('ripple')
    const rc = btn.getBoundingClientRect()
    el.style.left = e.clientX - rc.left - 5 + 'px'
    el.style.top  = e.clientY - rc.top  - 5 + 'px'
    btn.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }
  return (
    <a href={href} onClick={handleClick}
      className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-readex font-semibold text-[0.88rem] tracking-[0.03em] no-underline cursor-pointer border-none relative overflow-hidden transition-[transform,box-shadow,background] duration-200 select-none hover:-translate-y-0.5 active:translate-y-0 ${className}`}>
      {children}
    </a>
  )
}

export default function Hero() {
  const sectionRef = useAlObserver()
  const { greeting, name } = useTypewriter()

  return (
    <section id="hero" ref={sectionRef}
      className="pt-[calc(var(--nav-h)+80px)] pb-[100px] max-sm:pt-[calc(60px+40px)] max-sm:pb-[60px]">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        <p className="al-item text-base font-medium text-[var(--text3)] tracking-[0.08em] mb-2.5 min-h-[1.4rem] max-sm:text-[0.9rem]"
           style={{ '--al-i': 0 }}>
          {greeting}
        </p>

        <h1 className="al-item text-[clamp(3.2rem,7.5vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] mb-6 text-accent min-h-[1.1em] max-sm:text-[clamp(2.6rem,12vw,4rem)] max-sm:mb-4"
            style={{ '--al-i': 1 }}>
          {name}
        </h1>

        <p className="al-item text-[clamp(0.95rem,1.4vw,1.1rem)] text-[var(--text2)] max-w-[560px] font-light mb-9 leading-[1.8] max-sm:text-[0.93rem] max-sm:mb-7"
           style={{ '--al-i': 2 }}>
          {hero.description}
        </p>

        <div className="al-item flex gap-3 flex-wrap max-sm:gap-2.5" style={{ '--al-i': 3 }}>
          <RippleBtn
            href={hero.ctaPrimary.href}
            className="btn-primary bg-accent text-white shadow-[0_4px_24px_var(--accent-glow)] hover:shadow-[0_8px_36px_var(--accent-glow)]">
            {hero.ctaPrimary.label}
          </RippleBtn>
          <RippleBtn
            href={hero.ctaSecondary.href}
            className="btn-outline bg-transparent text-[var(--text)] border border-[var(--border)] hover:border-accent hover:text-accent hover:bg-[rgba(108,99,255,0.06)]">
            {hero.ctaSecondary.label}
          </RippleBtn>
        </div>

        {/* Stats */}
        <div className="flex gap-12 flex-wrap mt-13 pt-9 border-t border-[var(--border)] max-sm:gap-6 max-sm:mt-9 max-sm:pt-7">
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="al-item" style={{ '--al-i': i + 4 }}>
              <div className="text-[2rem] font-bold text-[var(--text)] leading-none tracking-[-0.04em] max-sm:text-[1.6rem]">
                {stat.value}{stat.suffix && <em className="text-accent not-italic">{stat.suffix}</em>}
              </div>
              <div className="text-[0.76rem] text-[var(--text3)] mt-1 max-sm:text-[0.7rem]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Available badge */}
        {personal.available && (
          <div className="al-item inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-3.5 py-1.5 rounded-full text-[0.78rem] font-medium text-[var(--text2)] mt-7 max-sm:text-[0.73rem]"
               style={{ '--al-i': 8 }}>
            <span className="w-[7px] h-[7px] rounded-full bg-accent3 animate-pulse-glow shrink-0" />
            {personal.availableText}
          </div>
        )}
      </div>
    </section>
  )
}
