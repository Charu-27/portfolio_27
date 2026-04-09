import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface HeroVisualProps {
  reduceMotion: boolean
  imgY: MotionValue<number>
  imgScale: MotionValue<number>
  imageSrc: string
  imageAlt: string
}

export function HeroVisual({ reduceMotion, imgY, imgScale, imageSrc, imageAlt }: HeroVisualProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 })
  const tiltY = useTransform(sx, [-0.5, 0.5], reduceMotion ? [0, 0] : [12, -12])
  const tiltX = useTransform(sy, [-0.5, 0.5], reduceMotion ? [0, 0] : [-9, 9])

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={wrapRef}
      className="hero-visual hero-visual--interactive"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 960 }}
    >
      <motion.div
        className="hero-visual__stage"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="hero-visual__ring-wrap hero-visual__ring-wrap--outer" aria-hidden>
          <motion.div
            className="hero-visual__ring hero-visual__ring--outer"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <span className="hero-visual__ring-dot" />
          </motion.div>
        </div>
        <div className="hero-visual__ring-wrap hero-visual__ring-wrap--inner" aria-hidden>
          <motion.div
            className="hero-visual__ring hero-visual__ring--inner"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <span className="hero-visual__ring-dot hero-visual__ring-dot--b" />
          </motion.div>
        </div>

        <div className="hero-visual__frame">
          <div className="hero-visual__frame-glow" aria-hidden />
          <motion.div className="hero-visual__img-wrap" style={{ y: imgY, scale: imgScale }}>
            <img className="hero-visual__img" src={imageSrc} alt={imageAlt} loading="eager" decoding="async" />
          </motion.div>
        </div>

        <motion.span
          className="hero-visual__chip hero-visual__chip--a"
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          REST
        </motion.span>
        <motion.span
          className="hero-visual__chip hero-visual__chip--b"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          Java
        </motion.span>
        <motion.span
          className="hero-visual__chip hero-visual__chip--c"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          Cloud
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
