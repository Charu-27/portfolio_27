import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HERO_HUB_CENTER_TITLE, HERO_TECH_HUB_NODES } from '../data/heroTechHub'
import { techIconSrc } from '../utils/techIcons'

const N = HERO_TECH_HUB_NODES.length
const CX = 160
const CY = 160
const R_RING = 108
const R_HUB = 44
const R_NODE = 24

function nodeCenter(i: number) {
  const rad = ((-90 + (360 / N) * i) * Math.PI) / 180
  return { x: CX + R_RING * Math.cos(rad), y: CY + R_RING * Math.sin(rad) }
}

function outerRingPath() {
  const pts: string[] = []
  for (let i = 0; i <= N; i++) {
    const { x, y } = nodeCenter(i % N)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}

export function HeroTechHub() {
  const reduce = useReducedMotion()
  const [centerText, setCenterText] = useState('')
  const [activeNode, setActiveNode] = useState(0)
  const [nodeLabel, setNodeLabel] = useState('')
  const [phase, setPhase] = useState<'center' | 'nodes'>('center')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduce) {
      setCenterText(HERO_HUB_CENTER_TITLE)
      setPhase('nodes')
      setActiveNode(0)
      setNodeLabel(HERO_TECH_HUB_NODES[0].label)
      return
    }

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
    const schedule = (fn: () => void, ms: number) => {
      clear()
      timerRef.current = setTimeout(fn, ms)
    }

    let cIdx = 0
    let nIdx = 0
    let chIdx = 0
    let deleting = false
    let inCenter = true

    const tick = () => {
      if (inCenter) {
        const full = HERO_HUB_CENTER_TITLE
        if (cIdx < full.length) {
          cIdx += 1
          setCenterText(full.slice(0, cIdx))
          schedule(tick, 72)
        } else {
          schedule(() => {
            inCenter = false
            setPhase('nodes')
            tick()
          }, 900)
        }
        return
      }

      const label = HERO_TECH_HUB_NODES[nIdx].label
      setActiveNode(nIdx)
      if (!deleting) {
        if (chIdx < label.length) {
          chIdx += 1
          setNodeLabel(label.slice(0, chIdx))
          schedule(tick, 50)
        } else {
          schedule(() => {
            deleting = true
            tick()
          }, 1400)
        }
      } else if (chIdx > 0) {
        chIdx -= 1
        setNodeLabel(label.slice(0, chIdx))
        schedule(tick, 34)
      } else {
        deleting = false
        nIdx = (nIdx + 1) % N
        schedule(tick, 360)
      }
    }

    tick()
    return () => clear()
  }, [reduce])

  return (
    <div className="hero-hub" aria-label="Technology stack diagram">
      <div className="hero-hub__stage">
        <svg className="hero-hub__svg" viewBox="0 0 320 320" role="img" aria-hidden>
          <g className="hero-hub__lines" stroke="currentColor" fill="none" strokeWidth="1.1" opacity="0.55">
            {Array.from({ length: N }, (_, i) => {
              const { x, y } = nodeCenter(i)
              const ux = (x - CX) / R_RING
              const uy = (y - CY) / R_RING
              const x1 = CX + ux * R_HUB
              const y1 = CY + uy * R_HUB
              const x2 = x - ux * R_NODE
              const y2 = y - uy * R_NODE
              return <line key={`spoke-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />
            })}
            <path d={outerRingPath()} strokeDasharray="3 5" strokeWidth="0.9" opacity="0.4" />
            {Array.from({ length: N }, (_, i) => {
              const a = nodeCenter(i)
              const b = nodeCenter((i + 1) % N)
              const mx = (a.x + b.x) / 2 + (a.y - b.y) * 0.12
              const my = (a.y + b.y) / 2 - (a.x - b.x) * 0.12
              return (
                <path
                  key={`arc-${i}`}
                  d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                  strokeWidth="0.85"
                  opacity="0.38"
                />
              )
            })}
          </g>

          <circle cx={CX} cy={CY} r={R_HUB} className="hero-hub__hub-ring" />
          <circle cx={CX} cy={CY} r={R_HUB - 2} className="hero-hub__hub-fill" />

          {HERO_TECH_HUB_NODES.map((node, i) => {
            const { x, y } = nodeCenter(i)
            const active = phase === 'nodes' && activeNode === i
            return (
              <g key={node.id} transform={`translate(${x}, ${y})`}>
                <circle r={R_NODE} className={`hero-hub__node-ring${active ? ' hero-hub__node-ring--active' : ''}`} />
                <circle r={R_NODE - 2} className="hero-hub__node-fill" />
                <image href={techIconSrc(node.iconSlug)} x={-14} y={-14} width={28} height={28} className="hero-hub__node-icon" />
              </g>
            )
          })}
        </svg>

        <div className="hero-hub__center-overlay" aria-live="polite">
          <span className="hero-hub__center-text">{centerText}</span>
        </div>
      </div>

      <div className="hero-hub__caption" aria-live="polite">
        {phase === 'center' ? (
          <span className="hero-hub__caption-hint">Choosing your stack…</span>
        ) : (
          <>
            <span className="hero-hub__caption-type">{nodeLabel}</span>
            <span className="hero-hub__caption-cursor" aria-hidden>
              |
            </span>
          </>
        )}
      </div>
    </div>
  )
}
