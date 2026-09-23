import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../ui/Logo'
import { navLinks } from '../../data/content'
import { useSmoothScroll } from '../ui/SmoothScroll'

/**
 * Navbar — hidden at the top of the hero, slides in with backdrop blur once
 * user scrolls past the hero. Fully keyboard-accessible with mobile overlay.
 */
export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { lenis } = useSmoothScroll()

  // Show navbar after scrolling ~80px
  useEffect(() => {
    const threshold = 80
    const onScroll = () => setVisible(window.scrollY > threshold)
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

  // Keyboard visibility — always show if focused (Tab navigation)
  const handleFocus = () => setVisible(true)

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

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <motion.header
        role="banner"
        onFocus={handleFocus}
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'color-mix(in srgb, var(--c-ground) 85%, transparent)',
          borderBottom: '1px solid var(--c-line)',
        }}
      >
        <nav
          aria-label="Main navigation"
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
          <a href="#" aria-label="NOVA Atelier — home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Logo compact style={{ width: 32, height: 32 }} />
            <span style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.875rem',
              letterSpacing: '0.25em',
              color: 'var(--c-ink)',
              textTransform: 'uppercase',
            }}>
              Nova Atelier
            </span>
          </a>

          {/* Desktop links */}
          <ul
            role="list"
            style={{
              display: 'flex',
              gap: '2.5rem',
              listStyle: 'none',
              alignItems: 'center',
            }}
            className="hidden md:flex"
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

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            className="md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'var(--c-ink)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '18px',
                height: '1px',
                background: 'var(--c-ink)',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'var(--c-ink)',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.5rem',
                  fontWeight: 500,
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.6875rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
              }}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
