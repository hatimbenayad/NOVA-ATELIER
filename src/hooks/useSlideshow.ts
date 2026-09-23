import { useState, useRef, useEffect, useCallback } from 'react'
import { useMotionValue, type MotionValue } from 'framer-motion'

export interface UseSlideshowReturn {
  index: number
  progress: MotionValue<number>
  goTo: (newIndex: number) => void
  paused: boolean
  setPaused: (paused: boolean | ((prev: boolean) => boolean)) => void
  toggle: () => void
}

/**
 * useSlideshow — accurately tracks slideshow progress via requestAnimationFrame
 * accumulating elapsed time into a Framer Motion MotionValue without re-renders.
 * Only `index` updates React state upon slide transition.
 */
export function useSlideshow(count: number, durationMs: number): UseSlideshowReturn {
  const [index, setIndex] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)

  const progress = useMotionValue<number>(0)

  const elapsedRef = useRef<number>(0)
  const lastTimeRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const pausedRef = useRef<boolean>(paused)
  pausedRef.current = paused

  const goTo = useCallback(
    (newIndex: number) => {
      setIndex(((newIndex % count) + count) % count)
      elapsedRef.current = 0
      lastTimeRef.current = null
      progress.set(0)
    },
    [count, progress]
  )

  const toggle = useCallback(() => {
    setPaused((prev) => !prev)
  }, [])

  useEffect(() => {
    if (count <= 1 || durationMs <= 0) return

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now
      }

      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      if (!pausedRef.current) {
        elapsedRef.current += delta

        if (elapsedRef.current >= durationMs) {
          elapsedRef.current = 0
          progress.set(0)
          setIndex((prev) => (prev + 1) % count)
        } else {
          progress.set(elapsedRef.current / durationMs)
        }
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      lastTimeRef.current = null
    }
  }, [count, durationMs, progress])

  return {
    index,
    progress,
    goTo,
    paused,
    setPaused,
    toggle,
  }
}
