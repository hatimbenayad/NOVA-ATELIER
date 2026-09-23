import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { numbersContent } from '../../data/content'
import { NUMBERS_TIMELINE, PROGRESS_SPRING, easeOutCubic } from './numbers.config'
import NumbersRow from './NumbersRow'
import NumbersImage from './NumbersImage'
import './Numbers.css'

export default function Numbers() {
  const wrapperRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Native Lenis scroll progress (0 to 1 over the pinned wrapper)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Light spring smoothing to avoid jarring steps while preserving instant response
  const progress = useSpring(scrollYProgress, PROGRESS_SPRING)

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

  // Pin height: 1 + PIN_SCREENS
  const pinScreens = NUMBERS_TIMELINE.PIN_SCREENS

  return (
    <>
      <section
        id="numbers"
        ref={wrapperRef}
        aria-labelledby="numbers-heading"
        className="numbers-wrapper"
        style={{
          height: shouldReduceMotion
            ? 'auto'
            : `calc(100svh * (1 + ${pinScreens}))`,
        }}
      >
        {/* Visually hidden heading for screen readers */}
        <h2 id="numbers-heading" className="numbers-sr-only">
          NOVA Atelier in numbers
        </h2>

        {/* Pinned Sticky Stage */}
        <div
          className="numbers-stage"
          style={{
            position: shouldReduceMotion ? 'relative' : 'sticky',
            minHeight: shouldReduceMotion ? '100svh' : undefined,
            height: shouldReduceMotion ? 'auto' : '100svh',
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

          {/* Left Half: Editorial Statement in Row 5 (Desktop) */}
          <motion.blockquote
            className="numbers-statement numbers-statement-desktop"
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
        </div>
      </section>

      {/* Mobile Editorial Statement (Normal block rendered right after pinned stage) */}
      <motion.aside
        aria-label="Editorial statement"
        className="numbers-statement-mobile-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <blockquote className="numbers-statement-mobile">
          “{numbersContent.quote}”
        </blockquote>
      </motion.aside>
    </>
  )
}
