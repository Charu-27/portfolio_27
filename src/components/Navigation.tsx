import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NavigationProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
] as const

const Navigation = ({ activeSection, scrollToSection }: NavigationProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-container">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          className="nav-brand"
        >
          <img src="/favicon.svg" alt="" className="nav-brand__mark" width={28} height={28} />
          <span className="nav-brand__name">CHARU.JAIN</span>
        </a>

        <ul className={`nav-links nav-links--desktop`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

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
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: 16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    className={`nav-link nav-link--mobile ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => go(item.id)}
                  >
                    {item.label}
                  </button>
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
