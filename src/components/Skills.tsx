import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  fadeUp,
  springSnappy,
  staggerContainer,
  staggerPassThrough,
  viewportOnce,
} from '../motion/variants'
import { SkillGroup } from '../data/portfolioData'
import { techIconSrc } from '../utils/techIcons'

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
      src={techIconSrc(iconSlug)}
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={fadeUp} className="section-title section-title--gradient">
            <span className="section-title__num">04</span>
            <span className="section-title__slash">/</span>
            <span className="section-title__text">Skills</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="skills-intro">
            Technologies I use to build scalable backend systems and full-stack features.
          </motion.p>
          <motion.div className="skills-board" variants={staggerPassThrough}>
            {groups.map((group, groupIdx) => (
              <motion.article
                key={group.id}
                className="skills-category-card"
                variants={fadeUp}
                whileHover={{ y: -3, transition: springSnappy }}
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
                      viewport={viewportOnce}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
