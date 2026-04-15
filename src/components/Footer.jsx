import data from '../data/portfolio.json'

const { footer, personal, about } = data

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)
const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[var(--border)] bg-[var(--bg2)] transition-[background] duration-[350ms]">

      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-14 pt-[52px] pb-9 grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 max-md:grid-cols-2 max-md:gap-8 max-md:px-5 max-md:pt-10 max-md:pb-7 max-sm:grid-cols-1 max-sm:gap-7 max-sm:px-4 max-sm:pt-9 max-sm:pb-6">

        {/* Brand */}
        <div>
          <div className="text-[1.5rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-none mb-1.5">
            {personal.name}<em className="text-accent not-italic">{personal.nameSuffix}</em>
          </div>
          <div className="text-[0.78rem] text-accent tracking-[0.1em] uppercase mb-3.5">{personal.role}</div>
          <div className="text-[0.84rem] text-[var(--text3)] leading-[1.7] max-w-[220px]">{footer.tagline}</div>
          <div className="flex gap-2.5 mt-5">
            {[
              { href: personal.linkedin, title: 'LinkedIn', Icon: LinkedInIcon },
              { href: personal.github,   title: 'GitHub',   Icon: GitHubIcon   },
              { href: `mailto:${personal.email}`, title: 'Email', Icon: EmailIcon },
            ].map(({ href, title, Icon }) => (
              <a key={title} href={href} target={title !== 'Email' ? '_blank' : undefined}
                 rel={title !== 'Email' ? 'noreferrer' : undefined} title={title}
                 className="w-[34px] h-[34px] rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text2)] no-underline transition-[border-color,color,background] duration-200 hover:border-accent hover:text-accent hover:bg-[rgba(108,99,255,0.08)]">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <div className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[var(--text)] mb-4">Navigate</div>
          <div className="flex flex-col gap-2.5">
            {footer.navLinks.map(link => (
              <a key={link.label} href={link.href}
                 className="text-[0.84rem] text-[var(--text3)] no-underline transition-colors duration-200 flex items-center gap-[7px] hover:text-accent">
                <span className="text-[0.7rem]">{link.emoji}</span> {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[var(--text)] mb-4">Projects</div>
          <div className="flex flex-col gap-2.5">
            {footer.projectLinks.map(link => (
              <a key={link.label} href={link.href}
                 className="text-[0.84rem] text-[var(--text3)] no-underline transition-colors duration-200 flex items-center gap-[7px] hover:text-accent">
                <span className="text-[0.7rem]">{link.emoji}</span> {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[var(--text)] mb-4">Contact</div>
          {[
            { ico: '📧', content: <a href={`mailto:${personal.email}`} className="text-[var(--text3)] no-underline transition-colors duration-200 hover:text-accent">{personal.email}</a> },
            { ico: '📞', content: personal.phone },
            { ico: '📍', content: personal.location },
            { ico: '🎓', content: `PCCOE, Pune · ${about.education.year}` },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 mb-2.5 last:mb-0">
              <span className="text-[0.85rem] shrink-0 mt-[1px]">{item.ico}</span>
              <div className="text-[0.82rem] text-[var(--text3)] leading-[1.5]">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-14 py-[18px] border-t border-[var(--border)] flex items-center justify-between gap-4 max-md:px-5 max-md:flex-col max-md:text-center max-md:gap-2.5 max-sm:px-4">
        <div className="text-[0.76rem] text-[var(--text3)]">
          © 2025 <em className="text-accent not-italic">{personal.name}</em>. All rights reserved.
        </div>
        <div className="flex gap-2 flex-wrap max-sm:justify-center">
          {footer.techStack.map(tech => (
            <span key={tech} className="px-2.5 py-[3px] rounded-full text-[0.68rem] font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text3)]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
