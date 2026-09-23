import { useState, useRef, useEffect } from 'react'
import { motion, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { studioContent } from '../../data/content'
import { useRevealProgress } from '../SelectedWork/RevealProgressContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSlideshow } from '../../hooks/useSlideshow'
import './Studio.css'

// ─── Animation Timeline Configuration ─────────────────────────────────────────
const STUDIO_TIMELINE = {
  holdEnd: 0.18,      // State 1 holds fully visible
  swapStart: 0.18,    // State 1 starts exiting, State 2 starts entering
  swapEnd: 0.48,      // State 2 finishes building in
  autoplayFrom: 0.5,  // Autoplay begins once settled
  hysteresisReset: 0.45, // Scroll back up past this resets to slide 1
}

const SLIDE_DURATION_MS = 5500

/**
 * Single word inside State 1 headline with overflow:clip mask.
 * Enters upward as circle opens; exits upward during State 2 swap.
 */
function StudioWord({
  word,
  index,
  reveal,
  tail,
}: {
  word: string
  index: number
  reveal: MotionValue<number>
  tail: MotionValue<number>
}) {
  const enterStart = Math.min(0.85, 0.35 + index * 0.025)
  const enterEnd = Math.min(1.0, enterStart + 0.18)
  const enterY = useTransform(reveal, [enterStart, enterEnd], [110, 0], { clamp: true })

  const exitStart = 0.18 + index * 0.012
  const exitEnd = Math.min(0.48, exitStart + 0.14)
  const exitY = useTransform(tail, [exitStart, exitEnd], [0, -110], { clamp: true })

  const y = useTransform([enterY, exitY], (values: number[]) => `${values[0] + values[1]}%`)

  return (
    <>
      <span className="studio-word-mask">
        <motion.span style={{ y }} className="studio-word-inner">
          {word}
        </motion.span>
      </span>{' '}
    </>
  )
}

/**
 * Studio Section — Two-state pinned editorial narrative.
 * State 1: Giant statement with word-level entrance and right-aligned intro.
 * State 2: Studio photo, dual body copy, and 4-slide animated vertical-wipe slideshow.
 */
export default function Studio() {
  const prefersReduced = useReducedMotion()
  const { reveal, tail } = useRevealProgress()

  const controlsRef = useRef<HTMLDivElement>(null)
  const slideshowContainerRef = useRef<HTMLDivElement>(null)

  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [settled, setSettled] = useState<boolean>(false)
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true)
  const [userPaused, setUserPaused] = useState<boolean>(false)

  // Previous slide tracking for vertical wipe & drift animations
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  const {
    index: activeSlide,
    progress: slideProgress,
    goTo,
    paused,
    setPaused,
  } = useSlideshow(studioContent.slides.length, SLIDE_DURATION_MS)

  const prevSlideRef = useRef(activeSlide)
  useEffect(() => {
    if (prevSlideRef.current !== activeSlide) {
      setPrevIndex(prevSlideRef.current)
      prevSlideRef.current = activeSlide
    }
  }, [activeSlide])

  // Track tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Manage slideshow pause based on scroll settlement, hover, focus, tab visibility
  useEffect(() => {
    if (prefersReduced || userPaused) {
      setPaused(true)
      return
    }

    const shouldPlay = settled && isTabVisible && !isHovered && !isFocused
    setPaused(!shouldPlay)
  }, [settled, isTabVisible, isHovered, isFocused, prefersReduced, userPaused, setPaused])

  // Monitor scroll tail for autoplay threshold, hysteresis reset, and inert controls
  useMotionValueEvent(tail, 'change', (latest) => {
    // Autoplay hysteresis
    if (latest >= STUDIO_TIMELINE.autoplayFrom) {
      if (!settled) setSettled(true)
    } else if (latest < STUDIO_TIMELINE.hysteresisReset) {
      if (settled) {
        setSettled(false)
        goTo(0)
      }
    }

    // Inert on interactive controls until tail >= 0.4
    if (controlsRef.current) {
      if (latest < 0.4) {
        controlsRef.current.setAttribute('inert', '')
      } else {
        controlsRef.current.removeAttribute('inert')
      }
    }
  })

  // ─── State 1 Transforms ───────────────────────────────────────────────────
  // Right intro paragraph entrance (reveal) and exit (tail)
  const introEnterOpacity = useTransform(reveal, [0.65, 0.95], [0, 1], { clamp: true })
  const introEnterY = useTransform(reveal, [0.65, 0.95], [20, 0], { clamp: true })
  const introExitOpacity = useTransform(tail, [0.18, 0.30], [1, 0], { clamp: true })
  const introExitY = useTransform(tail, [0.18, 0.30], [0, -20], { clamp: true })

  const introOpacity = useTransform(
    [introEnterOpacity, introExitOpacity],
    (values: number[]) => values[0] * values[1]
  )
  const introY = useTransform(
    [introEnterY, introExitY],
    (values: number[]) => values[0] + values[1]
  )

  // Overall State 1 opacity: holds until 0.18, fades to 0 by 0.48
  const state1Opacity = useTransform(tail, [0.18, 0.48], [1, 0], { clamp: true })
  const state1PointerEvents = useTransform(tail, (t) => (t >= 0.48 ? 'none' : 'auto'))

  // ─── State 2 Transforms (0.18 -> 0.48 swap window) ────────────────────────
  // 1. Right slideshow wipes up (window 25% -> 85% => tail 0.255 -> 0.435)
  const slideshowClip = useTransform(tail, [0.255, 0.435], [100, 0], { clamp: true })
  const slideshowClipPath = useTransform(slideshowClip, (val) => `inset(${val}% 0 0 0)`)

  // 2. Small studio image wipes up (window 40% -> 95% => tail 0.30 -> 0.465)
  const studioImgClip = useTransform(tail, [0.30, 0.465], [100, 0], { clamp: true })
  const studioImgScale = useTransform(tail, [0.30, 0.465], [1.18, 1.0], { clamp: true })
  const studioImgClipPath = useTransform(studioImgClip, (val) => `inset(${val}% 0 0 0)`)

  // 3. Left paragraphs fade in (window 55% -> 100% => tail 0.345 -> 0.48)
  const p1Opacity = useTransform(tail, [0.345, 0.42], [0, 1], { clamp: true })
  const p1Y = useTransform(tail, [0.345, 0.42], [28, 0], { clamp: true })

  const p2Opacity = useTransform(tail, [0.39, 0.48], [0, 1], { clamp: true })
  const p2Y = useTransform(tail, [0.39, 0.48], [28, 0], { clamp: true })

  // 4. CTA and progress bar come in last (window 75% -> 100% => tail 0.405 -> 0.48)
  const ctaOpacity = useTransform(tail, [0.405, 0.48], [0, 1], { clamp: true })
  const ctaY = useTransform(tail, [0.405, 0.48], [16, 0], { clamp: true })

  const state2Opacity = useTransform(tail, [0.18, 0.30], [0, 1], { clamp: true })

  const words = studioContent.statement.split(' ')

  // ─── Reduced Motion Branch: Stacked static view ────────────────────────────
  if (prefersReduced) {
    return (
      <section id="studio" aria-labelledby="studio-heading" className="studio-section surface-paper" style={{ position: 'relative', height: 'auto' }}>
        <div className="studio-grid" style={{ position: 'relative', height: 'auto', paddingBottom: '3rem' }}>
          <div className="studio-headline-col">
            <h2 id="studio-heading" className="studio-headline">
              {studioContent.statement}
            </h2>
          </div>
          <div className="studio-intro-col">
            <p className="studio-intro-text">{studioContent.intro}</p>
          </div>
        </div>

        <div className="studio-grid" style={{ position: 'relative', height: 'auto', paddingTop: '2rem' }}>
          <div className="studio-state-2-left">
            <div className="studio-small-image-wrap">
              <img
                src={studioContent.studioImage.src}
                alt={studioContent.studioImage.alt}
                width={studioContent.studioImage.width}
                height={studioContent.studioImage.height}
                className="studio-small-image"
              />
            </div>
            <div className="studio-state-2-text-group" style={{ marginTop: '2rem' }}>
              <p className="studio-body-p">{studioContent.paragraphs[0]}</p>
              <p className="studio-body-p">{studioContent.paragraphs[1]}</p>
              <a href={studioContent.cta.href} className="studio-cta-link">
                {studioContent.cta.label}
              </a>
            </div>
          </div>

          <div className="studio-state-2-right">
            <div className="studio-slideshow-wrap" style={{ minHeight: '400px' }}>
              <img
                src={studioContent.slides[activeSlide].src}
                alt={studioContent.slides[activeSlide].alt}
                width={studioContent.slides[activeSlide].width}
                height={studioContent.slides[activeSlide].height}
                className="studio-slide-image"
              />
            </div>
            <div className="studio-progress-bar" role="tablist">
              {studioContent.slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Show image ${i + 1} of ${studioContent.slides.length}`}
                  className={`studio-progress-segment ${i === activeSlide ? 'is-active' : 'is-inactive'}`}
                  onClick={() => goTo(i)}
                >
                  <span className="studio-progress-track">
                    <span
                      className="studio-progress-fill"
                      style={{
                        transform: i === activeSlide ? 'scaleX(1)' : i < activeSlide ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Preload next slide image
  const nextSlideIndex = (activeSlide + 1) % studioContent.slides.length
  const nextSlide = studioContent.slides[nextSlideIndex]

  return (
    <section id="studio" aria-labelledby="studio-heading" className="studio-section surface-paper">
      {/* Hidden image preloader for upcoming slide */}
      <img
        src={nextSlide.src}
        alt=""
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      {/* ─── State 1: Giant Statement & Short Paragraph ───────────────────── */}
      <motion.div
        className="studio-grid studio-state studio-state-1"
        style={{
          opacity: state1Opacity,
          pointerEvents: state1PointerEvents,
        }}
      >
        <div className="studio-headline-col">
          <h2 id="studio-heading" className="studio-headline">
            {words.map((word, i) => (
              <StudioWord
                key={`${word}-${i}`}
                word={word}
                index={i}
                reveal={reveal}
                tail={tail}
              />
            ))}
          </h2>
        </div>

        <div className="studio-intro-col">
          <motion.p
            className="studio-intro-text"
            style={{
              opacity: introOpacity,
              y: introY,
            }}
          >
            {studioContent.intro}
          </motion.p>
        </div>
      </motion.div>

      {/* ─── State 2: Small Image + Text + Slideshow ─────────────────────── */}
      <motion.div
        className="studio-grid studio-state studio-state-2"
        style={{
          opacity: state2Opacity,
        }}
      >
        {/* Left Column (Columns 1-3) */}
        <div className="studio-state-2-left">
          {/* Top: Small studio photo with vertical wipe reveal */}
          <motion.div
            className="studio-small-image-wrap"
            style={{
              clipPath: studioImgClipPath,
            }}
          >
            <motion.img
              src={studioContent.studioImage.src}
              alt={studioContent.studioImage.alt}
              width={studioContent.studioImage.width}
              height={studioContent.studioImage.height}
              className="studio-small-image"
              loading="lazy"
              decoding="async"
              style={{
                scale: studioImgScale,
              }}
            />
          </motion.div>

          {/* Bottom: Two paragraphs & CTA link */}
          <div className="studio-state-2-text-group">
            <motion.p
              className="studio-body-p"
              style={{
                opacity: p1Opacity,
                y: p1Y,
              }}
            >
              {studioContent.paragraphs[0]}
            </motion.p>

            <motion.p
              className="studio-body-p"
              style={{
                opacity: p2Opacity,
                y: p2Y,
              }}
            >
              {studioContent.paragraphs[1]}
            </motion.p>

            <motion.div
              style={{
                opacity: ctaOpacity,
                y: ctaY,
              }}
            >
              <a href={studioContent.cta.href} className="studio-cta-link">
                <span>{studioContent.cta.label}</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Column (Columns 7-12) */}
        <div className="studio-state-2-right">
          {/* Large Slideshow */}
          <motion.div
            ref={slideshowContainerRef}
            className="studio-slideshow-wrap"
            aria-label="Studio projects slideshow"
            aria-live={paused ? 'polite' : 'off'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsFocused(false)
              }
            }}
            style={{
              clipPath: slideshowClipPath,
            }}
          >
            {/* Screen-reader pause/play toggle */}
            <button
              type="button"
              className="studio-pause-btn"
              onClick={() => {
                setUserPaused((prev) => !prev)
              }}
              aria-label={userPaused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {userPaused ? 'Play Slideshow' : 'Pause Slideshow'}
            </button>

            {/* Stacked Slides */}
            {studioContent.slides.map((slide, i) => {
              const isActive = i === activeSlide
              const isPrev = i === prevIndex

              if (!isActive && !isPrev) {
                return null
              }

              return (
                <motion.div
                  key={slide.src}
                  className="studio-slide-item"
                  initial={
                    isActive && isPrev !== null
                      ? { clipPath: 'inset(100% 0 0 0)', zIndex: 2 }
                      : { clipPath: 'inset(0% 0 0 0)', zIndex: 1 }
                  }
                  animate={
                    isActive
                      ? { clipPath: 'inset(0% 0 0 0)', zIndex: 2 }
                      : { y: '-3%', zIndex: 1 }
                  }
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.img
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="studio-slide-image"
                    initial={isActive && isPrev !== null ? { scale: 1.12 } : { scale: 1 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

          {/* Segmented Stories Progress Bar */}
          <motion.div
            ref={controlsRef}
            className="studio-progress-bar"
            style={{
              opacity: ctaOpacity,
              y: ctaY,
            }}
          >
            {studioContent.slides.map((slide, i) => {
              const isActive = i === activeSlide
              const isPast = i < activeSlide

              return (
                <button
                  key={slide.src}
                  type="button"
                  className={`studio-progress-segment ${isActive ? 'is-active' : 'is-inactive'}`}
                  aria-label={`Show image ${i + 1} of ${studioContent.slides.length}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="studio-progress-track">
                    <motion.span
                      className="studio-progress-fill"
                      style={{
                        scaleX: isActive ? slideProgress : isPast ? 1 : 0,
                      }}
                    />
                  </span>
                </button>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
