import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/content'
import { useSmoothScroll } from '../ui/SmoothScroll'

/**
 * Navbar — on mobile, always visible at the top with logo and hamburger button.
 * On desktop (>=768px), slides down once user scrolls past 80px.
 * Fully keyboard-accessible with mobile overlay.
 */
export default function Navbar() {
  const [scrolledPast, setScrolledPast] = useState(false)
  // Initialize isMobile synchronously so there's no flash on first render
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { lenis } = useSmoothScroll()

  // Sync isMobile before paint to avoid a flash where the navbar is hidden
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show navbar after scrolling ~80px on desktop
  useEffect(() => {
    const threshold = 80
    const onScroll = () => setScrolledPast(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pause scrolling with lenis.stop() when mobile menu is open, resume when closed
  useEffect(() => {
    if (!lenis) return
    if (menuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [menuOpen, lenis])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Trap focus inside overlay menu
  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus()
    }
  }, [menuOpen])

  const shouldBeVisible = isMobile || scrolledPast

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <motion.header
        role="banner"
        initial={false}
        animate={shouldBeVisible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="site-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          backgroundColor: 'color-mix(in srgb, var(--c-ground) 88%, transparent)',
          borderBottom: '1px solid var(--c-line)',
          // On mobile, always show regardless of scroll – override the motion value
          ...(isMobile ? { transform: 'translateY(0px)', opacity: 1 } : {}),
        }}
      >
        <nav
          aria-label="Main navigation"
          className="navbar-inner"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            aria-label="NOVA Atelier — home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <Logo compact style={{ width: 28, height: 28 }} />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '0.25em',
                color: 'var(--c-ink)',
                textTransform: 'uppercase',
              }}
            >
              Nova Atelier
            </span>
          </a>

          {/* Desktop links (hidden on mobile) */}
          <ul
            role="list"
            className="navbar-desktop-links"
            style={{
              gap: '2.5rem',
              listStyle: 'none',
              alignItems: 'center',
              padding: 0,
              margin: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.6875rem',
                    fontWeight: 400,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--c-ink-soft)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-ink-soft)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            ref={toggleRef}
            className="navbar-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--c-ink)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'var(--c-ink)',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--c-ink)',
                transition: 'transform 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="surface-ground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              backgroundColor: 'var(--c-paper)',
            }}
          >
            {/* Top bar inside menu overlay with logo and close button */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '64px',
                padding: '0 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Logo compact style={{ width: 28, height: 28 }} />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--fg)',
                  }}
                >
                  Nova Atelier
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--fg)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '1.25rem',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Links list */}
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(2rem, 7.5vw, 2.75rem)',
                    fontWeight: 500,
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom info inside overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.625rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-soft)',
                  margin: 0,
                }}
              >
                Barcelona · Madrid · Since 2012
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-desktop-links {
          display: none;
        }
        .navbar-toggle {
          display: flex !important;
        }
        @media (min-width: 768px) {
          .navbar-desktop-links {
            display: flex !important;
          }
          .navbar-toggle {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .navbar-inner {
            padding: 0 1.25rem !important;
            height: 60px !important;
          }
        }
      `}</style>
    </>
  )
}
