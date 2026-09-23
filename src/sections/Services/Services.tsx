import { useState, useRef, useEffect, useCallback } from 'react'
import { servicesContent } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Services.css'

export default function Services() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

  // Desktop active service index (default 0, never reset on pointerleave)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [zIndices, setZIndices] = useState<number[]>([1, 0, 0, 0])
  const zCounter = useRef(2)

  // Mobile accordion state (first open by default)
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number>(0)

  // Entrance trigger via IntersectionObserver
  useEffect(() => {
    if (prefersReduced) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReduced])

  // Desktop selection handler
  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return
      zCounter.current += 1
      const newZ = [...zIndices]
      newZ[index] = zCounter.current
      setZIndices(newZ)
      setPrevIndex(activeIndex)
      setActiveIndex(index)
    },
    [activeIndex, zIndices]
  )

  // Mobile tap accordion handler
  const handleMobileToggle = useCallback((index: number) => {
    setMobileOpenIndex((current) => (current === index ? index : index))
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className={`services-section surface-ground ${hasEntered ? 'services-entered' : ''}`}
    >
      {/* Visually hidden heading for accessibility */}
      <h2 id="services-heading" className="sr-only">
        Our services
      </h2>

      {/* ─── Desktop & Tablet Layout (>= 768px) ─────────────────────────── */}
      <div className="services-container">
        {/* Left Column: Interactive List (cols 1-7) */}
        <div className="services-left">
          <span className="services-tag">{servicesContent.tag}</span>

          <ul className="services-list" role="list">
            {servicesContent.items.map((item, i) => {
              const isActive = i === activeIndex
              const numStr = String(i + 1).padStart(2, '0')

              return (
                <li
                  key={item.slug}
                  className={`services-row ${isActive ? 'is-active' : ''}`}
                  style={{ '--row-index': i } as React.CSSProperties}
                  onPointerEnter={() => handleSelect(i)}
                >
                  <a
                    href={item.href || '#contact'}
                    className="services-row-link"
                    onFocus={() => handleSelect(i)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {/* Number */}
                    <span className="services-row-num">{numStr}</span>

                    {/* Body: Title with Entrance Mask + Descriptor */}
                    <div className="services-row-body">
                      <div className="services-title-mask">
                        <div
                          className="services-title-entrance"
                          style={{
                            transitionDelay: `${i * 80}ms`,
                          }}
                        >
                          <span className="services-title">{item.title}</span>
                        </div>
                      </div>

                      <span className="services-descriptor">
                        {item.descriptor}
                      </span>
                    </div>

                    {/* Arrow */}
                    <span className="services-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>

                  {/* 1px bottom hairline */}
                  <div
                    className="services-hairline"
                    style={{
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right Column: Large Image Panel (cols 8-12) */}
        <div className="services-right" aria-hidden="true">
          {servicesContent.items.map((item, i) => {
            const isActive = i === activeIndex
            const isPrev = i === prevIndex
            const isBase = i === 0 && prevIndex === null && activeIndex === 0

            return (
              <div
                key={item.slug}
                className={`services-img-layer ${isActive ? 'is-active' : ''} ${
                  isPrev ? 'is-prev' : ''
                } ${isBase ? 'is-base' : ''}`}
                style={{ zIndex: zIndices[i] }}
              >
                <img
                  src={item.image.src}
                  alt=""
                  width={item.image.width}
                  height={item.image.height}
                  decoding="async"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── Mobile Accordion (< 768px) ─────────────────────────────────── */}
      <div className="services-mobile-accordion">
        <span className="services-tag">{servicesContent.tag}</span>

        {servicesContent.items.map((item, i) => {
          const isOpen = i === mobileOpenIndex
          const numStr = String(i + 1).padStart(2, '0')

          return (
            <div
              key={`mobile-${item.slug}`}
              className={`services-accordion-row ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                id={`services-mobile-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`services-mobile-panel-${i}`}
                className="services-accordion-btn"
                onClick={() => handleMobileToggle(i)}
              >
                <span className="services-row-num">{numStr}</span>
                <span className="services-title">{item.title}</span>
                <span className="services-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>

              {/* Accordion panel with 0fr -> 1fr transition */}
              <div
                id={`services-mobile-panel-${i}`}
                role="region"
                aria-labelledby={`services-mobile-btn-${i}`}
                className="services-accordion-collapse"
              >
                <div className="services-accordion-inner">
                  <div className="services-accordion-media">
                    <div className="services-accordion-img-box">
                      <img
                        src={item.image.src}
                        alt=""
                        width={item.image.width}
                        height={item.image.height}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <p className="services-accordion-desc">{item.descriptor}</p>
                  </div>
                </div>
              </div>

              {/* Hairline at bottom */}
              <div
                className="services-hairline"
                style={{ transform: 'scaleX(1)' }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
