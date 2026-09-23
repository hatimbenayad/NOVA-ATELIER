import { useRef, type ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * Wraps any content with a subtle magnetic pull effect on hover.
 * Desktop pointer-fine only. Disabled for reduced-motion users.
 */
export default function MagneticButton({
  children,
  strength = 30,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const translateX = useTransform(x, (v) => `${v}px`)
  const translateY = useTransform(y, (v) => `${v}px`)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set(((e.clientX - cx) / rect.width) * strength)
    y.set(((e.clientY - cy) / rect.height) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={prefersReduced ? {} : { x: translateX, y: translateY }}>
        {children}
      </motion.div>
    </div>
  )
}
