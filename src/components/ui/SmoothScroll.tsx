import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis, { type LenisOptions } from 'lenis'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LENIS SMOOTH SCROLL CONFIGURATION
 * Target feel: premium editorial site, calm and weighty, never laggy.
 * Edit these values directly to adjust scroll feel across the entire site.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const LENIS_CONFIG: LenisOptions = {
  // Linear interpolation: 0.075 creates an eased, calm, slightly slow glide
  lerp: 0.075,
  // Ease-out expo curve for programmatic scrollTo
  easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  // Wheel multiplier slightly tempered for measured, editorial weight
  wheelMultiplier: 0.85,
  // Touch multiplier on touch devices
  touchMultiplier: 1,
  // Smooth mouse wheel and trackpad scrolling
  smoothWheel: true,
  // Keep native touch scrolling on phones and tablets (avoids lag and gesture conflicts)
  syncTouch: false,
  // Driven manually via our own requestAnimationFrame loop
  autoRaf: false,
}

interface SmoothScrollContextType {
  lenis: Lenis | null
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      immediate?: boolean
      lock?: boolean
      onComplete?: () => void
    }
  ) => void
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

export function useSmoothScroll(): SmoothScrollContextType {
  return useContext(SmoothScrollContext)
}

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * Single SmoothScroll provider component wrapping the application.
 * - Instantiates one Lenis instance driven by requestAnimationFrame.
 * - Cleans up RAF and destroys instance on unmount (strict-mode safe).
 * - Intercepts anchor clicks with 1.6s duration, fixed-navbar offset, and keyboard focus.
 * - Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReduced = useReducedMotion()
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    // Respect prefers-reduced-motion: if user prefers reduced motion, do not initialize Lenis
    if (prefersReduced) {
      return
    }

    // Initialize Lenis
    const lenis = new Lenis(LENIS_CONFIG)
    lenisRef.current = lenis
    setLenisInstance(lenis)

    // Drive with requestAnimationFrame loop
    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    // Handle browser back/forward and route changes: instant scroll to top
    const handlePopState = () => {
      lenis.scrollTo(0, { immediate: true })
    }
    window.addEventListener('popstate', handlePopState)

    // Global anchor link interceptor
    // Smoothly scrolls to hash anchors with fixed navbar offset and shifts keyboard focus
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Bare '#' scrolls to top
      if (href === '#') {
        e.preventDefault()
        lenis.scrollTo(0, {
          duration: 1.6,
          onComplete: () => {
            window.history.pushState(null, '', ' ')
          },
        })
        return
      }

      // Hash target element (e.g. #selected-work, #studio, #main-content)
      try {
        const targetElement = document.querySelector<HTMLElement>(href)
        if (targetElement) {
          e.preventDefault()
          // Fixed navbar height is 64px, give 80px offset for breathing room
          lenis.scrollTo(targetElement, {
            offset: -80,
            duration: 1.6,
            onComplete: () => {
              // Shift keyboard focus to target element for accessibility
              if (!targetElement.hasAttribute('tabindex')) {
                targetElement.setAttribute('tabindex', '-1')
              }
              targetElement.focus({ preventScroll: true })
              window.history.pushState(null, '', href)
            },
          })
        }
      } catch {
        // Fallback if querySelector throws on invalid selector
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [prefersReduced])

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      immediate?: boolean
      lock?: boolean
      onComplete?: () => void
    }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.6,
        immediate: options?.immediate ?? false,
        lock: options?.lock ?? false,
        onComplete: options?.onComplete ? () => options.onComplete!() : undefined,
      })
    } else {
      // Fallback for prefers-reduced-motion
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'auto' })
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'auto' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'auto' })
      }
    }
  }

  const stop = () => {
    lenisRef.current?.stop()
  }

  const start = () => {
    lenisRef.current?.start()
  }

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  )
}
