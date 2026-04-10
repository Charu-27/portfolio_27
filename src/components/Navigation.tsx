import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useThemeContext } from '../theme/ThemeProvider'

interface NavigationProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
  /** Section-route map: only shown on small viewports (see App). */
  showMapControl?: boolean
  mapOpen?: boolean
  onMapToggle?: () => void
}

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
] as const

function NavGlyph({ id }: { id: (typeof navItems)[number]['id'] }) {
  const c = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round' as const }
  const s = { width: 15, height: 15, viewBox: '0 0 24 24', 'aria-hidden': true as const }
  switch (id) {
    case 'home':
      return (
        <svg {...s}>
          <path {...c} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline {...c} points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'about':
      return (
        <svg {...s}>
          <path {...c} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle {...c} cx="12" cy="7" r="4" />
        </svg>
      )
    case 'experience':
      return (
        <svg {...s}>
          <rect {...c} x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path {...c} d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      )
    case 'skills':
      return (
        <svg {...s}>
          <polyline {...c} points="16 18 22 12 16 6" />
          <polyline {...c} points="8 6 2 12 8 18" />
          <line {...c} x1="14" y1="4" x2="10" y2="20" />
        </svg>
      )
    case 'projects':
      return (
        <svg {...s}>
          <path {...c} d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    case 'contact':
      return (
        <svg {...s}>
          <path {...c} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline {...c} points="22,6 12,13 2,6" />
        </svg>
      )
    default:
      return null
  }
}

const springTab = { type: 'spring' as const, stiffness: 380, damping: 32 }

const Navigation = ({
  activeSection,
  scrollToSection,
  showMapControl,
  mapOpen,
  onMapToggle,
}: NavigationProps) => {
  const { theme, toggleTheme } = useThemeContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className={`navigation${scrolled ? ' navigation--scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-container">
        <motion.a
          href="#home"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.img
            src="/favicon.svg"
            alt=""
            className="nav-brand__mark"
            width={28}
            height={28}
            whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
          />
          <span className="nav-brand__name">CHARU.JAIN</span>
        </motion.a>

        <div className="nav-actions">
          <ul className="nav-links nav-links--desktop">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item-desktop">
                <button
                  type="button"
                  className={`nav-link nav-link--desk ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => go(item.id)}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="navDeskPill"
                      className="nav-link__pill"
                      transition={springTab}
                      aria-hidden
                    />
                  )}
                  <span className="nav-link__row">
                    <span className="nav-link__glyph">
                      <NavGlyph id={item.id} />
                    </span>
                    <span className="nav-link__text">{item.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {showMapControl && onMapToggle && (
            <button
              type="button"
              className={`nav-map-btn theme-toggle${mapOpen ? ' nav-map-btn--active' : ''}`}
              onClick={onMapToggle}
              aria-expanded={mapOpen}
              aria-controls="map-drawer-content"
              aria-label={mapOpen ? 'Close section map' : 'Open section map'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <polygon points="1 6 1 22 8 18 8 2 1 6" />
                <path d="M8 2v16l7 4V6l-7-4z" />
                <line x1="8" y1="10" x2="15" y2="6" />
                <line x1="8" y1="14" x2="15" y2="10" />
              </svg>
            </button>
          )}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? 'nav-toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.ul
              className="nav-links nav-links--mobile"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.04 },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.button
                    type="button"
                    className={`nav-link nav-link--mobile ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => go(item.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="navMobilePill"
                        className="nav-link__mobile-pill"
                        transition={springTab}
                        aria-hidden
                      />
                    )}
                    <span className="nav-link__mobile-inner">
                      <span className="nav-link__glyph nav-link__glyph--mobile">
                        <NavGlyph id={item.id} />
                      </span>
                      <span className="nav-link__mobile-text">{item.label}</span>
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
