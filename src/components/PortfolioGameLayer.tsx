import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SECTION_ROUTE_STEPS } from '../data/sectionRoute'
import { VerticalSectionRoute } from './VerticalSectionRoute'

const CHECKPOINTS = SECTION_ROUTE_STEPS.map((n, i) => ({
  id: n.id,
  label: n.title,
  short: String(i + 1).padStart(2, '0'),
}))

const STORAGE_VISITED = 'portfolio-game-visited'
const STORAGE_COMPLETE = 'portfolio-game-quest-done'

interface PortfolioGameLayerProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

function loadVisited(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_VISITED)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(arr.filter(Boolean))
  } catch {
    return new Set()
  }
}

function saveVisited(set: Set<string>) {
  localStorage.setItem(STORAGE_VISITED, JSON.stringify([...set]))
}

export function PortfolioGameLayer({ activeSection, scrollToSection }: PortfolioGameLayerProps) {
  const reduceMotion = useReducedMotion()
  const [visited, setVisited] = useState<Set<string>>(loadVisited)
  const [questToast, setQuestToast] = useState(false)
  const [questDonePersisted, setQuestDonePersisted] = useState(
    () => localStorage.getItem(STORAGE_COMPLETE) === '1',
  )
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setVisited((prev) => {
      if (prev.has(activeSection)) return prev
      const next = new Set(prev)
      next.add(activeSection)
      saveVisited(next)
      return next
    })
  }, [activeSection])

  const allVisited = CHECKPOINTS.every((c) => visited.has(c.id))

  useEffect(() => {
    if (!allVisited || questDonePersisted) return
    setQuestToast(true)
    localStorage.setItem(STORAGE_COMPLETE, '1')
    setQuestDonePersisted(true)
    const t = window.setTimeout(() => setQuestToast(false), 4200)
    return () => clearTimeout(t)
  }, [allVisited, questDonePersisted])

  const progress = useMemo(
    () => (visited.size / CHECKPOINTS.length) * 100,
    [visited],
  )

  return (
    <>
      <div className={`island-panel ${open ? 'island-panel--open' : ''}`} aria-hidden={false}>
        <button
          type="button"
          className="island-panel__tab"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="island-panel-content"
        >
          <span className="island-panel__tab-icon" aria-hidden>
            🗺
          </span>
          <span className="island-panel__tab-label">Map</span>
        </button>

        <aside
          id="island-panel-content"
          className="island-panel__sheet"
          aria-label="Section route map"
        >
          <div className="island-panel__head">
            <h2 className="island-panel__title">Your route</h2>
            <p className="island-panel__sub">
              Tap a step to jump · {visited.size}/{CHECKPOINTS.length} visited
            </p>
          </div>
          <div className="island-panel__map island-panel__map--route">
            <VerticalSectionRoute
              visited={visited}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
            />
          </div>
          <div className="island-panel__progress" aria-hidden>
            <div className="island-panel__progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="island-panel__foot">Visit every stop to chart the full profile.</p>
        </aside>
      </div>

      <AnimatePresence>
        {questToast && (
          <motion.div
            className="game-toast"
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <span className="game-toast__badge">Map cleared</span>
            <span className="game-toast__title">You explored the whole profile</span>
            <span className="game-toast__sub">Every zone on the route has been visited.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
