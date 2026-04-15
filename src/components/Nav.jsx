import { useEffect, useRef, useState } from 'react'
import data from '../data/portfolio.json'

const { personal } = data

const NAV_LINKS = [
  { href: '#skills',     label: 'Skills',     emoji: '⚡' },
  { href: '#experience', label: 'Experience', emoji: '💼' },
  { href: '#projects',   label: 'Projects',   emoji: '🚀' },
  { href: '#about',      label: 'About',      emoji: '👤' },
]

export default function Nav({ theme, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState('skills')
  const [mobOpen, setMobOpen]             = useState(false)
  const pillRef  = useRef(null)
  const indRef   = useRef(null)
  const togBtnRef = useRef(null)

  function moveIndicator(linkEl) {
    if (!pillRef.current || !indRef.current || !linkEl) return
    const pr = pillRef.current.getBoundingClientRect()
    const er = linkEl.getBoundingClientRect()
    indRef.current.style.left   = er.left - pr.left + 'px'
    indRef.current.style.top    = er.top  - pr.top  + 'px'
    indRef.current.style.width  = er.width  + 'px'
    indRef.current.style.height = er.height + 'px'
  }

  useEffect(() => {
    if (!pillRef.current) return
    const activeEl = pillRef.current.querySelector('.active-link')
    if (activeEl) moveIndicator(activeEl)
  }, [activeSection])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.35 })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (!mobOpen) return
      const drawer = document.getElementById('mob-drawer')
      const btn    = document.getElementById('mob-menu-btn')
      if (drawer && !drawer.contains(e.target) && btn && !btn.contains(e.target)) setMobOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [mobOpen])

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[var(--nav-h)] flex items-center justify-between px-14 border-b border-[var(--border)] max-md:px-5 max-sm:px-4 max-sm:h-[60px]">

        {/* Logo */}
        <a href="#hero" className="font-bold text-[var(--text)] no-underline flex flex-col gap-px leading-none">
          <span className="text-base font-bold text-[var(--text)] tracking-[-0.02em]">
            {personal.name}<em className="text-accent not-italic">{personal.nameSuffix}</em>
          </span>
          <span className="text-[0.65rem] font-medium text-[var(--text3)] tracking-[0.06em] uppercase max-sm:hidden">
            {personal.role}
          </span>
        </a>

        {/* Nav Pill */}
        <div
          ref={pillRef}
          className="flex gap-0.5 items-center bg-[var(--surface)] border border-[var(--border)] rounded-full px-1.5 py-1 relative max-md:hidden"
        >
          <div ref={indRef} className="nav-ind" />
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`px-[18px] py-1.5 rounded-full text-[0.8rem] font-medium uppercase tracking-[0.04em] no-underline transition-colors duration-200 relative z-[1] cursor-pointer
                ${activeSection === link.href.slice(1)
                  ? 'text-accent active-link'
                  : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
              onClick={() => setActiveSection(link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: theme toggle + hamburger */}
        <div className="flex items-center gap-3">

          {/* Tooltip wrapper */}
          <div className="tip-wrap relative inline-flex items-center justify-center">
            <button
              ref={togBtnRef}
              id="togBtn"
              aria-label="Toggle theme"
              onClick={() => onToggleTheme(togBtnRef.current)}
              className="relative w-[38px] h-[38px] rounded-[10px] bg-[var(--tog-bg)] border border-[var(--tog-bd)] cursor-pointer flex items-center justify-center overflow-hidden transition-[background,border-color,box-shadow] duration-300 shrink-0 hover:shadow-[0_0_0_3px_rgba(108,99,255,0.22)] hover:border-accent"
            >
              <span className="tog-icon tog-sun">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              </span>
              <span className="tog-icon tog-moon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </span>
            </button>
            <span className="tip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 bg-[var(--bg3)] text-[var(--text)] text-[0.71rem] font-medium px-2.5 py-1.5 rounded-md border border-[var(--border)] whitespace-nowrap pointer-events-none opacity-0 transition-[opacity,transform] duration-200 z-10 shadow-[0_4px_16px_var(--shadow)]">
              Toggle theme
            </span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            id="mob-menu-btn"
            aria-label="Menu"
            onClick={() => setMobOpen(o => !o)}
            className={`flex-col justify-center gap-[5px] w-9 h-9 cursor-pointer bg-[var(--surface)] border border-[var(--border)] rounded-lg p-2 transition-colors duration-200 hover:border-accent hidden max-sm:flex ${mobOpen ? 'mob-open' : ''}`}
          >
            <span className="block h-[1.5px] bg-[var(--text2)] rounded-[2px] transition-[transform,opacity] duration-300" />
            <span className="block h-[1.5px] bg-[var(--text2)] rounded-[2px] transition-[transform,opacity] duration-300" />
            <span className="block h-[1.5px] bg-[var(--text2)] rounded-[2px] transition-[transform,opacity] duration-300" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        id="mob-drawer"
        className={`fixed top-[var(--nav-h)] left-0 right-0 bg-[var(--bg2)] border-b border-[var(--border)] z-[199] px-4 pb-5 pt-3 flex flex-col gap-1 transition-transform duration-[350ms] ease-smooth backdrop-blur-xl max-sm:top-[60px] ${mobOpen ? 'translate-y-0' : '-translate-y-[110%]'}`}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => { setActiveSection(link.href.slice(1)); setMobOpen(false) }}
            className="px-4 py-3 rounded-[10px] text-[0.88rem] font-medium uppercase tracking-[0.04em] text-[var(--text2)] no-underline transition-[background,color] duration-200 hover:bg-[rgba(108,99,255,0.1)] hover:text-accent"
          >
            {link.emoji} {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
