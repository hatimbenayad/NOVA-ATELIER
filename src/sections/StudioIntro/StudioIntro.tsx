import Reveal from '../../components/ui/Reveal'
import Button from '../../components/ui/Button'
import MagneticButton from '../../components/ui/MagneticButton'
import { studioContent } from '../../data/content'

export default function StudioIntro() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-headline"
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="section-padding"
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 3.5%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
        className="studio-grid"
      >
        {/* Left — text */}
        <div>
          <Reveal>
            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>
              {studioContent.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="studio-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(1.875rem, 3vw, 3rem)',
                lineHeight: 1.1,
                color: 'var(--color-ink)',
                marginBottom: '2.5rem',
                whiteSpace: 'pre-line',
              }}
            >
              {studioContent.headline}
            </h2>
          </Reveal>

          {studioContent.body.map((para, i) => (
            <Reveal key={i} delay={0.12 + i * 0.07}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.9375rem',
                  lineHeight: 1.8,
                  color: 'var(--color-ink-soft)',
                  marginBottom: '1.25rem',
                }}
              >
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.35}>
            <MagneticButton className="mt-4">
              <Button variant="text" as="a" href="#contact">
                {studioContent.cta} →
              </Button>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Right — studio image placeholder */}
        <Reveal delay={0.2}>
          <div
            style={{
              aspectRatio: '4/5',
              borderRadius: '6px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #D8D5CF 0%, #C5C2BB 100%)',
              position: 'relative',
            }}
          >
            <img
              src={studioContent.imageSrc}
              alt={studioContent.imageAlt}
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            {/* Placeholder label */}
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
                  color: 'rgba(14,14,14,0.22)',
                }}
              >
                Studio
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .studio-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
