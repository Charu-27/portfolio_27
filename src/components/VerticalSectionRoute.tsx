import { SECTION_ROUTE_STEPS } from '../data/sectionRoute'

interface VerticalSectionRouteProps {
  visited: Set<string>
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export function VerticalSectionRoute({
  visited,
  activeSection,
  scrollToSection,
}: VerticalSectionRouteProps) {
  const activeIndex = Math.max(
    0,
    SECTION_ROUTE_STEPS.findIndex((s) => s.id === activeSection),
  )
  const last = SECTION_ROUTE_STEPS.length - 1
  const progressPct = last <= 0 ? 100 : Math.round((activeIndex / last) * 100)

  return (
    <nav className="route-track" aria-label="Sections along the page">
      <div
        className="route-track__spine"
        style={{ ['--route-pct' as string]: `${progressPct}%` }}
        aria-hidden
      />
      <ol className="route-track__list">
        {SECTION_ROUTE_STEPS.map((step, i) => {
          const done = visited.has(step.id)
          const active = activeSection === step.id
          return (
            <li key={step.id} className="route-track__item">
              <span
                className={`route-track__dot${active ? ' route-track__dot--active' : ''}${done ? ' route-track__dot--done' : ''}`}
                aria-hidden
              />
              <button
                type="button"
                className={`route-track__btn${active ? ' route-track__btn--active' : ''}`}
                onClick={() => scrollToSection(step.id)}
              >
                <span className="route-track__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="route-track__text">
                  <span className="route-track__title">{step.title}</span>
                  <span className="route-track__sub">{step.line}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
