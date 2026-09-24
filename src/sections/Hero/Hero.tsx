import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import HeroCard from './HeroCard'
import { heroContent } from '../../data/content'
import { heroCards } from './hero.data'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** ─────────────────────────────────────────────────────────────────────────── *
 *  HERO SECTION
 *  Desktop: Split layout with Left text column, Right 4 cards row, top nav.
 *  Mobile (<768px): 4 cards hidden, text bigger & moved down, top navbar sticky.
 *  Villa image: transparent cut-out with soft blurred elliptical ground shadow.
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
          color: 'var(--fg-soft)',
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
        maxHeight: 'clamp(280px, 48vh, 500px)',
        objectFit: 'contain',
        objectPosition: 'bottom center',
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}

// ─── Hero Component ───────────────────────────────────────────────────────────

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
      const villaTarget = mouseRef.current.y * 8
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
      className="surface-ground hero-section"
      style={{
        position: 'relative',
        minHeight: 'max(100svh, 720px)',
        background: 'radial-gradient(ellipse 70% 60% at 50% 18%, var(--c-paper) 0%, var(--c-ground) 80%, var(--c-ground) 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingBottom: 0,
      }}
    >
      {/* ── DESKTOP TOP ROW (hidden on mobile where sticky Navbar serves as header) ── */}
      <div
        className="hero-top-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.4% 3.5% 0',
          gap: '1.5rem',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Top-left corner block */}
        <motion.div
          variants={fadeUp(0.05)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          className="hero-top-left"
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
              backgroundColor: 'var(--line-strong)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        {/* Top-center logo */}
        <motion.div
          variants={fadeUp(0.1)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          className="hero-top-center"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Logo />
        </motion.div>

        {/* Top-right nav links + location */}
        <motion.div
          variants={fadeUp(0.05)}
          initial={prefersReduced ? 'visible' : 'hidden'}
          animate="visible"
          className="hero-top-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1.5rem',
          }}
        >
          <nav
            className="hero-nav-links"
            aria-label="Hero navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.35rem',
            }}
          >
            {heroContent.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.625rem',
                  fontWeight: link.active ? 500 : 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: link.active ? 'var(--fg)' : 'var(--fg-soft)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 300ms ease',
                }}
                className="hero-nav-item"
              >
                {link.label}
                {link.active && (
                  <motion.span
                    aria-hidden="true"
                    variants={drawIn(0.35)}
                    initial={prefersReduced ? 'visible' : 'hidden'}
                    animate="visible"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'var(--line-strong)',
                      transformOrigin: 'left',
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          <span
            className="hero-top-divider"
            aria-hidden="true"
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: 'var(--line)',
              display: 'block',
            }}
          />

          <div
            className="hero-since-block"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 0,
            }}
          >
            <span className="label" style={{ display: 'block', textAlign: 'right' }}>
              {heroContent.topRight.line1}
            </span>
            <span className="label" style={{ display: 'block', textAlign: 'right' }}>
              {heroContent.topRight.line2}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── SPLIT HERO ROW (Text Left, Cards Right) ────────────────────────── */}
      <div
        className="hero-split-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5% 3.5% 0',
          maxWidth: '1620px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          gap: '2.5rem',
          flexShrink: 0,
          zIndex: 5,
        }}
      >
        {/* ── Left Column: Headlines & Editorial Copy ── */}
        <div
          className="hero-text-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '520px',
            flexShrink: 0,
          }}
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp(0.15)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            className="hero-eyebrow"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 400,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: 'var(--fg-soft)',
              marginBottom: '0.75rem',
              display: 'block',
            }}
          >
            {heroContent.eyebrow}
          </motion.span>

          {/* Main H1 Headline */}
          <motion.h1
            id="hero-headline"
            variants={fadeUp(0.2, 12)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            className="hero-title"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
              fontWeight: 500,
              fontSize: 'clamp(2.35rem, 3.8vw, 4.4rem)',
              letterSpacing: '0.015em',
              lineHeight: 1.02,
              color: 'var(--fg)',
              textTransform: 'uppercase',
              margin: '0 0 1.15rem 0',
            }}
          >
            {heroContent.headlineLine1}
            <br />
            {heroContent.headlineLine2}
          </motion.h1>

          {/* Category Tags */}
          <motion.div
            variants={fadeUp(0.28)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            className="hero-tags"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 400,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--fg-soft)',
              marginBottom: '1rem',
            }}
          >
            {heroContent.tags.map((tag, idx) => (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}>
                <span>{tag}</span>
                {idx < heroContent.tags.length - 1 && (
                  <span style={{ color: 'var(--line-strong)', opacity: 0.4 }} aria-hidden="true">
                    /
                  </span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeUp(0.35)}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate="visible"
            className="hero-description"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.75rem, 0.88vw, 0.875rem)',
              lineHeight: 1.65,
              color: 'var(--fg-soft)',
            }}
          >
            <p style={{ margin: 0 }}>{heroContent.description1}</p>
            <p style={{ margin: 0 }}>{heroContent.description2}</p>
          </motion.div>
        </div>

        {/* ── Right Column: Project Thumbnail Cards (hidden on mobile) ── */}
        <div
          className="hero-cards-col"
          ref={cardsParallaxRef}
          style={{
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          <ul
            role="list"
            className="hero-cards-list"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {heroCards.map((card, i) => (
              <motion.li
                key={card.id}
                variants={fadeUp(0.4 + i * 0.08, 10, 0.98)}
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
        className="hero-villa-area"
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
                background: 'radial-gradient(ellipse at center, var(--c-line) 0%, transparent 70%)',
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
                background: 'linear-gradient(to top, color-mix(in srgb, var(--c-ground) 60%, transparent) 0%, transparent 100%)',
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
                  backgroundColor: 'var(--line-strong)',
                  transformOrigin: 'left',
                }}
              />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'var(--fg)',
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
                  backgroundColor: 'var(--line-strong)',
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
                color: 'var(--fg-soft)',
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
        .hero-nav-item:hover {
          color: var(--fg) !important;
        }

        /* Large desktop / laptop scaling */
        @media (max-width: 1280px) {
          .hero-nav-links {
            gap: 1rem !important;
          }
        }

        /* Medium tablet / compact laptop */
        @media (max-width: 1140px) {
          .hero-nav-links,
          .hero-top-divider {
            display: none !important;
          }
          .hero-split-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.75rem !important;
          }
          .hero-text-col {
            align-items: center !important;
            text-align: center !important;
            max-width: 680px !important;
          }
        }

        /* Mobile (<768px):
           1. Top row in hero hidden (sticky Navbar serves as header with logo & hamburger).
           2. 4 project pictures disappear completely.
           3. Text is made bigger and placed down a little with generous top clearance.
           4. Villa sits right beneath the text. */
        @media (max-width: 767px) {
          .hero-top-row {
            display: none !important;
          }
          .hero-cards-col {
            display: none !important;
          }
          .hero-split-row {
            padding: calc(var(--nav-h, 64px) + 2.25rem) 1.5rem 0 !important;
            gap: 1.5rem !important;
          }
          .hero-text-col {
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .hero-eyebrow {
            font-size: 0.75rem !important;
            letter-spacing: 0.35em !important;
            margin-bottom: 0.85rem !important;
          }
          .hero-title {
            font-size: clamp(2.65rem, 9.8vw, 3.6rem) !important;
            line-height: 1.04 !important;
            letter-spacing: 0.015em !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-tags {
            font-size: 0.75rem !important;
            letter-spacing: 0.22em !important;
            margin-bottom: 1.15rem !important;
            flex-wrap: wrap !important;
            gap: 0.6rem !important;
          }
          .hero-description {
            font-size: clamp(0.9375rem, 3.2vw, 1.05rem) !important;
            line-height: 1.65 !important;
          }
          .hero-villa-area {
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
