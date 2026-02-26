import { motion } from 'framer-motion'
import { Experience as ExperienceType } from '../data/portfolioData'

interface ExperienceProps {
  experiences: ExperienceType[]
}

const Experience = ({ experiences }: ExperienceProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Experience
          </motion.h2>
          <div className="timeline">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="timeline-item"
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

