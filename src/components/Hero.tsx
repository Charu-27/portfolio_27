import { motion, useReducedMotion } from 'framer-motion'
import { HeroTechStack } from './HeroTechStack'
import { springSnappy } from '../motion/variants'
import { PersonalInfo } from '../data/portfolioData'

interface HeroProps {
  data: PersonalInfo
  scrollToSection: (sectionId: string) => void
}

const Hero = ({ data, scrollToSection }: HeroProps) => {
  const reduce = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-mesh" />
        <div className="hero-gradient" />
      </div>
      <div className="hero-inner container">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-copy">
            <motion.p variants={itemVariants} className="hero-greeting">
              Hello, I am
            </motion.p>
            <motion.h1 variants={itemVariants} className="hero-name">
              {data.name}
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-role">
              I am a <span className="hero-role__accent">{data.title.toLowerCase()}</span>
            </motion.p>
            <motion.p variants={itemVariants} className="hero-tagline">
              Scalable APIs, microservices, and reliable backend systems.
            </motion.p>
            <motion.p variants={itemVariants} className="hero-description">
              {data.bio}
            </motion.p>
            <motion.div variants={itemVariants} className="hero-buttons">
              <motion.button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={springSnappy}
              >
                Explore my work
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={springSnappy}
              >
                Get in touch
              </motion.button>
              {data.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Resume
                </a>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="hero-connect">
              <span className="hero-connect__label">Connect with me:</span>
              <div className="hero-social">
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={`mailto:${data.email}`} className="social-link" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="hero-aside"
            variants={itemVariants}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroTechStack />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button type="button" className="scroll-indicator__btn" onClick={() => scrollToSection('about')} aria-label="Scroll to about">
          <span className="scroll-indicator__text">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}

export default Hero
