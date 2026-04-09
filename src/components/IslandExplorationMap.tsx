import { motion } from 'framer-motion'

export const ISLAND_MAP_NODES = [
  { id: 'home', label: 'Dock', x: 48, y: 178 },
  { id: 'about', label: 'Camp', x: 102, y: 150 },
  { id: 'experience', label: 'Peak', x: 162, y: 162 },
  { id: 'skills', label: 'Grove', x: 214, y: 98 },
  { id: 'projects', label: 'Bay', x: 268, y: 132 },
  { id: 'contact', label: 'Lighthouse', x: 318, y: 62 },
] as const

export const ISLAND_TRAIL_D =
  'M 48 178 L 102 150 L 162 162 L 214 98 L 268 132 L 318 62'

interface IslandExplorationMapProps {
  visited: Set<string>
  activeSection: string
  scrollToSection: (id: string) => void
  reduceMotion: boolean
}

export function IslandExplorationMap({
  visited,
  activeSection,
  scrollToSection,
  reduceMotion,
}: IslandExplorationMapProps) {
  const player = ISLAND_MAP_NODES.find((n) => n.id === activeSection) ?? ISLAND_MAP_NODES[0]

  return (
    <svg
      className="game-map__svg game-map__svg--island"
      viewBox="0 0 360 220"
      role="img"
      aria-label="Island exploration map of the portfolio"
    >
      <defs>
        <linearGradient id="islandOcean" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="45%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#155e75" />
        </linearGradient>
        <linearGradient id="islandLand" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#1a3d32" />
          <stop offset="50%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
        <linearGradient id="islandSand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(253, 230, 138, 0.45)" />
          <stop offset="100%" stopColor="rgba(180, 160, 100, 0.25)" />
        </linearGradient>
        <radialGradient id="islandGlow" cx="55%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="islandSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>
      </defs>

      <rect x="0" y="0" width="360" height="220" rx="14" fill="url(#islandOcean)" />

      <g className="game-map__waves" aria-hidden>
        <path
          className="game-map__wave game-map__wave--a"
          d="M 0 188 Q 45 182 90 188 T 180 188 T 270 188 T 360 188 L 360 220 L 0 220 Z"
          fill="rgba(8, 47, 73, 0.35)"
        />
        <path
          className="game-map__wave game-map__wave--b"
          d="M 0 198 Q 60 192 120 198 T 240 198 T 360 198 L 360 220 L 0 220 Z"
          fill="rgba(6, 40, 62, 0.45)"
        />
      </g>

      <ellipse cx="178" cy="138" rx="142" ry="88" fill="url(#islandGlow)" />

      <path
        className="game-map__island-shadow"
        d="M 42 198 C 38 175 48 130 78 108 C 115 82 175 72 238 58 C 295 46 338 68 348 108 C 355 138 338 178 298 194 C 235 218 155 222 88 210 C 62 204 46 202 42 198 Z"
        fill="rgba(0,0,0,0.28)"
        transform="translate(4, 6)"
        filter="url(#islandSoft)"
      />

      <path
        className="game-map__island"
        d="M 38 192 C 34 168 44 124 74 102 C 112 76 172 66 235 52 C 292 40 335 62 345 102 C 352 132 335 172 295 188 C 232 212 152 216 85 204 C 58 198 42 196 38 192 Z"
        fill="url(#islandLand)"
        stroke="rgba(20, 83, 45, 0.85)"
        strokeWidth="1.5"
      />

      <path
        className="game-map__island-shore"
        d="M 38 192 C 34 168 44 124 74 102 C 112 76 172 66 235 52 C 292 40 335 62 345 102 C 352 132 335 172 295 188 C 232 212 152 216 85 204 C 58 198 42 196 38 192 Z"
        fill="none"
        stroke="url(#islandSand)"
        strokeWidth="4"
        strokeLinejoin="round"
        opacity="0.9"
      />

      <g className="game-map__trees" aria-hidden>
        <polygon points="118,118 122,102 126,118" fill="#14532d" opacity="0.9" />
        <polygon points="200,88 206,68 212,88" fill="#166534" opacity="0.85" />
        <polygon points="285,108 290,92 295,108" fill="#14532d" opacity="0.88" />
      </g>

      <path
        d={ISLAND_TRAIL_D}
        fill="none"
        stroke="rgba(253, 230, 138, 0.55)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 7"
        className="game-map__trail"
      />
      <path
        d={ISLAND_TRAIL_D}
        fill="none"
        stroke="rgba(34, 211, 238, 0.25)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="game-map__trail-glow"
      />

      {ISLAND_MAP_NODES.map((n) => {
        const disc = visited.has(n.id)
        const current = activeSection === n.id
        return (
          <g
            key={n.id}
            role="button"
            tabIndex={0}
            className="game-map__stop"
            onClick={() => scrollToSection(n.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToSection(n.id)
              }
            }}
          >
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={current ? 13 : 10}
              className={`game-map__node ${disc ? 'game-map__node--seen' : 'game-map__node--fog'} ${current ? 'game-map__node--here' : ''}`}
              whileTap={reduceMotion ? undefined : { scale: 0.9 }}
              initial={false}
              animate={{ scale: current ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            />
            <text x={n.x} y={n.y + 26} textAnchor="middle" className="game-map__label game-map__label--island">
              {n.label}
            </text>
          </g>
        )
      })}

      <motion.g
        initial={false}
        animate={{ x: player.x, y: player.y }}
        transition={
          reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 22 }
        }
      >
        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx={0} cy={0} r={5.5} className="game-map__player" />
          <path
            d="M -5 2.5 L 5 2.5 L 4 6.5 L -4 6.5 Z"
            fill="rgba(15, 23, 42, 0.92)"
            stroke="#22d3ee"
            strokeWidth="0.65"
          />
        </motion.g>
      </motion.g>
    </svg>
  )
}
