/**
 * Logo — geometric SVG emblem + wordmark
 * Swap the SVG path inside <LogoEmblem> to change the mark.
 */

import type { CSSProperties } from 'react'

interface LogoProps {
  /** If true, renders emblem only (no wordmark). Used in navbar. */
  compact?: boolean
  /** Override color (defaults to currentColor) */
  color?: string
  className?: string
  style?: CSSProperties
}

export interface LogoEmblemProps {
  color?: string
  size?: number | string
  className?: string
  style?: CSSProperties
}

/** Geometric architectural emblem — abstract "N" built from thin strokes */
export function LogoEmblem({ color = 'currentColor', size = 48, className = '', style }: LogoEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Outer rectangle frame */}
      <rect x="8" y="6" width="32" height="36" rx="1" stroke={color} strokeWidth="1.5" />
      {/* Left vertical pillar */}
      <line x1="14" y1="12" x2="14" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right vertical pillar */}
      <line x1="34" y1="12" x2="34" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal crossbar — the "N" stroke */}
      <line x1="14" y1="12" x2="34" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Top horizontal lintel */}
      <line x1="8" y1="6" x2="40" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Base / ground line */}
      <line x1="4" y1="42" x2="44" y2="42" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export const LogoMark = LogoEmblem

export default function Logo({ compact = false, color, className = '', style }: LogoProps) {
  const strokeColor = color ?? 'currentColor'

  if (compact) {
    return (
      <span className={className} style={style} aria-label="NOVA Atelier">
        <LogoEmblem color={strokeColor} />
      </span>
    )
  }

  return (
    <div
      className={`flex flex-col items-center gap-0 ${className}`}
      style={style}
      aria-label="NOVA Atelier"
    >
      <LogoEmblem color={strokeColor} />
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 500,
          fontSize: '1.375rem',
          letterSpacing: '0.3em',
          color: strokeColor,
          lineHeight: 1.1,
          textTransform: 'uppercase',
          marginTop: '6px',
        }}
      >
        NOVA
      </span>
      <span
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: '0.5625rem',
          letterSpacing: '0.35em',
          color: strokeColor,
          lineHeight: 1.6,
          textTransform: 'uppercase',
          opacity: 0.7,
        }}
      >
        ATELIER
      </span>
    </div>
  )
}
