import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { projects } from '../../data/content'
import { useSmoothScroll } from '../../components/ui/SmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import ProjectItem from './ProjectItem'
import { RevealProgressContext } from './RevealProgressContext'
import './SelectedWork.css'

// ─── Scroll & Animation Config ────────────────────────────────────────────────
const CONFIG = {
  HORIZONTAL_END: 0.8, // progress of main scroll at which track finishes moving
  CIRCLE_START: 0.6,   // circle starts opening while images are still moving left
  CIRCLE_END: 1.0,     // circle covers entire screen
}

export interface SelectedWorkProps {
  reveal?: ReactNode
  tailScreens?: number
}

/**
 * Selected Work — pinned full-screen stage with right-to-left horizontal glide,
 * fixed condensed "NOVA" / "ATELIER" typography, circular portal reveal slot,
 * and extended tail pinning for the revealed section.
 */
export default function SelectedWork({ reveal, tailScreens = 0 }: SelectedWorkProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const workLayerRef = useRef<HTMLDivElement>(null)
  const revealSlotRef = useRef<HTMLDivElement>(null)
  const studioAnchorRef = useRef<HTMLDivElement>(null)

  const { lenis } = useSmoothScroll()
  const prefersReduced = useReducedMotion()

  // Track total horizontal travel T
  const [totalTravel, setTotalTravel] = useState<number>(2400)
  const [windowHeight, setWindowHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900
  )

  // Measure track scroll width and window height accurately
  const measureGeometry = useCallback(() => {
    if (trackRef.current) {
      const scrollW = trackRef.current.scrollWidth
      if (scrollW > 0) {
        setTotalTravel(scrollW)
      }
    }
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
    }
  }, [])

  useEffect(() => {
    measureGeometry()

    const ro = new ResizeObserver(() => {
      measureGeometry()
    })

    if (trackRef.current) {
      ro.observe(trackRef.current)
    }

    window.addEventListener('resize', measureGeometry)
    document.fonts?.ready?.then(measureGeometry)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measureGeometry)
    }
  }, [measureGeometry])

  // Scroll timeline linked to wrapper
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Geometry calculations: main scroll for track & circle + tail screens for revealed studio
  const effectiveTailScreens = prefersReduced ? 0 : tailScreens
  const mainScroll = totalTravel / CONFIG.HORIZONTAL_END
  const tailScroll = effectiveTailScreens * windowHeight
  const totalScrollDistance = mainScroll + tailScroll
  const mainFraction = totalScrollDistance > 0 ? mainScroll / totalScrollDistance : 1

  // Convert raw scroll progress into mainProgress (0-1 over mainScroll) and tail (0-1 over tailScroll)
  const mainProgress = useTransform(scrollYProgress, [0, mainFraction], [0, 1], { clamp: true })
  const tail = useTransform(scrollYProgress, [mainFraction, 1], [0, 1], { clamp: true })

  // Horizontal motion: x goes linearly from 0 to -T during mainProgress 0 -> HORIZONTAL_END
  const x = useTransform(mainProgress, [0, CONFIG.HORIZONTAL_END], [0, -totalTravel], { clamp: true })

  // Reveal progress: 0 to 1 during mainProgress CIRCLE_START -> CIRCLE_END
  const revealProgress = useTransform(
    mainProgress,
    [CONFIG.CIRCLE_START, CONFIG.CIRCLE_END],
    [0, 1],
    { clamp: true }
  )

  // Update circle mask and DOM attributes directly without React re-renders
  useMotionValueEvent(mainProgress, 'change', (latest) => {
    const workLayer = workLayerRef.current
    const revealSlot = revealSlotRef.current
    if (!workLayer) return

    // 1. Circle hole mask & visibility on work layer
    if (latest < CONFIG.CIRCLE_START) {
      workLayer.style.maskImage = 'none'
      workLayer.style.webkitMaskImage = 'none'
      workLayer.style.visibility = 'visible'
      workLayer.removeAttribute('inert')
    } else if (latest >= CONFIG.CIRCLE_END) {
      workLayer.style.visibility = 'hidden'
      workLayer.setAttribute('inert', '')
    } else {
      workLayer.style.visibility = 'visible'
      workLayer.removeAttribute('inert')

      // Progress within circle phase [0, 1]
      const p = (latest - CONFIG.CIRCLE_START) / (CONFIG.CIRCLE_END - CONFIG.CIRCLE_START)
      // Gentle ease-in-out
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      const r = Math.max(0, Math.min(100, eased * 100))

      const maskValue = `radial-gradient(circle farthest-corner at 50% 50%, transparent ${r}%, var(--fg) calc(${r}% + 0.5%))`
      workLayer.style.maskImage = maskValue
      workLayer.style.webkitMaskImage = maskValue
    }

    // 2. Inert on reveal slot until circle is ~40% open (0.6 + 0.4 * 0.4 = 0.76)
    if (revealSlot) {
      if (latest < 0.76) {
        revealSlot.setAttribute('inert', '')
      } else {
        revealSlot.removeAttribute('inert')
      }
    }
  })

  // Sanitize studio anchor: ensure anchor at (top: mainScroll) is the unique #studio target
  useEffect(() => {
    if (revealSlotRef.current) {
      const innerStudio = revealSlotRef.current.querySelector('#studio')
      if (innerStudio && innerStudio !== studioAnchorRef.current) {
        innerStudio.removeAttribute('id')
      }
    }
  }, [reveal])

  // Keyboard navigation: center focused off-screen item in stage
  const handleItemFocus = useCallback(
    (itemEl: HTMLElement) => {
      if (!trackRef.current || !wrapperRef.current) return

      const stageWidth = window.innerWidth
      const trackRect = trackRef.current.getBoundingClientRect()
      const itemRect = itemEl.getBoundingClientRect()

      // If already comfortably in view, do not jump
      if (itemRect.left >= 48 && itemRect.right <= stageWidth - 48) {
        return
      }

      // Compute item center relative to track
      const itemOffsetInTrack = itemRect.left - trackRect.left
      const itemCenterInTrack = itemOffsetInTrack + itemRect.width / 2

      // We want track position targetX such that: itemCenterInTrack + targetX = stageWidth / 2
      const targetX = stageWidth / 2 - itemCenterInTrack
      const clampedMainProgress = Math.max(
        0,
        Math.min(CONFIG.HORIZONTAL_END, (-targetX / totalTravel) * CONFIG.HORIZONTAL_END)
      )

      // Calculate corresponding vertical scroll position
      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const wrapperTop = wrapperRect.top + window.scrollY
      const currentMainScroll = totalTravel / CONFIG.HORIZONTAL_END
      const targetScrollY = wrapperTop + clampedMainProgress * currentMainScroll

      if (lenis) {
        lenis.scrollTo(targetScrollY)
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
      }
    },
    [totalTravel, lenis]
  )

  // Reduced motion branch: unpinned horizontal scroll strip, no circle mask, no tail
  if (prefersReduced) {
    return (
      <>
        <section
          id="work"
          aria-labelledby="work-heading"
          className="selected-work-wrapper"
          style={{
            paddingTop: '6rem',
            paddingBottom: '6rem',
          }}
        >
          <h2 id="work-heading" className="sr-only">
            Selected Work
          </h2>
          <div id="selected-work" style={{ position: 'absolute', top: 0, height: 0 }} aria-hidden="true" />

          <div className="selected-work-reduced-strip">
            {projects.map((project, index) => (
              <div key={project.slug} className="selected-work-reduced-item">
                <ProjectItem project={project} index={index} />
              </div>
            ))}
          </div>

          <div className="giant-words-container" aria-hidden="true" style={{ position: 'relative', marginTop: '3rem' }}>
            <span className="giant-word">NOVA</span>
            <span className="giant-word">ATELIER</span>
          </div>
        </section>

        {/* Next section follows normally */}
        {reveal}
      </>
    )
  }

  // Wrapper height: 100svh + totalScrollDistance
  const wrapperHeight = `calc(100svh + ${totalScrollDistance}px)`

  return (
    <section
      id="work"
      ref={wrapperRef}
      aria-labelledby="work-heading"
      className="selected-work-wrapper surface-ground"
      style={{ height: wrapperHeight }}
    >
      {/* Visually hidden heading for accessibility */}
      <h2 id="work-heading" className="sr-only">
        Selected Work
      </h2>

      {/* Backwards compatibility anchor for #selected-work */}
      <div id="selected-work" style={{ position: 'absolute', top: 0, height: 0 }} aria-hidden="true" />

      {/* Sticky Stage: 100svh pinned container */}
      <div className="selected-work-stage surface-ground">
        {/* 1. Reveal Slot (Layer beneath work layer) */}
        <div
          ref={revealSlotRef}
          className="selected-work-reveal-slot"
          inert
        >
          <RevealProgressContext.Provider value={{ reveal: revealProgress, tail }}>
            <div style={{ width: '100%', height: '100%' }}>
              {reveal}
            </div>
          </RevealProgressContext.Provider>
        </div>

        {/* 2. Work Layer (Upper layer with circular hole mask) */}
        <div
          ref={workLayerRef}
          className="selected-work-layer surface-ground"
        >
          {/* Horizontal track vertically centered on 52% axis */}
          <div className="selected-work-track-container">
            <motion.div
              ref={trackRef}
              className="selected-work-track"
              style={{ x }}
            >
              {projects.map((project, index) => (
                <ProjectItem
                  key={project.slug}
                  project={project}
                  index={index}
                  onItemFocus={handleItemFocus}
                />
              ))}
            </motion.div>
          </div>

          {/* Giant condensed words staying fixed at bottom of stage */}
          <div className="giant-words-container" aria-hidden="true">
            <span className="giant-word">NOVA</span>
            <span className="giant-word">ATELIER</span>
          </div>
        </div>
      </div>

      {/* Zero-height anchor for #studio at exactly wrapper top + mainScroll (tail = 0) */}
      <div
        id="studio"
        ref={studioAnchorRef}
        style={{
          position: 'absolute',
          top: `${mainScroll}px`,
          left: 0,
          width: '1px',
          height: 0,
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
