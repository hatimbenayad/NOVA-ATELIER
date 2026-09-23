import { memo } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { NUMBERS_TIMELINE, easeOutCubic } from './numbers.config'
import type { NumbersStat } from '../../data/content'

interface NumbersRowProps {
  stat: NumbersStat
  index: number
  progress: MotionValue<number>
}

function NumbersRowComponent({ stat, index, progress }: NumbersRowProps) {
  const rowStart = NUMBERS_TIMELINE.rows.start + index * NUMBERS_TIMELINE.rows.stagger
  const rowDuration = NUMBERS_TIMELINE.rows.duration

  // Sub-phase 1: Horizontal hairline & center marker (u = 0 to 0.6)
  const lineStart = rowStart
  const lineEnd = rowStart + 0.6 * rowDuration
  const scaleX = useTransform(progress, [lineStart, lineEnd], [0, 1], { ease: easeOutCubic })
  const scaleY = useTransform(progress, [lineStart, lineEnd], [0, 1], { ease: easeOutCubic })

  // Sub-phase 2: Number rises from mask (u = 0.35 to 0.85)
  const numStart = rowStart + 0.35 * rowDuration
  const numEnd = rowStart + 0.85 * rowDuration
  const numYRaw = useTransform(progress, [numStart, numEnd], [105, 0], { ease: easeOutCubic })
  const numberY = useTransform(numYRaw, (v) => `${v}%`)

  // Sub-phase 3: Label rises from mask (u = 0.42 to 0.92)
  const labelStart = rowStart + 0.42 * rowDuration
  const labelEnd = rowStart + 0.92 * rowDuration
  const labelYRaw = useTransform(progress, [labelStart, labelEnd], [105, 0], { ease: easeOutCubic })
  const labelY = useTransform(labelYRaw, (v) => `${v}%`)

  return (
    <>
      {/* Horizontal bottom row hairline (full-bleed, grows from center 50% 50%) */}
      <motion.span
        aria-hidden="true"
        className="numbers-row-line"
        style={{
          top: `calc(var(--rows-top) + var(--row-h) * ${index + 1})`,
          scaleX,
          transformOrigin: '50% 50%',
        }}
      />

      {/* Center line marker (3px wide, grows vertically from center 50% 50%) */}
      <motion.span
        aria-hidden="true"
        className="numbers-marker"
        style={{
          top: `calc(var(--rows-top) + var(--row-h) * ${index} + var(--row-h) * 0.15)`,
          height: 'calc(var(--row-h) * 0.7)',
          x: -1,
          scaleY,
          transformOrigin: '50% 50%',
        }}
      />

      {/* Row Item with Number and Label */}
      <li
        className="numbers-row-item"
        style={{
          top: `calc(var(--rows-top) + var(--row-h) * ${index})`,
        }}
      >
        <div className="numbers-row-grid">
          {/* Number rising out of overflow clip mask */}
          <span className="numbers-mask">
            <motion.span
              className="numbers-stat-val"
              style={{ y: numberY }}
            >
              {stat.value}
            </motion.span>
          </span>

          {/* Label rising out of overflow clip mask */}
          <span className="numbers-mask">
            <motion.span
              className="numbers-stat-lbl"
              style={{ y: labelY }}
            >
              {stat.label}
            </motion.span>
          </span>
        </div>
      </li>
    </>
  )
}

export const NumbersRow = memo(NumbersRowComponent)
export default NumbersRow
