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
      className="pt-[calc(var(--nav-h)+80px)] pb-[100px] max-md:pt-[calc(var(--nav-h)+50px)] max-md:pb-16 max-sm:pt-[calc(60px+32px)] max-sm:pb-12">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        {/* Role tag */}
        <div className="al-item flex items-center gap-2 mb-5 max-sm:mb-4" style={{ '--al-i': 0 }}>
          <span className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-[var(--text3)] max-sm:text-[0.7rem] max-sm:tracking-[0.1em]">
            Software Developer
          </span>
          <span className="text-[0.65rem] font-medium tracking-[0.08em] uppercase text-accent bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] px-2 py-[2px] rounded-md max-sm:text-[0.6rem] max-sm:px-1.5">
            {hero.roleTag}
          </span>
        </div>

        {/* Name */}
        <p className="al-item text-base font-medium text-[var(--text3)] tracking-[0.08em] mb-1 min-h-[1.4rem] max-sm:text-[0.85rem] max-sm:mb-0.5"
           style={{ '--al-i': 1 }}>
          {greeting}
        </p>

        <h1 className="al-item text-[clamp(3.2rem,7.5vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] mb-7 text-accent min-h-[1.1em] max-md:text-[clamp(2.8rem,6vw,4.5rem)] max-sm:text-[clamp(2.2rem,10vw,3.2rem)] max-sm:mb-4"
            style={{ '--al-i': 2 }}>
          {name}
        </h1>

        {/* Description */}
        <p className="al-item text-[clamp(0.95rem,1.4vw,1.08rem)] text-[var(--text2)] max-w-[520px] font-light mb-10 leading-[1.85] max-md:max-w-[460px] max-sm:text-[0.88rem] max-sm:leading-[1.7] max-sm:mb-7 max-sm:max-w-full"
           style={{ '--al-i': 3 }}>
          {hero.description}
        </p>

        {/* Single CTA */}
        <div className="al-item max-sm:w-full" style={{ '--al-i': 4 }}>
          <RippleBtn
            href={hero.ctaPrimary.href}
            className="btn-primary bg-accent text-white shadow-[0_4px_24px_var(--accent-glow)] hover:shadow-[0_8px_36px_var(--accent-glow)] max-sm:w-full max-sm:justify-center max-sm:px-5 max-sm:py-3.5 max-sm:text-[0.85rem]">
            {hero.ctaPrimary.label}
          </RippleBtn>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-12 mt-14 pt-9 border-t border-[var(--border)] max-md:grid-cols-4 max-md:gap-8 max-md:mt-10 max-md:pt-8 max-sm:grid-cols-2 max-sm:gap-x-6 max-sm:gap-y-5 max-sm:mt-8 max-sm:pt-6">
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="al-item" style={{ '--al-i': i + 5 }}>
              <div className="text-[2rem] font-bold text-[var(--text)] leading-none tracking-[-0.04em] max-md:text-[1.7rem] max-sm:text-[1.5rem]">
                {stat.value}{stat.suffix && <em className="text-accent not-italic">{stat.suffix}</em>}
              </div>
              <div className="text-[0.76rem] text-[var(--text3)] mt-1 max-sm:text-[0.68rem]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Available badge */}
        {personal.available && (
          <div className="al-item inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-3.5 py-1.5 rounded-full text-[0.78rem] font-medium text-[var(--text2)] mt-7 max-sm:text-[0.7rem] max-sm:px-3 max-sm:py-1 max-sm:mt-5"
               style={{ '--al-i': 9 }}>
            <span className="w-[7px] h-[7px] rounded-full bg-accent3 animate-pulse-glow shrink-0 max-sm:w-[6px] max-sm:h-[6px]" />
            {personal.availableText}
          </div>
        )}
      </div>
    </section>
  )
}
