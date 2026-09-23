import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Y distance to travel (px) */
  distance?: number
  /** Whether to clip with overflow-hidden mask */
  clip?: boolean
  className?: string
  once?: boolean
}

/**
 * Scroll-triggered fade-up reveal wrapper.
 * Wraps children in a motion div that animates on intersection.
 * Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 16,
  clip = false,
  className = '',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })
  const prefersReduced = useReducedMotion()

  const variants = {
    hidden: {
      opacity: prefersReduced ? 1 : 0,
      y: prefersReduced ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <div ref={ref} className={clip ? `overflow-hidden ${className}` : className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  )
}
