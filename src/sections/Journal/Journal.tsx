import Reveal from '../../components/ui/Reveal'
import Button from '../../components/ui/Button'
import MagneticButton from '../../components/ui/MagneticButton'
import { journalContent, journalPosts } from '../../data/content'

export default function Journal() {
  return (
    <section
      id="journal"
      aria-labelledby="journal-headline"
      style={{
        backgroundColor: 'var(--color-bg-edge, #E6E6E5)',
      }}
      className="section-padding"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3.5%' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <Reveal>
              <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>
                {journalContent.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="journal-headline"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: 'clamp(1.875rem, 3vw, 3rem)',
                  lineHeight: 1.1,
                  color: 'var(--color-ink)',
                }}
              >
                {journalContent.headline}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <MagneticButton>
              <Button variant="text" as="a" href="#">
                {journalContent.cta} →
              </Button>
            </MagneticButton>
          </Reveal>
        </div>

        {/* Posts grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
          }}
        >
          {journalPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <article aria-label={post.title}>
                <a
                  href="#"
                  style={{ textDecoration: 'none', display: 'block' }}
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: '3/2',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, hsl(${35 + i * 22}, 7%, 78%) 0%, hsl(${35 + i * 22}, 5%, 70%) 100%)`,
                      marginBottom: '1.5rem',
                    }}
                  >
                    <img
                      src={post.imageSrc}
                      alt={post.alt}
                      width={480}
                      height={320}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 500ms ease',
                      }}
                      className="journal-img"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                    <span
                      className="label"
                      style={{ color: 'var(--color-ink-soft)', fontSize: '0.5625rem', opacity: 0.6 }}
                    >
                      {post.date}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-hairline)',
                        flexShrink: 0,
                      }}
                    />
                    <span className="label" style={{ color: 'var(--color-ink-soft)', fontSize: '0.5625rem' }}>
                      {post.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: '1.375rem',
                      lineHeight: 1.25,
                      color: 'var(--color-ink)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.8125rem',
                      lineHeight: 1.7,
                      color: 'var(--color-ink-soft)',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .journal-img:hover { transform: scale(1.04); }
      `}</style>
    </section>
  )
}
