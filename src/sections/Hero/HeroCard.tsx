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
  const placeholderGradients = [
    'linear-gradient(145deg, #D8D5CF 0%, #C9C5BE 100%)',
    'linear-gradient(145deg, #D0CEC9 0%, #C3BFB8 100%)',
    'linear-gradient(145deg, #CDD0CA 0%, #BFC2BA 100%)',
    'linear-gradient(145deg, #CCCAC5 0%, #BEBCB7 100%)',
  ]

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
          boxShadow: '0 8px 24px -8px rgba(0,0,0,.22)',
          transition: 'transform 500ms ease, box-shadow 500ms ease',
          flexShrink: 0,
          background: placeholderGradients[index % 4],
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
          color: 'var(--color-ink-soft)',
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
          box-shadow: 0 18px 40px -12px rgba(0,0,0,.32);
        }
        .hero-card-group:hover .hero-card-img {
          transform: scale(1.05);
        }
        .hero-card-group:hover .hero-card-caption {
          color: var(--color-ink);
        }
      `}</style>
    </figure>
  )
}
