import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../../components/ui/Reveal'
import Button from '../../components/ui/Button'
import MagneticButton from '../../components/ui/MagneticButton'
import { selectedWorkContent, projects } from '../../data/content'

/**
 * Selected Work — horizontal scrolling project gallery
 */
export default function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  return (
    <section
      id="selected-work"
      aria-labelledby="work-headline"
      style={{ backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '7rem 3.5% 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div>
          <Reveal>
            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>
              {selectedWorkContent.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="work-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                lineHeight: 1.1,
                color: 'var(--color-ink)',
                maxWidth: '20ch',
              }}
            >
              {selectedWorkContent.headline}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <MagneticButton>
            <Button variant="ghost" as="a" href="#contact">
              {selectedWorkContent.cta}
            </Button>
          </MagneticButton>
        </Reveal>
      </div>

      {/* Horizontal project strip */}
      <div ref={containerRef} style={{ paddingBottom: '6rem' }}>
        <motion.div
          ref={trackRef}
          data-lenis-prevent
          style={{ x, display: 'flex', gap: '2px', paddingLeft: '3.5%', willChange: 'transform' }}
        >
          {projects.map((project, i) => (
            <article
              key={project.id}
              aria-label={`${project.title} — ${project.category}`}
              style={{
                flexShrink: 0,
                width: 'clamp(280px, 30vw, 440px)',
                paddingRight: '2rem',
              }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, hsl(${30 + i * 18}, 8%, 80%) 0%, hsl(${30 + i * 18}, 6%, 73%) 100%)`,
                  marginBottom: '1.25rem',
                  position: 'relative',
                }}
              >
                <img
                  src={project.imageSrc}
                  alt={project.alt}
                  width={440}
                  height={550}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.5625rem',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(14,14,14,0.25)',
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div>
                <span className="label" style={{ color: 'var(--color-ink-soft)', marginBottom: '0.25rem', display: 'block' }}>
                  {project.category} · {project.year}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)',
                    color: 'var(--color-ink)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.15,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink-soft)',
                    lineHeight: 1.6,
                  }}
                >
                  {project.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.625rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-soft)',
                    marginTop: '0.75rem',
                    opacity: 0.6,
                  }}
                >
                  {project.location}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
