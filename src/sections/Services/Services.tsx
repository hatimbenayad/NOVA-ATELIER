import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../../components/ui/Reveal'
import { servicesContent, services } from '../../data/content'

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      aria-labelledby="services-headline"
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="section-padding"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3.5%' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <Reveal>
            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>
              {servicesContent.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="services-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(1.875rem, 3vw, 3rem)',
                lineHeight: 1.1,
                color: 'var(--color-ink)',
                whiteSpace: 'pre-line',
                maxWidth: '22ch',
              }}
            >
              {servicesContent.headline}
            </h2>
          </Reveal>
        </div>

        {/* Service list with hover-reveal image */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            alignItems: 'start',
          }}
          className="services-grid"
        >
          {/* Service list */}
          <ul role="list" style={{ listStyle: 'none', borderTop: '1px solid var(--color-hairline)' }}>
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.06}>
                <li
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(service.id)}
                  onBlur={() => setHoveredId(null)}
                  tabIndex={0}
                  style={{
                    padding: '2.5rem 0',
                    borderBottom: '1px solid var(--color-hairline)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    paddingLeft: hoveredId === service.id ? '1.5rem' : '0',
                    transitionProperty: 'padding-left',
                    transitionDuration: '0.4s',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 500,
                          fontSize: 'clamp(1.25rem, 1.8vw, 1.875rem)',
                          color: hoveredId === service.id ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                          transition: 'color 0.3s ease',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: '0.8125rem',
                          lineHeight: 1.7,
                          color: 'var(--color-ink-soft)',
                          maxWidth: '38ch',
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '0.6875rem',
                        letterSpacing: '0.2em',
                        color: 'var(--color-ink-soft)',
                        opacity: 0.4,
                        flexShrink: 0,
                        alignSelf: 'center',
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* Hover image reveal */}
          <div
            style={{
              position: 'sticky',
              top: '80px',
              height: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4rem',
            }}
            className="services-image-panel"
          >
            <AnimatePresence mode="wait">
              {hoveredId && (() => {
                const service = services.find((s) => s.id === hoveredId)
                if (!service) return null
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '100%',
                      height: '480px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #D2CFC9 0%, #C1BEB8 100%)',
                      position: 'absolute',
                    }}
                  >
                    <img
                      src={service.imageSrc}
                      alt={service.alt}
                      width={560}
                      height={480}
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
                          color: 'rgba(14,14,14,0.2)',
                        }}
                      >
                        {service.title}
                      </span>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>

            {/* Default state: subtle box */}
            {!hoveredId && (
              <div
                style={{
                  width: '100%',
                  height: '480px',
                  borderRadius: '6px',
                  border: '1px dashed var(--color-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.5625rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'rgba(14,14,14,0.15)',
                  }}
                >
                  Hover to reveal
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-image-panel { display: none !important; }
        }
      `}</style>
    </section>
  )
}
