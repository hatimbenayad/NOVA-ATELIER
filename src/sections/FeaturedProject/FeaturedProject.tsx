import Reveal from '../../components/ui/Reveal'
import Button from '../../components/ui/Button'
import MagneticButton from '../../components/ui/MagneticButton'
import { featuredProjectContent } from '../../data/content'

export default function FeaturedProject() {
  return (
    <section
      aria-labelledby="featured-headline"
      style={{
        backgroundColor: 'var(--c-dark)',
      }}
      className="section-padding surface-dark"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3.5%' }}>
        {/* Eyebrow */}
        <Reveal>
          <span className="label" style={{ marginBottom: '3rem', display: 'block', color: 'var(--c-paper)' }}>
            {featuredProjectContent.eyebrow}
          </span>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="featured-grid"
        >
          {/* Image */}
          <Reveal delay={0.05}>
            <div
              style={{
                aspectRatio: '4/5',
                borderRadius: '6px',
                overflow: 'hidden',
                background: 'var(--c-stone)',
                position: 'relative',
              }}
            >
              <img
                src={featuredProjectContent.imageSrc}
                alt={featuredProjectContent.imageAlt}
                width={680}
                height={850}
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
                    color: 'var(--c-line-on-dark)',
                  }}
                >
                  Featured
                </span>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div style={{ background: 'var(--c-scrim)', padding: '2rem', borderRadius: '4px' }}>
            <Reveal delay={0.1}>
              <span className="label" style={{ color: 'var(--c-paper)', marginBottom: '0.5rem', display: 'block' }}>
                {featuredProjectContent.category}
              </span>
            </Reveal>
            <Reveal delay={0.15}>
              <h2
                id="featured-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  lineHeight: 1.05,
                  color: 'var(--c-paper)',
                  marginBottom: '0.5rem',
                }}
              >
                {featuredProjectContent.title}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--c-on-dark-soft)',
                  marginBottom: '2rem',
                }}
              >
                {featuredProjectContent.location}
              </p>
            </Reveal>

            {featuredProjectContent.body.map((para, i) => (
              <Reveal key={i} delay={0.2 + i * 0.07}>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'var(--c-paper)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            {/* Project stats */}
            <Reveal delay={0.35}>
              <div
                style={{
                  display: 'flex',
                  gap: '2.5rem',
                  margin: '2.5rem 0',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--c-line-on-dark)',
                }}
              >
                {featuredProjectContent.stats.map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        fontSize: '1.625rem',
                        color: 'var(--c-paper)',
                        lineHeight: 1,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '0.5625rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--c-on-dark-soft)',
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <MagneticButton>
                <Button variant="ghost" as="a" href="#contact">
                  {featuredProjectContent.cta}
                </Button>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .featured-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
