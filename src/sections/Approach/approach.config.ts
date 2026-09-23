// ─── Approach Section Configuration ──────────────────────────────────────────

export const PIN_SCREENS_APPROACH = 5

export const APPROACH_TIMELINE = {
  HOLD: 0.12,
  MOVE: 0.10,
} // 5*HOLD + 4*MOVE = 1

export const PROGRESS_SPRING = { stiffness: 140, damping: 30, mass: 0.5 }

/**
 * Standard cubic ease-out curve
 */
export const easeOutCubic = (t: number): number => {
  const p = Math.min(Math.max(t, 0), 1)
  return 1 - Math.pow(1 - p, 3)
}

/**
 * Smooth cubic ease-in-out curve
 */
export const easeInOutCubic = (t: number): number => {
  const p = Math.min(Math.max(t, 0), 1)
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
}

/**
 * Converts pinned scroll progress p [0..1] into continuous wheel active value [0..4]
 * 0 = Intro (Hold 0..0.12)
 * 0 -> 1 = Move to Step 1 (0.12..0.22)
 * 1 = Step 1 Hold (0.22..0.34)
 * 1 -> 2 = Move to Step 2 (0.34..0.44)
 * 2 = Step 2 Hold (0.44..0.56)
 * 2 -> 3 = Move to Step 3 (0.56..0.66)
 * 3 = Step 3 Hold (0.66..0.78)
 * 3 -> 4 = Move to Step 4 (0.78..0.88)
 * 4 = Step 4 Hold (0.88..1.00)
 */
export function progressToActive(p: number): number {
  const clamped = Math.min(Math.max(p, 0), 1)
  const { HOLD, MOVE } = APPROACH_TIMELINE

  for (let i = 0; i < 4; i++) {
    const holdStart = i * (HOLD + MOVE)
    const holdEnd = holdStart + HOLD
    const moveEnd = holdEnd + MOVE

    if (clamped <= holdEnd) {
      return i
    }
    if (clamped < moveEnd) {
      const t = (clamped - holdEnd) / MOVE
      const eased = easeInOutCubic(t)
      return i + eased
    }
  }

  return 4
}
