import { useEffect, useRef } from 'react'
import { useAlObserver } from '../hooks/useAlObserver'
import data from '../data/portfolio.json'

const { projects } = data

function useGlare(ref) {
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
  }, [ref])
}

function GlareCard({ className, children }) {
  const ref = useRef(null)
  useGlare(ref)
  return (
    <div ref={ref}
      className={`proj-card relative overflow-hidden bg-[var(--bg2)] border border-[var(--border)] rounded-[18px] p-9 transition-[border-color,box-shadow] duration-[250ms] hover:border-[var(--border-h)] hover:shadow-[0_20px_60px_var(--shadow)] max-sm:p-5 ${className ?? ''}`}>
      {children}
      <div className="glare-overlay" />
    </div>
  )
}

const BADGE_STYLES = {
  'b-lib':  'bg-[rgba(108,99,255,0.12)] text-accent  border border-[rgba(108,99,255,0.25)]',
  'b-prod': 'bg-[rgba(67,233,123,0.08)]  text-accent3 border border-[rgba(67,233,123,0.2)]',
  'b-per':  'bg-[rgba(255,101,132,0.08)] text-accent2 border border-[rgba(255,101,132,0.2)]',
  'b-sec':  'bg-[rgba(67,233,123,0.08)]  text-accent3 border border-[rgba(67,233,123,0.2)]',
}

function Badge({ type, children }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full text-[0.68rem] font-semibold tracking-[0.08em] uppercase mb-3.5 ${BADGE_STYLES[type]}`}>
      {children}
    </span>
  )
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <span key={tag} className="tag px-[11px] py-1 rounded-full text-[0.72rem] font-medium bg-[rgba(108,99,255,0.08)] text-[#a8a4ff] border border-[rgba(108,99,255,0.15)]">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function Projects({ theme, onToggleTheme }) {
  const sectionRef = useAlObserver()
  const featRef    = useRef(null)
  useGlare(featRef)

  const { featured, list } = projects
  const pairs = []
  for (let i = 0; i < list.length; i += 2) pairs.push(list.slice(i, i + 2))

  return (
    <section id="projects" ref={sectionRef} className="py-[110px] max-md:py-20 max-sm:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="mb-10">
          <div className="al-item sec-label inline-flex items-center text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-accent mb-3"
               style={{ '--al-i': 0 }}>
            {projects.sectionLabel}
          </div>
          <h2 className="al-item text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text)] mt-1.5"
              style={{ '--al-i': 1 }}
              dangerouslySetInnerHTML={{ __html: projects.sectionTitle.replace(' ', '<br />') }} />
        </div>

        {/* ── Featured card ── */}
        <div className="al-item mb-4" style={{ '--al-i': 2 }}>
          <div ref={featRef}
            className="proj-card relative overflow-hidden bg-[var(--bg2)] border border-[var(--border)] rounded-[18px] p-9 transition-[border-color,box-shadow] duration-[250ms] hover:border-[var(--border-h)] hover:shadow-[0_20px_60px_var(--shadow)] grid grid-cols-2 gap-10 items-start max-md:grid-cols-1 max-sm:p-5">
            <div>
              <Badge type={featured.badgeClass}>{featured.badge}</Badge>
              <h3 className="text-[1.6rem] font-bold text-[var(--text)] mb-2.5 tracking-[-0.02em] leading-[1.1]">
                {featured.title}<br />{featured.subtitle}
              </h3>
              <p className="text-[0.88rem] text-[var(--text2)] leading-[1.72] mb-[18px]">{featured.description}</p>
              <div className="flex gap-6 mb-5">
                {featured.metrics.map(m => (
                  <div key={m.label}>
                    <div className="text-[1.5rem] font-bold text-accent tracking-[-0.03em] leading-none">{m.value}</div>
                    <div className="text-[0.7rem] text-[var(--text3)] mt-[3px]">{m.label}</div>
                  </div>
                ))}
              </div>
              <Tags tags={featured.tags} />
            </div>

            {/* Library mock */}
            <div className="bg-[var(--bg3)] border border-[var(--border)] rounded-xl p-5 transition-[background,border-color] duration-[350ms]">
              <div className="text-[0.63rem] tracking-[0.12em] uppercase text-[var(--text3)] mb-2.5">Live Component Preview</div>
              <div className="flex gap-2 flex-wrap mb-2.5 items-center">
                <button className="px-3 py-[5px] rounded-md text-[0.73rem] font-semibold bg-accent text-white cursor-default font-readex">Primary</button>
                <button className="px-3 py-[5px] rounded-md text-[0.73rem] font-semibold border border-[var(--border)] text-[var(--text2)] bg-transparent cursor-default font-readex">Secondary</button>
                <button className="px-3 py-[5px] rounded-md text-[0.73rem] font-semibold bg-[rgba(255,101,132,0.1)] text-accent2 border border-[rgba(255,101,132,0.25)] cursor-default font-readex">Danger</button>
              </div>
              <div className="flex gap-2 flex-wrap mb-2.5 items-center">
                <span className="px-2 py-[2px] rounded-full text-[0.68rem] font-medium bg-[rgba(108,99,255,0.12)] text-[#a8a4ff]">React</span>
                <span className="px-2 py-[2px] rounded-full text-[0.68rem] font-medium bg-[rgba(67,233,123,0.09)] text-accent3">Active</span>
                <span className="px-2 py-[2px] rounded-full text-[0.68rem] font-medium bg-[rgba(255,220,100,0.09)] text-[#ffd864]">Beta</span>
              </div>
              <div className="h-px bg-[var(--border)] my-3" />
              <input className="bg-[var(--bg)] border border-[var(--border)] rounded-md px-2.5 py-[5px] text-[0.73rem] text-[var(--text3)] w-full font-readex outline-none transition-[background,color] duration-[350ms]"
                     placeholder="Search components..." readOnly />
              <div className="flex items-center gap-2.5 text-[0.73rem] text-[var(--text3)] mt-2">
                <div onClick={() => onToggleTheme(document.getElementById('togBtn'))}
                  className="w-9 h-5 bg-accent rounded-full flex items-center px-0.5 cursor-pointer relative shrink-0">
                  <div className="m-tog-knob w-4 h-4 rounded-full bg-white absolute left-0.5 transition-[left] duration-300 ease-spring" />
                </div>
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className="h-px bg-[var(--border)] my-3" />
              <div className="text-[0.63rem] tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
                {featured.metrics[0].value} Components Across
              </div>
              <div className="flex gap-3.5 flex-wrap text-[0.7rem] text-[var(--text3)]">
                {featured.mockSections.map(s => <span key={s}>{s}</span>)}
              </div>
            </div>
            <div className="glare-overlay" />
          </div>
        </div>

        {/* ── Pair rows ── */}
        {pairs.map((pair, pairIdx) => (
          <div key={pairIdx} className="al-item"
               style={{ '--al-i': pairIdx + 3, marginBottom: pairIdx < pairs.length - 1 ? '16px' : 0 }}>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-sm:gap-3">
              {pair.map(proj => (
                <GlareCard key={proj.title}>
                  <Badge type={proj.badgeClass}>{proj.badge}</Badge>
                  <h3 className="text-[1.25rem] font-bold text-[var(--text)] mb-2.5">{proj.title}</h3>
                  <p className="text-[0.88rem] text-[var(--text2)] leading-[1.72] mb-[18px]">{proj.description}</p>
                  <Tags tags={proj.tags} />
                </GlareCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
