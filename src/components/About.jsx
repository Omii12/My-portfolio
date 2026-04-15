import { useRef, useEffect } from 'react'
import { useAlObserver } from '../hooks/useAlObserver'
import data from '../data/portfolio.json'

const { about, personal } = data

function GlareCard({ className, style, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const card = ref.current
    if (!card) return
    const ov = card.querySelector('.glare-overlay')
    if (!ov) return
    const onMove = e => {
      const r = card.getBoundingClientRect()
      ov.style.background = `radial-gradient(circle at ${((e.clientX-r.left)/r.width)*100}% ${((e.clientY-r.top)/r.height)*100}%, rgba(255,255,255,.18) 0%, transparent 55%)`
      ov.style.opacity = '1'
    }
    const onLeave = () => { ov.style.opacity = '0' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[18px] ${className ?? ''}`} style={style}>
      {children}
      <div className="glare-overlay" />
    </div>
  )
}

export default function About() {
  const sectionRef = useAlObserver()
  const { education, certification } = about

  return (
    <section id="about" ref={sectionRef} className="py-[110px] max-md:py-20 max-sm:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="mb-10">
          <div className="al-item sec-label inline-flex items-center text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-accent mb-3"
               style={{ '--al-i': 0 }}>
            {about.sectionLabel}
          </div>
          <h2 className="al-item font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text)] mt-1.5"
              style={{ '--al-i': 1, fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Passionate about<br />great interfaces
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 items-start max-md:grid-cols-1">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Bio card */}
            <GlareCard className="about-intro al-item bg-[var(--surface)] border border-[var(--border)] p-8 max-sm:p-5"
                       style={{ '--al-i': 2 }}>
              {about.bio.map((para, i) => (
                <p key={i} className="text-[0.9rem] text-[var(--text2)] leading-[1.8]"
                   style={i > 0 ? { marginTop: '12px' } : {}}>
                  {para}
                </p>
              ))}
            </GlareCard>

            {/* Highlight mini-cards */}
            <div className="grid grid-cols-2 gap-3">
              {about.highlights.map((card, idx) => (
                <GlareCard key={card.title}
                  className={`hi-card ${card.tint} al-item bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-[22px] transition-[border-color,box-shadow,background] duration-[250ms] hover:border-[var(--border-h)] hover:shadow-[0_12px_36px_var(--shadow)] cursor-default max-sm:p-4`}
                  style={{ '--al-i': idx + 3 }}>
                  <span className="text-[1.6rem] mb-2.5 block leading-none">{card.icon}</span>
                  <div className={`text-[0.78rem] font-semibold tracking-[0.1em] uppercase mb-1.5 ${card.tint === 'tint-green' ? 'text-accent3' : card.tint === 'tint-pink' ? 'text-accent2' : card.tint === 'tint-yellow' ? 'text-[#ffd864]' : 'text-accent'}`}>
                    {card.title}
                  </div>
                  <div className="text-[1.6rem] font-bold text-[var(--text)] leading-none tracking-[-0.03em] max-sm:text-[1.3rem]">
                    {card.value}{card.valueSuffix && <em className="not-italic" style={{ color: card.tint === 'tint-green' ? 'var(--accent3)' : card.tint === 'tint-pink' ? 'var(--accent2)' : 'var(--accent)' }}>{card.valueSuffix}</em>}
                  </div>
                  <div className="text-[0.78rem] text-[var(--text3)] mt-[5px] leading-[1.5]">{card.description}</div>
                </GlareCard>
              ))}

              {/* Certification — wide card */}
              <GlareCard
                className="hi-card al-item bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-[22px] transition-[border-color,box-shadow,background] duration-[250ms] hover:border-[var(--border-h)] hover:shadow-[0_12px_36px_var(--shadow)] cursor-default col-span-2 flex items-center gap-5 max-sm:p-4 max-sm:flex-row max-sm:items-center"
                style={{ '--al-i': about.highlights.length + 3 }}>
                <span className="text-[2rem] shrink-0">{certification.icon}</span>
                <div>
                  <div className="text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-accent mb-1.5">{certification.title}</div>
                  <div className="text-[1.1rem] font-bold text-[var(--text)] leading-none tracking-[-0.03em]">{certification.name}</div>
                  <div className="text-[0.78rem] text-[var(--text3)] mt-[5px]">{certification.issuer}</div>
                </div>
              </GlareCard>
            </div>
          </div>

          {/* ── RIGHT COLUMN — contact card ── */}
          <div>
            <GlareCard className="c-card al-item bg-[var(--surface)] border border-[var(--border)] p-8 max-sm:p-5"
                       style={{ '--al-i': 2 }}>
              <div className="al-item text-[1.7rem] font-bold text-[var(--text)] mb-[3px]" style={{ '--al-i': 3 }}>{personal.name}</div>
              <div className="al-item text-[0.8rem] tracking-[0.1em] uppercase text-accent mb-6" style={{ '--al-i': 4 }}>{personal.role}</div>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  { icon: '📍', content: personal.location, idx: 5 },
                  { icon: '📧', content: <a href={`mailto:${personal.email}`} className="text-[var(--text2)] no-underline transition-colors duration-200 hover:text-accent">{personal.email}</a>, idx: 6 },
                  { icon: '📞', content: personal.phone, idx: 7 },
                  { icon: '🔗', content: <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-[var(--text2)] no-underline transition-colors duration-200 hover:text-accent">LinkedIn Profile</a>, idx: 8 },
                  { icon: '💻', content: <a href={personal.github}   target="_blank" rel="noreferrer" className="text-[var(--text2)] no-underline transition-colors duration-200 hover:text-accent">GitHub Profile</a>, idx: 9 },
                ].map(row => (
                  <div key={row.idx} className="al-item flex items-center gap-2.5 text-[0.86rem] text-[var(--text2)]" style={{ '--al-i': row.idx }}>
                    <span>{row.icon}</span> {row.content}
                  </div>
                ))}
              </div>

              <div className="al-item border-t border-[var(--border)] pt-5" style={{ '--al-i': 10 }}>
                <div className="text-[0.7rem] uppercase tracking-[0.12em] text-[var(--text3)] mb-1.5">Education</div>
                <div className="text-[0.92rem] font-semibold text-[var(--text)]">{education.degree}</div>
                <div className="text-[0.8rem] text-[var(--text3)] mt-0.5">
                  {education.institute} · {education.year} · CGPA {education.cgpa}
                </div>
              </div>
            </GlareCard>
          </div>
        </div>
      </div>
    </section>
  )
}
