import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageBackdrop } from './components/PageBackdrop'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { PortfolioGameLayer } from './components/PortfolioGameLayer'
import { portfolioData } from './data/portfolioData'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <PageBackdrop />
      <div className="app__surface">
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <Hero data={portfolioData.personal} scrollToSection={scrollToSection} />
        <About data={portfolioData.personal} education={portfolioData.education} />
        <Experience experiences={portfolioData.experiences} />
        <Skills groups={portfolioData.skillGroups} />
        <Projects projects={portfolioData.projects} />
        <Contact data={portfolioData.personal} />
        <PortfolioGameLayer activeSection={activeSection} scrollToSection={scrollToSection} />
      </div>
    </motion.div>
  )
}

export default App

