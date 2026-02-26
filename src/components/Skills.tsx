import { motion } from 'framer-motion'
import { Skill } from '../data/portfolioData'

interface SkillsProps {
  skills: Skill[]
}

const Skills = ({ skills }: SkillsProps) => {
  const categories = ['backend', 'tools', 'other'] as const
  const categoryLabels = {
    backend: 'Backend',
    tools: 'Tools & DevOps',
    other: 'Databases & Others',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Skills & Technologies
          </motion.h2>
          {categories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category)
            if (categorySkills.length === 0) return null

            return (
              <motion.div key={category} variants={itemVariants} className="skills-category">
                <h3 className="category-title">{categoryLabels[category]}</h3>
                <div className="skills-grid">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

