import { createContext, useContext } from 'react'
import type { MotionValue } from 'framer-motion'

export interface RevealProgressContextValue {
  /**
   * Progress of the circle mask opening, from 0 (closed) to 1 (fully open).
   * Driven by Framer Motion's scroll-linked MotionValue.
   */
  revealProgress: MotionValue<number>
}

export const RevealProgressContext = createContext<RevealProgressContextValue | null>(null)

export function useRevealProgress(): RevealProgressContextValue | null {
  return useContext(RevealProgressContext)
}
