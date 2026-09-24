import Logo from '../ui/Logo'
import { footerContent, navLinks } from '../../data/content'

export default function Footer() {
  return (
    <footer
      className="surface-dark footer-root"
      style={{
        borderTop: '1px solid var(--line)',
      }}
      aria-label="Site footer"
    >
      <div className="footer-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top section */}
        <div className="footer-top-row">
          {/* Left / Column 1 — Navigation */}
          <nav aria-label="Footer navigation" className="footer-nav-col">
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
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
                      display: 'inline-block',
                    }}
                    className="footer-link"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-soft)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Center / Top on Mobile — Logo & Tagline */}
          <div className="footer-logo-col" style={{ textAlign: 'center' }}>
            <Logo color="currentColor" />
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.25em',
                color: 'var(--fg-soft)',
                marginTop: '1rem',
                textTransform: 'uppercase',
                lineHeight: 1.5,
              }}
            >
              {footerContent.tagline}
            </p>
          </div>

          {/* Right / Column 2 — Social links */}
          <div className="footer-social-col">
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
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
                      display: 'inline-block',
                    }}
                    className="footer-link"
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
        <div className="footer-bottom-row">
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6875rem',
              letterSpacing: '0.15em',
              color: 'var(--fg-soft)',
              margin: 0,
            }}
          >
            {footerContent.copyright}
          </p>
          <ul role="list" className="footer-legal-list" style={{ listStyle: 'none', display: 'flex', gap: '2rem', padding: 0, margin: 0 }}>
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

      <style>{`
        .footer-root {
          padding: 5rem 2rem 3rem;
        }
        .footer-top-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          gap: 3rem;
          margin-bottom: 4rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--line);
        }
        .footer-social-col {
          text-align: right;
        }
        .footer-social-col ul {
          align-items: flex-end;
        }
        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* ── Tablet / small screens (< 768px) ──────────────────────────────── */
        @media (max-width: 767px) {
          .footer-root {
            padding: 3.5rem 1.5rem 2.5rem;
          }
          .footer-top-row {
            /* Stack: logo on top, then nav + social side by side */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
            gap: 2rem;
            margin-bottom: 2.5rem;
            padding-bottom: 2.5rem;
          }
          .footer-logo-col {
            order: 1;
            width: 100%;
            margin-bottom: 0.25rem;
          }
          .footer-nav-col {
            order: 2;
            width: auto;
            flex: 1 1 40%;
            text-align: left;
          }
          .footer-social-col {
            order: 3;
            width: auto;
            flex: 1 1 40%;
            text-align: right;
          }
          .footer-social-col ul {
            align-items: flex-end;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.25rem;
          }
          .footer-legal-list {
            gap: 1.25rem;
          }
        }

        /* ── Very narrow phones (< 400px) ──────────────────────────────────── */
        @media (max-width: 399px) {
          .footer-root {
            padding: 3rem 1rem 2rem;
          }
          .footer-top-row {
            /* Stack everything vertically on very narrow screens */
            flex-direction: column;
            align-items: center;
            gap: 1.75rem;
          }
          .footer-logo-col {
            width: 100%;
          }
          .footer-nav-col,
          .footer-social-col {
            width: 100%;
            flex: none;
            text-align: center;
          }
          .footer-social-col {
            text-align: center;
          }
          .footer-social-col ul {
            align-items: center;
          }
          .footer-legal-list {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </footer>
  )
}
