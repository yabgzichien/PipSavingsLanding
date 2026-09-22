import React from 'react'

export type PipMarkVariant = 'coin' | 'app-icon'

export interface PipMarkProps {
  size?: number
  compact?: boolean
  variant?: PipMarkVariant
  className?: string
  color?: string
  alt?: string
}

/**
 * Authentic Pip mascot vector ported pixel-for-pixel from the official Pip
 * mobile application (`PipFinance/src/components/CoinMascot.tsx`).
 */
export function PipMark({
  size,
  compact = false,
  variant = 'coin',
  className = '',
  color,
  alt = 'Pip mascot',
}: PipMarkProps) {
  // Default sizes: compact brand logo = 32px; standard mascot = 56px
  const resolvedSize = size ?? (compact ? 32 : 56)
  const bodyRim = color ?? '#F5B42A'
  const bodyFace = color ? '#FAC438' : '#FAC438'
  const bodyBevel = color ? '#D99E18' : '#D99E18'

  if (variant === 'app-icon') {
    return (
      <svg
        width={resolvedSize}
        height={resolvedSize}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pip-mark pip-mark--app-icon ${compact ? 'pip-mark--compact' : ''} ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* App Icon Squircle Background */}
        <rect width="56" height="56" rx="13.5" fill="#173f31" />
        <rect
          x="0.75"
          y="0.75"
          width="54.5"
          height="54.5"
          rx="12.75"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
        />

        {/* Mascot inside squircle scaled gently */}
        <g transform="translate(2, 2) scale(0.925)">
          {/* Left leaf */}
          <path d="M20 16 C20 11,13 8,11 12.5 C9 17,15 19,20 16Z" fill="#1c7a4e" />
          {/* Right leaf */}
          <path d="M36 16 C36 11,43 8,45 12.5 C47 17,41 19,36 16Z" fill="#2aab68" />
          {/* Stem */}
          <line x1="28" y1="13.5" x2="28" y2="20" stroke="#185e3e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Coin drop shadow */}
          <ellipse cx="28.5" cy="46" rx="12" ry="2.3" fill="rgba(0, 0, 0, 0.28)" />
          {/* Coin rim */}
          <circle cx="28" cy="35.5" r={15.5} fill={bodyRim} />
          {/* Inner bevel */}
          <circle cx="28" cy="35.5" r={12.5} fill={bodyFace} />
          <circle cx="28" cy="35.5" r={12.5} fill="none" stroke={bodyBevel} strokeWidth="1.2" />
          {/* Eyes */}
          <ellipse cx="23.5" cy="34" rx="1.9" ry="2.2" fill="#7A4800" />
          <ellipse cx="32.5" cy="34" rx="1.9" ry="2.2" fill="#7A4800" />
          {/* Eye shine */}
          <circle cx="24.3" cy="33" r={0.75} fill="white" opacity="0.9" />
          <circle cx="33.3" cy="33" r={0.75} fill="white" opacity="0.9" />
          {/* Smile */}
          <path
            d="M23.5 38.5 Q28 42.2 32.5 38.5"
            stroke="#7A4800"
            strokeWidth="1.9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Blush */}
          <ellipse cx="19.5" cy="37.5" rx="2.5" ry="1.6" fill="#F07828" opacity={0.32} />
          <ellipse cx="36.5" cy="37.5" rx="2.5" ry="1.6" fill="#F07828" opacity={0.32} />
          {/* Highlight */}
          <ellipse
            cx="21"
            cy="29"
            rx="4"
            ry="2.3"
            fill="white"
            opacity="0.25"
            transform="rotate(-26 21 29)"
          />
        </g>
      </svg>
    )
  }

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pip-mark ${compact ? 'pip-mark--compact' : ''} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Left leaf */}
      <path d="M20 16 C20 11,13 8,11 12.5 C9 17,15 19,20 16Z" fill="#1c7a4e" />
      {/* Right leaf */}
      <path d="M36 16 C36 11,43 8,45 12.5 C47 17,41 19,36 16Z" fill="#2aab68" />
      {/* Stem */}
      <line x1="28" y1="13.5" x2="28" y2="20" stroke="#185e3e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Coin drop shadow */}
      <ellipse cx="28.5" cy="46" rx="12" ry="2.3" fill="rgba(8, 28, 14, 0.15)" />
      {/* Coin body rim */}
      <circle cx="28" cy="35.5" r={15.5} fill={bodyRim} />
      {/* Inner bevel ring */}
      <circle cx="28" cy="35.5" r={12.5} fill={bodyFace} />
      <circle cx="28" cy="35.5" r={12.5} fill="none" stroke={bodyBevel} strokeWidth="1.2" />
      {/* Eyes */}
      <ellipse cx="23.5" cy="34" rx="1.9" ry="2.2" fill="#7A4800" />
      <ellipse cx="32.5" cy="34" rx="1.9" ry="2.2" fill="#7A4800" />
      {/* Eye shine */}
      <circle cx="24.3" cy="33" r={0.75} fill="white" opacity="0.85" />
      <circle cx="33.3" cy="33" r={0.75} fill="white" opacity="0.85" />
      {/* Smile */}
      <path
        d="M23.5 38.5 Q28 42.2 32.5 38.5"
        stroke="#7A4800"
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush */}
      <ellipse cx="19.5" cy="37.5" rx="2.5" ry="1.6" fill="#F07828" opacity={0.32} />
      <ellipse cx="36.5" cy="37.5" rx="2.5" ry="1.6" fill="#F07828" opacity={0.32} />
      {/* Highlight */}
      <ellipse
        cx="21"
        cy="29"
        rx="4"
        ry="2.3"
        fill="white"
        opacity="0.25"
        transform="rotate(-26 21 29)"
      />
    </svg>
  )
}
