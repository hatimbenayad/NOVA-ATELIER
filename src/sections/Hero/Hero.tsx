import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import HeroCard from './HeroCard'
import { heroContent } from '../../data/content'
import { heroCards } from './hero.data'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** ─────────────────────────────────────────────────────────────────────────── *
 *  HERO SECTION — v2
 *  Reference: Pancharatna / Selvara layout
 *  Villa image: transparent PNG cut-out, no blend-mode, no container box.
 *  Villa is dominant (92–100% container width), fills 50–55% of viewport height.
 *  Bottom label is perfectly centered horizontally.
 * ─────────────────────────────────────────────────────────────────────────── */

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay: number = 0, y: number = 16, scale: number = 1) => ({
  hidden: { opacity: 0, y, scale },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay, ease: EASE },
  },
})

const drawIn = (delay: number = 0) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay, ease: EASE, transformOrigin: 'left' },
  },
})

const drawInRight = (delay: number = 0) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay, ease: EASE, transformOrigin: 'right' },
  },
})

// ─── Villa image ──────────────────────────────────────────────────────────────

/**
 * Renders the villa cut-out directly on the page background.
 * - No mix-blend-mode, no border, no container background.
 * - Error fallback: a small unobtrusive dev placeholder shown only on load failure.
 * - Normal render: just the <picture> element, transparent PNG sits on grey bg.
 */
function VillaImage() {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        style={{
          width: '100%',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-ink-soft)',
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.6875rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          opacity: 0.35,
        }}
      >
        Add /images/hero/villa.png
      </div>
    )
  }

  return (
    <img
      src="/images/hero/villa.png"
      alt={heroContent.villaAlt}
      /* Intrinsic dimensions from the actual image (1927×816). Set so there's no CLS. */
      width={1927}
      height={816}
      fetchPriority="high"
      loading="eager"
      decoding="async"
      onError={() => setErrored(true)}
      style={{
        width: 'auto',
        maxWidth: 'min(94vw, 1420px)',
        height: 'auto',
        maxHeight: 'clamp(280px, 50vh, 500px)',
        objectFit: 'contain',
        objectPosition: 'bottom center',
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const prefersReduced = useReducedMotion()

  // Mouse parallax — spring-lerped via RAF
  const mouseRef = useRef({ x: 0, y: 0 })
  const villaParallaxRef = useRef<HTMLDivElement>(null)
  const cardsParallaxRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)
  const currentOffset = useRef({ villa: 0, cards: 0 })

  useEffect(() => {
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseRef.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Villa: up to 8px with mouse, same direction
      const villaTarget = mouseRef.current.y * 8
      // Cards: up to 4px, opposite direction
      const cardsTarget = mouseRef.current.y * -4

      currentOffset.current.villa = lerp(currentOffset.current.villa, villaTarget, 0.06)
      currentOffset.current.cards = lerp(currentOffset.current.cards, cardsTarget, 0.06)

      if (villaParallaxRef.current) {
        villaParallaxRef.current.style.transform = `translateY(${currentOffset.current.villa}px)`
      }
      if (cardsParallaxRef.current) {
        cardsParallaxRef.current.style.transform = `translateY(${currentOffset.current.cards}px)`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [prefersReduced])

  return (
    <section
      aria-labelledby="hero-headline"
      style={{
        position: 'relative',
        /* Use dvh so it fills real viewport on mobile, fallback to svh / vh */
        minHeight: 'max(100svh, 720px)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 20%, #F6F6F5 0%, #EEEEEE 55%, #E6E6E5 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingBottom: 0,
      }}
    >
      {/* ── TOP ROW ─────────────────────────────────────────────────────────── */}
      {/*
        Tightened from 3.5% → 2% top padding to reclaim space for the villa.
        On 1920×1080 this saves ~40px at the top.
      */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'flex-start',
          padding: '1.2% 3.5% 0',
          gap: '1rem',
          flexShrink: 0,
        }}
      >
        {/* ── Top-left corner block ── */}
        <motion.div
          variants={fadeUp(0.05)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          <span className="label" style={{ display: 'block' }}>
            {heroContent.topLeft.line1}
          </span>
          <span className="label" style={{ display: 'block' }}>
            {heroContent.topLeft.line2}
          </span>
          <motion.span
            aria-hidden="true"
            variants={drawIn(0.25)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            style={{
              display: 'block',
              marginTop: '8px',
              width: '28px',
              height: '1px',
              backgroundColor: 'var(--color-hairline)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        {/* ── Top-center logo ── */}
        <motion.div
          variants={fadeUp(0.1)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Logo />
        </motion.div>

        {/* ── Top-right corner block ── */}
        <motion.div
          variants={fadeUp(0.05)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}
        >
          <span className="label" style={{ display: 'block', textAlign: 'right' }}>
            {heroContent.topRight.line1}
          </span>
          <span className="label" style={{ display: 'block', textAlign: 'right' }}>
            {heroContent.topRight.line2}
          </span>
          <motion.span
            aria-hidden="true"
            variants={drawInRight(0.25)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            style={{
              display: 'block',
              marginTop: '8px',
              width: '28px',
              height: '1px',
              backgroundColor: 'var(--color-hairline)',
              transformOrigin: 'right',
            }}
          />
        </motion.div>
      </div>

      {/* ── HEADLINE BLOCK ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0.8% 3.5% 0',
          gap: '0.35rem',
          flexShrink: 0,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            id="hero-headline"
            variants={fadeUp(0.2, 12)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
              fontWeight: 500,
              fontSize: 'clamp(1.75rem, 3.1vw, 3.25rem)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: 'var(--color-ink)',
              textTransform: 'uppercase',
              textWrap: 'balance',
              maxWidth: 'none',
              margin: '0 auto',
            }}
          >
            {heroContent.headline}
          </motion.h1>
        </div>

        <motion.p
          variants={fadeUp(0.3)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.625rem, 0.85vw, 0.8rem)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-soft)',
            /* Compensate trailing letter-spacing for optical centering */
            paddingLeft: '0.38em',
            margin: 0,
          }}
        >
          {heroContent.subheadline}
        </motion.p>
      </div>

      {/* ── CARDS ROW ───────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0.75% 3.5% 0',
          flexShrink: 0,
        }}
      >
        <div ref={cardsParallaxRef} style={{ willChange: 'transform' }}>
          <ul
            role="list"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '18px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {heroCards.map((card, i) => (
              <motion.li
                key={card.id}
                variants={fadeUp(0.4 + i * 0.08, 10, 0.96)}
                initial={prefersReduced ? 'visible' : 'hidden'}
                animate="visible"
                style={{ listStyle: 'none', display: 'flex' }}
              >
                <HeroCard card={card} index={i} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── VILLA IMAGE AREA ─────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          marginTop: '-0.75rem',
        }}
      >
        {/* Villa image and label container with parallax */}
        <motion.div
          variants={fadeUp(0.65, 20, 1.02)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          ref={villaParallaxRef}
          style={{
            position: 'relative',
            zIndex: 1,
            willChange: 'transform',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Villa image with ground shadow */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Soft blurred elliptical ground shadow right beneath the pavement */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '84%',
                maxWidth: '1150px',
                height: '26px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)',
                filter: 'blur(10px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <VillaImage />

            {/* Very subtle soft edge feather at the bottom of the cut-out road */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: '8%',
                right: '8%',
                height: '14px',
                background: 'linear-gradient(to top, rgba(238,238,238,0.6) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </div>

          {/* ── BOTTOM LABEL — perfectly centered under the villa driveway ── */}
          <motion.div
            variants={fadeUp(0.9)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            style={{
              marginTop: '8px',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* "—— CASA LUMEN ——" row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                justifyContent: 'center',
              }}
            >
              <motion.span
                aria-hidden="true"
                variants={drawIn(1.05)}
                initial={prefersReduced ? 'visible' : 'hidden'}
                animate="visible"
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--color-hairline)',
                  transformOrigin: 'left',
                }}
              />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  paddingLeft: '0.4em',
                }}
              >
                {heroContent.villaCaption}
              </span>
              <motion.span
                aria-hidden="true"
                variants={drawInRight(1.05)}
                initial={prefersReduced ? 'visible' : 'hidden'}
                animate="visible"
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--color-hairline)',
                  transformOrigin: 'right',
                }}
              />
            </div>

            {/* "BY NOVA ATELIER" */}
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.5625rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-soft)',
                marginTop: '3px',
                paddingLeft: '0.35em',
              }}
            >
              {heroContent.villaCaptionSub}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── RESPONSIVE OVERRIDES ─────────────────────────────────────────────── */}
      <style>{`
        /* Mobile (<640px): cards 2×2 grid, villa nearly full-width */
        @media (max-width: 639px) {
          /* cards list becomes 2-col grid */
        }
        /* Tablet (640–1023px): same single-row layout, just smaller */
      `}</style>
    </section>
  )
}
