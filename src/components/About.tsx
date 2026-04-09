import { motion } from 'framer-motion'
import {
  fadeUp,
  staggerContainer,
  staggerPassThrough,
  springSoft,
  viewportOnce,
} from '../motion/variants'
import { Education, PersonalInfo } from '../data/portfolioData'

interface AboutProps {
  data: PersonalInfo
  education: Education[]
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const About = ({ data, education }: AboutProps) => {
  const primaryEdu = education[0]

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={fadeUp} className="section-title section-title--gradient">
            <span className="section-title__num">02</span>
            <span className="section-title__slash">/</span>
            <span className="section-title__text">About</span>
          </motion.h2>

          <motion.div className="about-profile" variants={staggerPassThrough}>
            <motion.aside variants={fadeUp} className="about-profile__sidebar">
              <div className="about-profile__avatar" aria-hidden>
                {initials(data.name)}
              </div>
              <h3 className="about-profile__name">{data.name}</h3>
              <p className="about-profile__title">{data.title}</p>

              <ul className="about-profile__meta" aria-label="Profile details">
                <li className="about-profile__meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{data.location}</span>
                </li>
                {primaryEdu && (
                  <li className="about-profile__meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <div className="about-profile__edu-stack">
                      <span className="about-profile__edu-line">
                        {primaryEdu.degree}, {primaryEdu.field}
                      </span>
                      <span className="about-profile__edu-sub">
                        {primaryEdu.institution} · {primaryEdu.startYear}–{primaryEdu.endYear} · CGPA{' '}
                        {primaryEdu.cgpa}
                      </span>
                      <span className="about-profile__edu-sub">{primaryEdu.institutionLocation}</span>
                    </div>
                  </li>
                )}
              </ul>

              <div className="about-profile__stats">
                <motion.div
                  className="about-profile__stat"
                  whileHover={{ y: -2, transition: springSoft }}
                >
                  <span className="about-profile__stat-val">{data.yearsOfExperience}</span>
                  <span className="about-profile__stat-lbl">Yrs exp.</span>
                </motion.div>
                <motion.div
                  className="about-profile__stat"
                  whileHover={{ y: -2, transition: springSoft }}
                >
                  <span className="about-profile__stat-val">10+</span>
                  <span className="about-profile__stat-lbl">Tech</span>
                </motion.div>
              </div>

              <div className="about-profile__social">
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="about-profile__social-btn">
                  GitHub
                </a>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-profile__social-btn"
                >
                  LinkedIn
                </a>
              </div>
            </motion.aside>

            <motion.div variants={fadeUp} className="about-profile__readme about-profile__readme--panel">
              <p className="about-profile__readme-label">README.md</p>
              <div className="about-text">
                <p>{data.bio}</p>
                <p>
                  With {data.yearsOfExperience} years of experience in software development, I’ve gained hands-on
                  experience building and improving backend applications. I’m passionate about writing clean, efficient
                  Java code, optimizing SQL queries, and designing solutions that scale. I believe in continuous
                  learning and constantly explore new tools and technologies to sharpen my development skills.
                </p>
              </div>
              <motion.div variants={fadeUp} className="about-info about-info--inline">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <a href={`mailto:${data.email}`} className="info-value">
                    {data.email}
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <a href={`tel:${data.phone}`} className="info-value">
                    {data.phone}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
