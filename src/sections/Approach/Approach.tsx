import { useRef } from 'react'
import { useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { approachContent } from '../../data/content'
import {
  PIN_SCREENS_APPROACH,
  PROGRESS_SPRING,
  progressToActive,
} from './approach.config'
import ApproachPhotos from './ApproachPhotos'
import ApproachDome from './ApproachDome'
import ApproachRim from './ApproachRim'
import ApproachCenter from './ApproachCenter'
import './Approach.css'

export default function Approach() {
  const wrapperRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Entry scroll progress: 0 when wrapper bottom reaches screen bottom, 1 when wrapper top reaches screen top
  const { scrollYProgress: enter } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'start start'],
  })

  // Pinned scroll progress: 0 when top reaches top of viewport, 1 when pinned tail completes
  const { scrollYProgress: rawProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Light spring smoothing on pinned progress
  const smoothProgress = useSpring(rawProgress, PROGRESS_SPRING)

  // Active motion value [0..4] (0 = Intro, 1..4 = Steps) with ease-in-out moves and holds
  const active = useTransform(smoothProgress, (p) => progressToActive(p))

  // Combine all 5 images: intro + 4 steps
  const allImages = [
    approachContent.intro.image,
    ...approachContent.steps.map((s) => s.image),
  ]

  // Reduced motion: render clean static editorial grid
  if (shouldReduceMotion) {
    return (
      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="approach-reduced-motion"
      >
        <h2 id="approach-heading" className="approach-reduced-heading">
          {approachContent.intro.ringTitle}
        </h2>

        <div className="approach-reduced-grid">
          {approachContent.steps.map((step) => (
            <article key={step.number} className="approach-reduced-card">
              <img
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                loading="lazy"
                decoding="async"
                className="approach-reduced-img"
              />
              <p className="approach-reduced-num">{step.number}</p>
              <h3 className="approach-reduced-title">{step.title}</h3>
              <p className="approach-reduced-desc">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="approach"
      ref={wrapperRef}
      aria-labelledby="approach-heading"
      className="approach-wrapper"
      style={{
        height: `calc(100svh * (1 + ${PIN_SCREENS_APPROACH}))`,
      }}
    >
      {/* Visually hidden heading for screen readers */}
      <h2 id="approach-heading" className="approach-sr-only">
        {approachContent.intro.ringTitle}
      </h2>

      {/* Visually hidden step list for screen readers */}
      <ol className="approach-sr-only">
        {approachContent.steps.map((step) => (
          <li key={step.number}>
            <h3>
              {step.number} {step.title}
            </h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>

      {/* Visual Sticky Stage (Aria-hidden) */}
      <div aria-hidden="true" className="approach-stage">
        {/* Full-bleed background photos (below dome, above transparent stage) */}
        <ApproachPhotos images={allImages} active={active} enter={enter} />

        {/* The Half Dome */}
        <ApproachDome />

        {/* Rotating Rim SVG with curved text */}
        <ApproachRim content={approachContent} active={active} enter={enter} />

        {/* Center details inside dome: row at 46svh, hairline at 58-80svh, caption at 84svh */}
        <ApproachCenter
          content={approachContent}
          active={active}
          progress={smoothProgress}
        />
      </div>
    </section>
  )
}
