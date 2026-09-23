import Logo from '../ui/Logo'
import { footerContent, navLinks } from '../../data/content'

export default function Footer() {
  return (
    <footer
      className="surface-dark"
      style={{
        borderTop: '1px solid var(--line)',
        padding: '5rem 2rem 3rem',
      }}
      aria-label="Site footer"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'start',
            gap: '3rem',
            marginBottom: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {/* Left — nav */}
          <nav aria-label="Footer navigation">
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 400,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-soft)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-soft)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Center — logo */}
          <div style={{ textAlign: 'center' }}>
            <Logo color="currentColor" />
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.25em',
                color: 'var(--fg-soft)',
                marginTop: '1rem',
                textTransform: 'uppercase',
              }}
            >
              {footerContent.tagline}
            </p>
          </div>

          {/* Right — social */}
          <div style={{ textAlign: 'right' }}>
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
              {footerContent.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 400,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-soft)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-soft)')}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.15em',
              color: 'var(--fg-soft)',
            }}
          >
            {footerContent.copyright}
          </p>
          <ul role="list" style={{ listStyle: 'none', display: 'flex', gap: '2rem' }}>
            {footerContent.legal.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.625rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--fg-soft)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-soft)')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
