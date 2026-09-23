import Reveal from '../../components/ui/Reveal'
import { approachContent, approachSteps } from '../../data/content'

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-headline"
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="section-padding"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3.5%' }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <Reveal>
            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>
              {approachContent.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="approach-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(1.875rem, 3vw, 3rem)',
                lineHeight: 1.1,
                color: 'var(--color-ink)',
                maxWidth: '20ch',
              }}
            >
              {approachContent.headline}
            </h2>
          </Reveal>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
          }}
        >
          {approachSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <article aria-label={`Step ${step.number}: ${step.title}`}>
                {/* Step number */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: '4rem',
                    lineHeight: 1,
                    color: 'var(--color-ink)',
                    opacity: 0.08,
                    marginBottom: '1.5rem',
                  }}
                >
                  {step.number}
                </p>

                {/* Hairline */}
                <div
                  aria-hidden="true"
                  style={{
                    width: '28px',
                    height: '1px',
                    backgroundColor: 'var(--color-hairline)',
                    marginBottom: '1.5rem',
                  }}
                />

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    color: 'var(--color-ink)',
                    marginBottom: '1rem',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
