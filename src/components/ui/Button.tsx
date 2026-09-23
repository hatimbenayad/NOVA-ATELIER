import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'ghost' | 'filled' | 'text'

interface ButtonBaseProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonProps =
  | (ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never })
  | (ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string })

const variantStyles: Record<Variant, string> = {
  filled: `
    inline-flex items-center gap-3
    px-8 py-3.5
    bg-[var(--color-ink)] text-[var(--color-bg)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    border border-[var(--color-ink)]
    transition-all duration-300
    hover:bg-transparent hover:text-[var(--color-ink)]
    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)] focus-visible:outline-offset-3
  `,
  ghost: `
    inline-flex items-center gap-3
    px-8 py-3.5
    bg-transparent text-[var(--color-ink)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    border border-[var(--color-ink)]
    transition-all duration-300
    hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]
    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)] focus-visible:outline-offset-3
  `,
  text: `
    inline-flex items-center gap-2
    bg-transparent text-[var(--color-ink)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    relative after:absolute after:bottom-0 after:left-0
    after:h-px after:w-0 after:bg-[var(--color-ink)]
    after:transition-[width] after:duration-300
    hover:after:w-full
    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)] focus-visible:outline-offset-3
  `,
}

export default function Button({ variant = 'ghost', children, className = '', as, ...rest }: ButtonProps) {
  const styles = `${variantStyles[variant]} ${className}`

  if (as === 'a') {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a href={href} className={styles} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button className={styles} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
