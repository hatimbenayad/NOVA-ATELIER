import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { numbersContent } from '../../data/content'
import { NUMBERS_TIMELINE, HANDOFF_SCREENS, PROGRESS_SPRING, easeOutCubic } from './numbers.config'
import NumbersRow from './NumbersRow'
import NumbersImage from './NumbersImage'
import './Numbers.css'

export default function Numbers() {
  const wrapperRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const pinScreens = NUMBERS_TIMELINE.PIN_SCREENS

  // Native Lenis scroll progress (0 to 1 over the pinned wrapper)
  const { scrollYProgress: rawProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // numbersProgress = clamp(p * (PIN_SCREENS + 1) / PIN_SCREENS, 0, 1) -> feeds existing timeline
  const numbersRaw = useTransform(rawProgress, (p) =>
    Math.min(Math.max((p * (pinScreens + 1)) / pinScreens, 0), 1)
  )

  // Light spring smoothing to avoid jarring steps while preserving instant response
  const progress = useSpring(numbersRaw, PROGRESS_SPRING)

  // exit = clamp((p - PIN_SCREENS / (PIN_SCREENS + 1)) * (PIN_SCREENS + 1), 0, 1) -> drives exit zoom
  const exitProgress = useTransform(rawProgress, (p) =>
    Math.min(Math.max((p - pinScreens / (pinScreens + 1)) * (pinScreens + 1), 0), 1)
  )

  // Zoom: scale 1 -> 1.08 (easeInOut on exit), transform-origin 50% 42%
  const stageScale = useTransform(exitProgress, (t) => {
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    return 1 + eased * 0.08
  })

  // Veil: opacity 0 -> 1 on exit with --c-veil
  const veilOpacity = useTransform(exitProgress, [0, 1], [0, 1])

  // ─── Intro Animations (0.00 to 0.09) ───────────────────────────────────────
  // Tag fades in and moves slightly up
  const tagOpacity = useTransform(
    progress,
    [NUMBERS_TIMELINE.intro.start, NUMBERS_TIMELINE.intro.end],
    [0, 1],
    { ease: easeOutCubic }
  )
  const tagY = useTransform(
    progress,
    [NUMBERS_TIMELINE.intro.start, NUMBERS_TIMELINE.intro.end],
    [6, 0],
    { ease: easeOutCubic }
  )

  // Center vertical line draws down from top to bottom
  const centerLineScaleY = useTransform(
    progress,
    [NUMBERS_TIMELINE.intro.start, NUMBERS_TIMELINE.intro.end],
    [0, 1],
    { ease: easeOutCubic }
  )

  // ─── Statement Quote Animation (0.84 to 0.94) ──────────────────────────────
  const quoteOpacity = useTransform(
    progress,
    [NUMBERS_TIMELINE.quote.start, NUMBERS_TIMELINE.quote.end],
    [0, 1],
    { ease: easeOutCubic }
  )
  const quoteY = useTransform(
    progress,
    [NUMBERS_TIMELINE.quote.start, NUMBERS_TIMELINE.quote.end],
    [20, 0],
    { ease: easeOutCubic }
  )

  return (
    <section
      id="numbers"
      ref={wrapperRef}
      aria-labelledby="numbers-heading"
      className="numbers-wrapper surface-stone"
      style={{
        height: shouldReduceMotion
          ? 'auto'
          : `calc(100svh * (1 + ${pinScreens} + ${HANDOFF_SCREENS}))`,
      }}
    >
      {/* Visually hidden heading for screen readers */}
      <h2 id="numbers-heading" className="numbers-sr-only">
        NOVA Atelier in numbers
      </h2>

      {/* Pinned Sticky Stage */}
      <div
        className="numbers-stage surface-stone"
        style={{
          position: shouldReduceMotion ? 'relative' : 'sticky',
          minHeight: shouldReduceMotion ? '100svh' : undefined,
          height: shouldReduceMotion ? 'auto' : '100svh',
        }}
      >
        {/* Zoom wrapper: scale 1 -> 1.08 with transformOrigin 50% 42% on exit */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            scale: shouldReduceMotion ? 1 : stageScale,
            transformOrigin: '50% 42%',
          }}
        >
          {/* Top Left Tag: "● BY THE NUMBERS" */}
          <motion.p
            className="numbers-tag"
            style={{
              opacity: shouldReduceMotion ? 1 : tagOpacity,
              y: shouldReduceMotion ? 0 : tagY,
            }}
          >
            <span aria-hidden="true" className="numbers-tag-dot" />
            {numbersContent.tag}
          </motion.p>

          {/* Center 1px Vertical Line */}
          <motion.span
            aria-hidden="true"
            className="numbers-center-line"
            style={{
              scaleY: shouldReduceMotion ? 1 : centerLineScaleY,
              transformOrigin: 'top center',
            }}
          />

          {/* Left Half: 5-Photo Strip centered on Row 3 */}
          <div className="numbers-photos-strip">
            {numbersContent.images.map((img, i) => (
              <NumbersImage
                key={img.src}
                image={img}
                index={i}
                progress={progress}
              />
            ))}
          </div>

          {/* Editorial Statement (Left Half Row 5 on Desktop; bottom on mobile) */}
          <motion.blockquote
            className="numbers-statement"
            style={{
              opacity: shouldReduceMotion ? 1 : quoteOpacity,
              y: shouldReduceMotion ? 0 : quoteY,
            }}
          >
            “{numbersContent.quote}”
          </motion.blockquote>

          {/* Right Half: 5 Stat Rows (Full-bleed lines, markers, numbers, labels) */}
          <ul role="list" className="numbers-rows-list">
            {numbersContent.stats.map((stat, i) => (
              <NumbersRow
                key={stat.label}
                stat={stat}
                index={i}
                progress={progress}
              />
            ))}
          </ul>

          {/* Dark veil layer above content (no filters) */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--c-veil)',
              opacity: shouldReduceMotion ? 0 : veilOpacity,
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
