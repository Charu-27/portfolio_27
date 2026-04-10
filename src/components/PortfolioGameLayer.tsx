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
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function PortfolioGameLayer({
  open,
  onOpenChange,
  activeSection,
  scrollToSection,
}: PortfolioGameLayerProps) {
  const reduceMotion = useReducedMotion()
  const [visited, setVisited] = useState<Set<string>>(loadVisited)
  const [questToast, setQuestToast] = useState(false)
  const [questDonePersisted, setQuestDonePersisted] = useState(
    () => localStorage.getItem(STORAGE_COMPLETE) === '1',
  )

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
  }, [allVisited, questDonePersisted])

  const progress = useMemo(
    () => (visited.size / CHECKPOINTS.length) * 100,
    [visited],
  )

  const dismissQuest = () => setQuestToast(false)

  const goTo = (id: string) => {
    scrollToSection(id)
    onOpenChange(false)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="map-drawer"
            className="map-drawer-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="map-drawer-backdrop"
              aria-label="Close map"
              onClick={() => onOpenChange(false)}
            />
            <motion.aside
              id="map-drawer-content"
              className="map-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="map-drawer-title"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            >
              <div className="map-drawer__head">
                <h2 id="map-drawer-title" className="map-drawer__title">
                  Your route
                </h2>
                <button
                  type="button"
                  className="map-drawer__close"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close map"
                >
                  ×
                </button>
              </div>
              <p className="map-drawer__sub">
                Tap a step to jump · {visited.size}/{CHECKPOINTS.length} visited
              </p>
              <div className="map-drawer__body">
                <VerticalSectionRoute
                  visited={visited}
                  activeSection={activeSection}
                  scrollToSection={goTo}
                />
              </div>
              <div className="map-drawer__progress" aria-hidden>
                <div className="map-drawer__progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <p className="map-drawer__foot">Visit every stop to chart the full profile.</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {questToast && (
          <motion.div
            key="quest-toast"
            className="game-toast-root"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" className="game-toast-backdrop" aria-label="Dismiss" onClick={dismissQuest} />
            <motion.div
              className="game-toast"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quest-toast-title"
              initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="game-toast__close" onClick={dismissQuest} aria-label="Close">
                ×
              </button>
              <span className="game-toast__badge">Map cleared</span>
              <span id="quest-toast-title" className="game-toast__title">
                You explored the whole profile
              </span>
              <span className="game-toast__sub">Every zone on the route has been visited.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
