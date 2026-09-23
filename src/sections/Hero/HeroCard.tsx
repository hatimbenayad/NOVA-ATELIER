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

  return (
    <figure
      style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
      className={`hero-card-group hero-card-group-${index}`}
    >
      {/* ── Card image container ── */}
      <div
        style={{
          width: 'clamp(110px, 8.5vw, 138px)',
          aspectRatio: '3/2',
          borderRadius: '12px',
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
          width={150}
          height={100}
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
            objectPosition: index === 2 ? 'center 75%' : index === 3 ? 'right bottom' : 'center center',
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
          marginTop: '7px',
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.5625rem',
          fontWeight: 400,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--fg-soft)',
          lineHeight: 1.35,
          maxWidth: 'clamp(110px, 8.5vw, 138px)',
          textAlign: 'left',
          transition: 'color 500ms ease',
        }}
        className="hero-card-caption"
      >
        {card.label}
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
      `}</style>
    </figure>
  )
}
