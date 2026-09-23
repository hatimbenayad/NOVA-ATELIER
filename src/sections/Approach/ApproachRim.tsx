import { memo } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { easeOutCubic } from './approach.config'
import type { ApproachContent } from '../../data/content'

interface RimTextItemProps {
  text: string
  startOffset: string
  index: number
  active: MotionValue<number>
}

function RimTextItemComponent({ text, startOffset, index, active }: RimTextItemProps) {
  // Active item opacity 1.0, otherwise 0.22, smoothly interpolated
  const opacity = useTransform(active, (v) => {
    const dist = Math.abs(v - index)
    return 0.22 + 0.78 * Math.max(0, 1 - dist)
  })

  return (
    <motion.text
      className="approach-rim-text"
      style={{ opacity }}
    >
      <textPath href="#approach-ring" startOffset={startOffset} textAnchor="middle">
        {text}
      </textPath>
    </motion.text>
  )
}

const RimTextItem = memo(RimTextItemComponent)

interface ApproachRimProps {
  content: ApproachContent
  active: MotionValue<number>
  enter: MotionValue<number>
}

function ApproachRimComponent({ content, active, enter }: ApproachRimProps) {
  // Ring entry opacity 0 -> 1 over enter 0.55 -> 1.0
  const ringOpacity = useTransform(enter, [0.55, 1], [0, 1])

  // Wheel rotation: -(active * 72) degrees
  const wheelRotate = useTransform(active, (a) => -(a * 72))

  // Entry spin: (1 - easeOutCubic(enter)) * 28 degrees
  const entrySpin = useTransform(enter, (e) => (1 - easeOutCubic(e)) * 28)

  // Combined rotation
  const rotate = useTransform([wheelRotate, entrySpin], ([w, s]: number[]) => w + s)

  // 5 Rim items: intro at 50%, steps at 70%, 90%, 10%, 30%
  const items = [
    { text: content.intro.ringTitle.toUpperCase(), startOffset: '50%' },
    { text: `${content.steps[0].number} ${content.steps[0].title.toUpperCase()}`, startOffset: '70%' },
    { text: `${content.steps[1].number} ${content.steps[1].title.toUpperCase()}`, startOffset: '90%' },
    { text: `${content.steps[2].number} ${content.steps[2].title.toUpperCase()}`, startOffset: '10%' },
    { text: `${content.steps[3].number} ${content.steps[3].title.toUpperCase()}`, startOffset: '30%' },
  ]

  return (
    <motion.svg
      aria-hidden="true"
      className="approach-rim-svg"
      viewBox="0 0 2000 2000"
      style={{
        opacity: ringOpacity,
        rotate,
      }}
    >
      <defs>
        {/*
          Circular path of radius 850 centered at (1000, 1000).
          Starts at BOTTOM (1000, 1850) and runs clockwise through left, top, right.
          Top of circle is at exactly 50% (length ≈ 5340.7, top is at 1000, 150).
        */}
        <path
          id="approach-ring"
          d="M 1000 1850 A 850 850 0 1 1 1000 150 A 850 850 0 1 1 1000 1850"
          fill="none"
          stroke="none"
        />
      </defs>

      {items.map((item, i) => (
        <RimTextItem
          key={item.text}
          text={item.text}
          startOffset={item.startOffset}
          index={i}
          active={active}
        />
      ))}
    </motion.svg>
  )
}

export const ApproachRim = memo(ApproachRimComponent)
export default ApproachRim
