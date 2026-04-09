import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function PageBackdrop() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const shift = useTransform(scrollYProgress, [0, 1], [0, -120])

  if (reduce) {
    return (
      <div className="page-backdrop page-backdrop--reduced" aria-hidden>
        <div className="page-backdrop__mesh page-backdrop__mesh--static" />
      </div>
    )
  }

  return (
    <div className="page-backdrop" aria-hidden>
      <motion.div className="page-backdrop__mesh" style={{ y: shift }} />
      <motion.div
        className="page-backdrop__orb page-backdrop__orb--a"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="page-backdrop__orb page-backdrop__orb--b"
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 25, -15, 0],
          scale: [1, 1.08, 1, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="page-backdrop__orb page-backdrop__orb--c"
        animate={{
          opacity: [0.15, 0.35, 0.2, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
