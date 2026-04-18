import { useAlObserver } from '../hooks/useAlObserver'
import data from '../data/portfolio.json'

const { experience } = data

export default function Experience() {
  const sectionRef = useAlObserver()

  return (
    <section id="experience" ref={sectionRef} className="py-[110px] max-md:py-20 max-sm:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-14 relative z-[1] max-md:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="mb-10">
          <div className="al-item sec-label inline-flex items-center text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-accent mb-3"
               style={{ '--al-i': 0 }}>
            {experience.sectionLabel}
          </div>
          <h2 className="al-item text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--text)] mt-1.5"
              style={{ '--al-i': 1 }}
              dangerouslySetInnerHTML={{ __html: experience.sectionTitle.replace(' ', '<br />') }} />
        </div>

        {experience.jobs.map((job, idx) => (
            <div key={job.id}
              className={`al-item exp-open bg-[var(--surface)] border border-[var(--border-h)] rounded-2xl overflow-hidden ${idx < experience.jobs.length - 1 ? 'mb-2.5' : ''}`}
              style={{ '--al-i': idx + 2 }}>

              {/* Header */}
              <div className="flex items-center justify-between px-7 py-6 max-sm:px-4 max-sm:py-[18px]">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-accent">
                    {job.company} · {job.location}
                  </span>
                  <span className="text-[1.1rem] font-bold text-[var(--text)] tracking-[-0.02em] max-sm:text-[0.95rem]">
                    {job.role}
                  </span>
                  <span className="text-[0.8rem] text-[var(--text3)]">{job.locationPin}</span>
                </div>
              </div>

              {/* Body */}
              <div className="px-7 pb-7 max-sm:px-4 max-sm:pb-5">
                <ul className="list-none flex flex-col gap-2.5">
                  {job.points.map((pt, i) => (
                    <li key={i} className="pl-5 relative text-[0.9rem] text-[var(--text2)] leading-[1.65]
                      before:content-['→'] before:absolute before:left-0 before:text-accent before:text-[0.8rem] before:top-[3px]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}
