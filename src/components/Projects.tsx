import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  fadeUp,
  springSnappy,
  staggerContainer,
  staggerPassThrough,
  viewportOnce,
} from '../motion/variants'
import { Project } from '../data/portfolioData'

interface ProjectsProps {
  projects: Project[]
}

const PROJECT_IMAGE_FALLBACK = '/images/projects/fallback-cover.jpg'

function ProjectCover({ image }: { image?: string }) {
  const [failedPrimary, setFailedPrimary] = useState(false)
  const [failedBackup, setFailedBackup] = useState(false)

  if (!image?.trim() || failedBackup) {
    return (
      <div className="project-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
    )
  }

  if (!failedPrimary) {
    return (
      <img
        className="project-image__img"
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailedPrimary(true)}
      />
    )
  }

  return (
    <img
      className="project-image__img"
      src={PROJECT_IMAGE_FALLBACK}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailedBackup(true)}
    />
  )
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={fadeUp} className="section-title section-title--gradient">
            <span className="section-title__num">05</span>
            <span className="section-title__slash">/</span>
            <span className="section-title__text">Projects</span>
          </motion.h2>
          <motion.div className="projects-grid" variants={staggerPassThrough}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="project-card"
                whileHover={{ y: -6, transition: springSnappy }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="project-image">
                  <ProjectCover image={project.image} />
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

