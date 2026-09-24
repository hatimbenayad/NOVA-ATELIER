import { useEffect, useRef, useState } from 'react'
import type { HeroCard as HeroCardType } from '../../data/content'

interface HeroCardProps {
  card: HeroCardType
  index: number
}

/**
 * Individual hero card — renders as a <figure>, NOT an <li> (the parent
 * motion.li in Hero.tsx provides the list item semantics).
 */
export default function HeroCard({ card, index }: HeroCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true)
    }
  }, [])

  // Split label into 2 lines matching the reference screenshot:
  // "Residential" / "Architecture →"
  // "Hospitality" / "Spaces →"
  // "Interior" / "Design →"
  // "Landscape &" / "Gardens →"
  const parts = card.label.split(' ')
  let line1 = card.label
  let line2 = ''
  if (card.label.includes('&')) {
    line1 = `${parts[0]} &`
    line2 = parts.slice(2).join(' ')
  } else if (parts.length > 1) {
    line1 = parts[0]
    line2 = parts.slice(1).join(' ')
  }

  return (
    <figure
      style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
      className={`hero-card-group hero-card-group-${index}`}
    >
      {/* ── Card image container ── */}
      <div
        style={{
          width: 'clamp(122px, 9.2vw, 155px)',
          aspectRatio: '16/11',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          transition: 'transform 500ms ease, box-shadow 500ms ease',
          flexShrink: 0,
          background: 'var(--c-stone)',
          position: 'relative',
        }}
        className="hero-card-wrap"
      >
        <img
          ref={imgRef}
          src={card.imageSrc}
          alt={card.alt}
          width={180}
          height={124}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            transition: 'transform 500ms ease, opacity 0.4s ease',
            opacity: imgLoaded ? 1 : 0,
          }}
          className="hero-card-img"
        />
      </div>

      {/* ── Caption ── */}
      <figcaption
        style={{
          marginTop: '8px',
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.5625rem',
          fontWeight: 400,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--fg-soft)',
          lineHeight: 1.35,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '2px',
          textAlign: 'left',
          transition: 'color 500ms ease',
        }}
        className="hero-card-caption"
      >
        <span>{line1}</span>
        {line2 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <span>{line2}</span>
            <span
              className="hero-card-arrow"
              aria-hidden="true"
              style={{
                fontSize: '0.75rem',
                lineHeight: 1,
                flexShrink: 0,
                transition: 'transform 300ms ease',
              }}
            >
              →
            </span>
          </div>
        ) : (
          <span
            className="hero-card-arrow"
            aria-hidden="true"
            style={{
              fontSize: '0.75rem',
              lineHeight: 1,
              alignSelf: 'flex-end',
            }}
          >
            →
          </span>
        )}
      </figcaption>

      <style>{`
        .hero-card-group:hover .hero-card-wrap {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }
        .hero-card-group:hover .hero-card-img {
          transform: scale(1.05);
        }
        .hero-card-group:hover .hero-card-caption {
          color: var(--fg);
        }
        .hero-card-group:hover .hero-card-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </figure>
  )
}
