import { createContext, useContext } from 'react'
import { useMotionValue, type MotionValue } from 'framer-motion'

export interface RevealProgressContextValue {
  /**
   * Progress of the circle mask opening, from 0 (closed) to 1 (fully open).
   */
  reveal: MotionValue<number>
  /**
   * Progress of the post-circle pinned distance (the tail), from 0 to 1.
   */
  tail: MotionValue<number>
}

export const RevealProgressContext = createContext<RevealProgressContextValue | null>(null)

/**
 * useRevealProgress — exposes { reveal, tail } as Framer Motion MotionValues (0 to 1).
 * When used without a provider (reduced motion / standalone), both default to 1.
 */
export function useRevealProgress(): RevealProgressContextValue {
  const context = useContext(RevealProgressContext)
  const defaultReveal = useMotionValue(1)
  const defaultTail = useMotionValue(1)

  if (!context) {
    return {
      reveal: defaultReveal,
      tail: defaultTail,
    }
  }

  return context
}
