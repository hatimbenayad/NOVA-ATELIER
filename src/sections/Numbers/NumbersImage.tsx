import { memo } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { NUMBERS_TIMELINE, easeOutCubic } from './numbers.config'
import type { ImageAsset } from '../../data/content'

interface NumbersImageProps {
  image: ImageAsset
  index: number
  progress: MotionValue<number>
}

function NumbersImageComponent({ image, index, progress }: NumbersImageProps) {
  const rowStart = NUMBERS_TIMELINE.rows.start + index * NUMBERS_TIMELINE.rows.stagger
  const revealEnd = rowStart + 0.6 * NUMBERS_TIMELINE.rows.duration

  // Reveal from left to right: inset(0 100% 0 0) -> inset(0 0% 0 0)
  const insetRight = useTransform(
    progress,
    [rowStart, revealEnd],
    [100, 0],
    { ease: easeOutCubic }
  )
  const clipPath = useTransform(insetRight, (v) => `inset(0 ${v}% 0 0)`)

  // Inner image scale from 1.12 to 1.0
  const scale = useTransform(
    progress,
    [rowStart, revealEnd],
    [1.12, 1.0],
    { ease: easeOutCubic }
  )

  return (
    <motion.div
      className="numbers-photo-frame"
      style={{ clipPath }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="numbers-photo-img"
        style={{ scale }}
      />
    </motion.div>
  )
}

export const NumbersImage = memo(NumbersImageComponent)
export default NumbersImage
