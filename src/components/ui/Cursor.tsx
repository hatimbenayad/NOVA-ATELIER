import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Custom cursor — a fine circular dot that follows the mouse.
 *
 * Fixes applied:
 * - Hidden (opacity 0) until the first mousemove event fires, so it never
 *   appears as a stray circle at (0,0) before the user moves the mouse.
 * - Only mounted on pointer:fine devices (desktop). Touch screens never see it.
 * - Disabled for prefers-reduced-motion.
 * - Adds `has-custom-cursor` class to <body> to suppress the system cursor.
 */
export default function Cursor() {
  const prefersReduced = useReducedMotion()

  // Determined via media query, never assumed — starts false until Effect runs
  const [isPointerFine, setIsPointerFine] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  // Start well off-screen so the initial RAF frame doesn't flash at origin
  const pos = useRef({ x: -200, y: -200 })
  const rafId = useRef<number>(0)
  const [isHovering, setIsHovering] = useState(false)
  // Hidden until first real mousemove — prevents ghost circle on load
  const [hasMoved, setHasMoved] = useState(false)

  // Check pointer media query once on mount
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)')
    setIsPointerFine(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // RAF position tracking + hover detection
  useEffect(() => {
    if (!isPointerFine || prefersReduced) return

    document.body.classList.add('has-custom-cursor')

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!hasMoved) setHasMoved(true)
    }

    const handleOver = (e: Event) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) setIsHovering(true)
    }
    const handleOut = () => setIsHovering(false)

    const tick = () => {
      if (cursorRef.current) {
        // Center the 16px circle on the hotspot
        cursorRef.current.style.transform =
          `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [isPointerFine, prefersReduced, hasMoved])

  // Don't render at all on touch/coarse pointer or reduced-motion
  if (!isPointerFine || prefersReduced) return null

  const size = isHovering ? 28 : 16

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1.5px solid var(--color-ink)',
        backgroundColor: isHovering ? 'transparent' : 'var(--color-ink)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        willChange: 'transform',
        /* Invisible until the user actually moves the mouse */
        opacity: hasMoved ? 1 : 0,
        transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.2s ease',
      }}
    />
  )
}
