import { memo } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import type { ImageAsset } from '../../data/content'

interface ApproachPhotoLayerProps {
  image: ImageAsset
  index: number // 1..4
  active: MotionValue<number>
}

function ApproachPhotoLayerComponent({ image, index, active }: ApproachPhotoLayerProps) {
  // Wipe fraction: 0 when active <= index - 1, 1 when active >= index
  const wipeFraction = useTransform(active, (v) =>
    Math.min(Math.max(v - (index - 1), 0), 1)
  )

  // Vertical wipe from bottom: inset(100% 0 0 0) -> inset(0 0 0 0)
  const clipPath = useTransform(wipeFraction, (w) => `inset(${(1 - w) * 100}% 0 0 0)`)

  // Inner image scale from 1.15 down to 1.0
  const scale = useTransform(wipeFraction, (w) => 1.15 - w * 0.15)

  return (
    <motion.div
      className="approach-photo-frame"
      style={{ clipPath, zIndex: index + 1 }}
    >
      <motion.img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="approach-photo-img"
        style={{ scale }}
      />
    </motion.div>
  )
}

const ApproachPhotoLayer = memo(ApproachPhotoLayerComponent)

interface ApproachPhotosProps {
  images: ImageAsset[] // exactly 5 (intro, step 1..4)
  active: MotionValue<number>
  enter: MotionValue<number>
}

function ApproachPhotosComponent({ images, active, enter }: ApproachPhotosProps) {
  // Master entry fade: opacity 0 -> 1 during enter 0.5 -> 1.0
  const layerOpacity = useTransform(enter, [0.5, 1], [0, 1])

  const baseImage = images[0]
  const stepImages = images.slice(1) // 1..4

  return (
    <motion.div
      className="approach-photos-layer"
      style={{ opacity: layerOpacity }}
    >
      {/* Base Layer 0 (Intro): never clipped */}
      {baseImage && (
        <div className="approach-photo-frame" style={{ zIndex: 1 }}>
          <img
            src={baseImage.src}
            alt=""
            width={baseImage.width}
            height={baseImage.height}
            loading="eager"
            decoding="async"
            className="approach-photo-img"
          />
        </div>
      )}

      {/* Layers 1..4 (One per step): wipe vertically on active clock */}
      {stepImages.map((img, i) => (
        <ApproachPhotoLayer
          key={img.src + i}
          image={img}
          index={i + 1}
          active={active}
        />
      ))}
    </motion.div>
  )
}

export const ApproachPhotos = memo(ApproachPhotosComponent)
export default ApproachPhotos
