import Reveal from '../../components/ui/Reveal'
import Button from '../../components/ui/Button'
import MagneticButton from '../../components/ui/MagneticButton'
import { contactContent } from '../../data/content'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-headline"
      style={{ backgroundColor: 'var(--color-bg)' }}
      className="section-padding"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3.5%' }}>
        {/* Hero-style CTA block */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '6rem',
            borderTop: '1px solid var(--color-hairline)',
            borderBottom: '1px solid var(--color-hairline)',
            padding: '6rem 0',
          }}
        >
          <Reveal>
            <span className="label" style={{ marginBottom: '1.5rem', display: 'block' }}>
              {contactContent.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              id="contact-headline"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                lineHeight: 1.05,
                color: 'var(--color-ink)',
                maxWidth: '22ch',
                margin: '0 auto 1.5rem',
              }}
            >
              {contactContent.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.9375rem',
                lineHeight: 1.8,
                color: 'var(--color-ink-soft)',
                maxWidth: '42ch',
                margin: '0 auto 3rem',
              }}
            >
              {contactContent.body}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <MagneticButton>
              <Button variant="filled" as="a" href={`mailto:${contactContent.offices[0].email}`}>
                {contactContent.cta}
              </Button>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Office details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
          }}
        >
          {contactContent.offices.map((office, i) => (
            <Reveal key={office.city} delay={i * 0.08}>
              <address style={{ fontStyle: 'normal' }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    color: 'var(--color-ink)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {office.city}
                </h3>

                {/* Hairline */}
                <div
                  aria-hidden="true"
                  style={{
                    width: '28px',
                    height: '1px',
                    backgroundColor: 'var(--color-hairline)',
                    marginBottom: '1.25rem',
                  }}
                />

                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: 'var(--color-ink-soft)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {office.address}
                </p>
                <p style={{ marginBottom: '0.25rem' }}>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.875rem',
                      color: 'var(--color-ink-soft)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ink-soft)')}
                  >
                    {office.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.875rem',
                      color: 'var(--color-ink-soft)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ink-soft)')}
                  >
                    {office.email}
                  </a>
                </p>
              </address>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
