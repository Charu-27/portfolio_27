import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useThemeContext } from '../theme/ThemeProvider'

const SI_PKG = '11.0.0'
function iconSrc(slug: string) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@${SI_PKG}/icons/${slug}.svg`
}

/** Five core technologies — pentagon layout (infographic style). */
const NODES = [
  {
    name: 'Java',
    slug: 'openjdk',
    arrow: '#fb7185',
    bubble: 'linear-gradient(145deg, #f43f5e 0%, #fda4af 100%)',
  },
  {
    name: 'Spring Boot',
    slug: 'springboot',
    arrow: '#fdba74',
    bubble: 'linear-gradient(145deg, #ea580c 0%, #fcd34d 100%)',
  },
  {
    name: 'Oracle SQL',
    slug: 'oracle',
    arrow: '#fcd34d',
    bubble: 'linear-gradient(145deg, #ca8a04 0%, #fde047 100%)',
  },
  {
    name: 'Azure DevOps',
    slug: 'azuredevops',
    arrow: '#38bdf8',
    bubble: 'linear-gradient(145deg, #0284c7 0%, #7dd3fc 100%)',
  },
  {
    name: 'Kubernetes',
    slug: 'kubernetes',
    arrow: '#c084fc',
    bubble: 'linear-gradient(145deg, #7c3aed 0%, #d8b4fe 100%)',
  },
] as const

const VB = 100
const R_POLY = 36

function pentVerts(R: number) {
  return NODES.map((_, i) => {
    const rad = ((-90 + i * 72) * Math.PI) / 180
    return { x: VB / 2 + R * Math.cos(rad), y: VB / 2 + R * Math.sin(rad) }
  })
}

export function HeroTechStack() {
  const reduce = useReducedMotion()
  const { theme } = useThemeContext()
  const rootRef = useRef<HTMLDivElement>(null)
  const [armPx, setArmPx] = useState(128)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      setArmPx(Math.max(96, Math.round(w * 0.385)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const verts = useMemo(() => pentVerts(R_POLY), [])
  const polyPts = verts.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(' ')
  const orbitDuration = 68

  const spin = reduce
    ? undefined
    : {
        rotate: 360,
      }

  return (
    <div
      ref={rootRef}
      className={`hero-pent hero-pent--${theme}`}
      aria-label="Core technology stack"
    >
      <div className="hero-pent__glow" aria-hidden />

      <motion.div
        className="hero-pent__orbit"
        animate={spin}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="hero-pent__svg" viewBox={`0 0 ${VB} ${VB}`} preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            {NODES.map((n, i) => (
              <linearGradient key={n.slug} id={`hero-pent-arrow-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={n.arrow} stopOpacity="0.95" />
                <stop offset="100%" stopColor={n.arrow} stopOpacity="0.35" />
              </linearGradient>
            ))}
          </defs>
          <polygon
            className="hero-pent__pentagon"
            points={polyPts}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          {verts.map((v, i) => {
            const ix = VB / 2 + (v.x - VB / 2) * 0.72
            const iy = VB / 2 + (v.y - VB / 2) * 0.72
            return (
              <line
                key={NODES[i].slug}
                x1={v.x}
                y1={v.y}
                x2={ix}
                y2={iy}
                stroke={`url(#hero-pent-arrow-${i})`}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        {NODES.map((node, i) => {
          const angle = -90 + i * 72
          return (
            <div
              key={node.slug}
              className="hero-pent__arm"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="hero-pent__arm-len" style={{ ['--arm-len' as string]: `${armPx}px` }}>
                <div className="hero-pent__bubble-anchor">
                  <motion.div
                    className="hero-pent__bubble"
                    style={{ background: node.bubble }}
                    animate={reduce ? undefined : { rotate: -360 }}
                    transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
                  >
                    <img
                      src={iconSrc(node.slug)}
                      alt=""
                      width={22}
                      height={22}
                      className="hero-pent__icon"
                      loading="eager"
                      decoding="async"
                    />
                    <span className="hero-pent__label">{node.name}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      <div className="hero-pent__hub-wrap">
        <motion.div
          className="hero-pent__hub"
          animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="hero-pent__hub-ring" aria-hidden />
          <svg className="hero-pent__hub-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M16 18l6-6-6-6M8 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
