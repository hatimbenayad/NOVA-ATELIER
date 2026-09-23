// ─── Numbers Section Configuration ──────────────────────────────────────────

export const NUMBERS_TIMELINE = {
  PIN_SCREENS: 3.6, // extra scroll length in screens; higher = slower, calmer reveal
  intro: { start: 0.0, end: 0.09 }, // tag + center line
  rows: { start: 0.14, stagger: 0.075, duration: 0.36 }, // row i (0-4) window = [start + i*stagger, start + i*stagger + duration]
  quote: { start: 0.84, end: 0.94 },
  // 0.94 to 1.0: hold the finished layout, then the pin releases
}

export const PROGRESS_SPRING = { stiffness: 140, damping: 30, mass: 0.5 }

/**
 * Standard cubic ease-out curve (smooth deceleration)
 */
export const easeOutCubic = (t: number): number => {
  const p = Math.min(Math.max(t, 0), 1)
  return 1 - Math.pow(1 - p, 3)
}
