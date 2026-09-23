import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

export interface ParallaxOffset {
  x: number
  y: number
}

/**
 * Tracks mouse position relative to the viewport center and provides
 * spring-smoothed offsets for parallax effects.
 *
 * Returns a ref to attach to the container element and the raw normalized
 * mouse position. Components consume the offset by multiplying strength.
 */
export function useMouseParallax(strength: number = 10): {
  containerRef: React.RefObject<HTMLDivElement | null>
  offset: React.RefObject<ParallaxOffset>
} {
  const containerRef = useRef<HTMLDivElement>(null)
  const offset = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const target = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const rafId = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      target.current = {
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      offset.current = {
        x: lerp(offset.current.x, target.current.x, 0.08),
        y: lerp(offset.current.y, target.current.y, 0.08),
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [strength, prefersReduced])

  return { containerRef, offset }
}
