import { motion } from 'framer-motion'
import { useState } from 'react'
import { SkillGroup } from '../data/portfolioData'

interface SkillsProps {
  groups: SkillGroup[]
}

function SkillIcon({ name, iconSlug }: { name: string; iconSlug?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (!iconSlug || failed) {
    return <span className="skill-icon-fallback">{initials}</span>
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${iconSlug}/e2e8f0`}
      alt=""
      width={32}
      height={32}
      className="skill-icon-img"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

const Skills = ({ groups }: SkillsProps) => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title section-title--gradient">
            <span className="section-title__num">04</span>
            <span className="section-title__slash">/</span>
            <span className="section-title__text">Skills</span>
          </h2>
          <p className="skills-intro">
            Technologies I use to build scalable backend systems and full-stack features.
          </p>
          <div className="skills-board">
            {groups.map((group, groupIdx) => (
              <motion.article
                key={group.id}
                className="skills-category-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: groupIdx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="skills-category-card__glow" aria-hidden />
                <h3 className="skills-category-title">{group.title}</h3>
                <div className="skills-category-divider" aria-hidden />
                <ul className="skills-icons-grid">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={`${group.id}-${item.name}`}
                      className="skill-icon-tile"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.4,
                        delay: groupIdx * 0.06 + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="skill-icon-box">
                        <SkillIcon name={item.name} iconSlug={item.iconSlug} />
                      </div>
                      <span className="skill-icon-label">{item.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
