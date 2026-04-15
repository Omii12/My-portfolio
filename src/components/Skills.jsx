import { useEffect, useRef } from 'react'
import { useAlObserver } from '../hooks/useAlObserver'
import data from '../data/portfolio.json'

const { skills } = data

export default function Skills() {
  const sectionRef = useAlObserver()
  const marqueeRef = useRef(null)

  useEffect(() => {
    const track = marqueeRef.current
    if (!track) return
    const allIcons = [...skills.marqueeIcons, ...skills.marqueeIcons]
    allIcons.forEach(icon => {
      const badge = document.createElement('div')
      badge.className = 'inline-flex items-center justify-center w-[56px] h-[56px] rounded-[14px] bg-[var(--surface)] border border-[var(--border)] text-2xl shrink-0 mr-2.5 transition-[border-color,background,transform] duration-200 cursor-default hover:border-[var(--border-h)] hover:bg-[var(--surface-h)] hover:-translate-y-[3px]'
      badge.textContent = icon
      track.appendChild(badge)
    })
    return () => { track.innerHTML = '' }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-[110px] max-md:py-20 max-sm:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="mb-10">
          <div className="al-item sec-label inline-flex items-center text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-accent mb-3"
               style={{ '--al-i': 0 }}>
            {skills.sectionLabel}
          </div>
          <h2 className="al-item text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text)] mt-1.5"
              style={{ '--al-i': 1 }}>
            {skills.sectionTitle}
          </h2>
        </div>

        {/* Skill category grid */}
        <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {skills.categories.map((cat, idx) => (
            <div key={cat.title}
              className="al-item bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-6 py-[22px] transition-[border-color,background] duration-[250ms] hover:border-[var(--border-h)] hover:bg-[var(--surface-h)] max-sm:px-[18px]"
              style={{ '--al-i': idx + 2 }}>
              <div className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-accent mb-3.5 flex items-center gap-2">
                <span className="text-base">{cat.icon}</span> {cat.title}
              </div>
              <div className="flex flex-col gap-[7px]">
                {cat.items.map(item => (
                  <div key={item} className="flex items-center gap-[9px] text-[0.85rem] text-[var(--text2)] font-normal py-[5px] border-b border-[var(--border)] last:border-b-0 last:pb-0">
                    <span className="w-[6px] h-[6px] rounded-full bg-accent shrink-0 opacity-70" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Icon marquee */}
        <div className="al-item icon-marquee-wrap mt-8" style={{ '--al-i': 8 }}>
          <div className="animate-marquee flex gap-0 w-max" ref={marqueeRef} />
        </div>

      </div>
    </section>
  )
}
