import { memo } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { LogoMark } from '../../components/ui/Logo'
import type { ApproachContent } from '../../data/content'

// ─── Row Item (46svh) ────────────────────────────────────────────────────────

interface CenterRowItemProps {
  index: number
  active: MotionValue<number>
  leftLabel: string
  rightLabel: string
  numeral?: string
  isIntro?: boolean
}

function CenterRowItemComponent({
  index,
  active,
  leftLabel,
  rightLabel,
  numeral,
  isIntro = false,
}: CenterRowItemProps) {
  // Cross-fade using d = active - index
  const opacity = useTransform(active, (v) => {
    const d = v - index
    return Math.max(0, 1 - Math.min(1, Math.abs(d) * 2.2))
  })

  // Outgoing rises out (-100%), incoming rises in (starts +100% and moves to 0)
  const y = useTransform(active, (v) => {
    const d = v - index
    return `${-d * 100}%`
  })

  return (
    <motion.div
      className="approach-row-item"
      style={{
        opacity,
        pointerEvents: 'none',
      }}
    >
      <span className="approach-side-label">{leftLabel}</span>

      {isIntro ? (
        <span className="approach-numeral-mask" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <motion.span style={{ y, display: 'inline-flex', color: 'var(--fg)' }}>
            <LogoMark size={56} color="currentColor" />
          </motion.span>
        </span>
      ) : (
        <span className="approach-numeral-mask">
          <motion.span className="approach-numeral-text" style={{ y }}>
            {numeral}
          </motion.span>
        </span>
      )}

      <span className="approach-side-label">{rightLabel}</span>
    </motion.div>
  )
}

const CenterRowItem = memo(CenterRowItemComponent)

// ─── Caption Item (84svh) ────────────────────────────────────────────────────

interface CenterCaptionItemProps {
  index: number
  active: MotionValue<number>
  text: string
}

function CenterCaptionItemComponent({ index, active, text }: CenterCaptionItemProps) {
  const opacity = useTransform(active, (v) => {
    const d = v - index
    return Math.max(0, 1 - Math.min(1, Math.abs(d) * 2.2))
  })

  const y = useTransform(active, (v) => {
    const d = v - index
    return -d * 10
  })

  return (
    <motion.p
      className="approach-caption-item"
      style={{
        opacity,
        y,
        pointerEvents: 'none',
      }}
    >
      {text}
    </motion.p>
  )
}

const CenterCaptionItem = memo(CenterCaptionItemComponent)

// ─── Vertical Hairline Progress Indicator (58svh to 80svh) ───────────────────

interface CenterHairlineProps {
  progress: MotionValue<number>
}

function CenterHairlineComponent({ progress }: CenterHairlineProps) {
  // Scale fill from top 0 -> 1 as overall section progress advances
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <div aria-hidden="true" className="approach-hairline">
      <motion.div
        className="approach-hairline-fill"
        style={{
          scaleY,
          transformOrigin: 'top center',
        }}
      />
    </div>
  )
}

const CenterHairline = memo(CenterHairlineComponent)

// ─── Main Center Details Component ───────────────────────────────────────────

interface ApproachCenterProps {
  content: ApproachContent
  active: MotionValue<number>
  progress: MotionValue<number>
}

function ApproachCenterComponent({ content, active, progress }: ApproachCenterProps) {
  const allCaptions = [
    content.intro.caption,
    content.steps[0].description,
    content.steps[1].description,
    content.steps[2].description,
    content.steps[3].description,
  ]

  return (
    <div aria-hidden="true" className="approach-center-container">
      {/* Three-part row at 46svh */}
      <div className="approach-row-wrapper">
        {/* Item 0: Intro (Barcelona [Emblem] Madrid) */}
        <CenterRowItem
          index={0}
          active={active}
          leftLabel={content.intro.leftLabel}
          rightLabel={content.intro.rightLabel}
          isIntro
        />

        {/* Items 1..4: Steps (STEP [01..04] OF 04) */}
        {content.steps.map((step, i) => (
          <CenterRowItem
            key={step.number}
            index={i + 1}
            active={active}
            leftLabel="STEP"
            rightLabel={`OF 0${content.steps.length}`}
            numeral={step.number}
          />
        ))}
      </div>

      {/* 1px Vertical hairline from 58svh to 80svh */}
      <CenterHairline progress={progress} />

      {/* Caption at 84svh */}
      <div className="approach-caption-wrapper">
        {allCaptions.map((captionText, i) => (
          <CenterCaptionItem
            key={captionText + i}
            index={i}
            active={active}
            text={captionText}
          />
        ))}
      </div>
    </div>
  )
}

export const ApproachCenter = memo(ApproachCenterComponent)
export default ApproachCenter
