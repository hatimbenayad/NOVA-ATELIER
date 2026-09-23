import Reveal from '../../components/ui/Reveal'
import { numbersContent, stats } from '../../data/content'

export default function Numbers() {
  return (
    <section
      aria-labelledby="numbers-headline"
      style={{
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-bg)',
      }}
      className="section-padding"
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 3.5%',
        }}
      >
        {/* Eyebrow */}
        <Reveal>
          <span
            className="label"
            style={{ color: 'rgba(238,238,238,0.5)', marginBottom: '4rem', display: 'block' }}
          >
            {numbersContent.eyebrow}
          </span>
        </Reveal>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4rem',
            marginBottom: '6rem',
          }}
        >
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                    lineHeight: 1,
                    color: 'var(--color-bg)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.6875rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(238,238,238,0.45)',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Philosophy quote */}
        <div
          style={{
            borderTop: '1px solid rgba(238,238,238,0.12)',
            paddingTop: '4rem',
          }}
        >
          <Reveal>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 2.8vw, 2.75rem)',
                fontStyle: 'italic',
                lineHeight: 1.35,
                color: 'var(--color-bg)',
                maxWidth: '28ch',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              {numbersContent.philosophy}
            </blockquote>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(238,238,238,0.4)',
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              {numbersContent.philosophyAttribution}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
