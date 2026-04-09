import { motion } from 'framer-motion'
import {
  slideInLeft,
  staggerContainer,
  staggerPassThrough,
  springSoft,
  viewportOnce,
} from '../motion/variants'
import { Experience as ExperienceType } from '../data/portfolioData'

interface ExperienceProps {
  experiences: ExperienceType[]
}

const Experience = ({ experiences }: ExperienceProps) => {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={slideInLeft} className="section-title section-title--gradient">
            <span className="section-title__num">03</span>
            <span className="section-title__slash">/</span>
            <span className="section-title__text">Experience</span>
          </motion.h2>
          <motion.div className="timeline" variants={staggerPassThrough}>
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={slideInLeft}
                className="timeline-item"
                whileHover={{ x: 6, transition: springSoft }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="exp-header">
                    <h3 className="exp-position">{exp.position}</h3>
                    <span className="exp-company">{exp.company}</span>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-duration">{exp.duration}</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                  <ul className="exp-description">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  <div className="exp-technologies">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
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

export default Experience

