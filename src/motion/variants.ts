import type { Transition, Variants } from 'framer-motion'

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
}

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 26,
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

/** Nested wrapper so stagger continues past a layout div (e.g. grids). */
export const staggerPassThrough: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.02,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
}

export const fadeUpSnappy: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSoft,
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSnappy,
  },
}

/** Relaxed thresholds so mobile scroll triggers match desktop feel. */
export const viewportOnce = {
  once: true as const,
  amount: 0.04 as const,
  margin: '0px 0px -18% 0px' as const,
}
