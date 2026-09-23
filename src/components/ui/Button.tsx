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
    bg-[var(--fg)] text-[var(--bg)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    border border-[var(--fg)]
    transition-all duration-300
    hover:bg-transparent hover:text-[var(--fg)]
    focus-visible:outline-2 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3
  `,
  ghost: `
    inline-flex items-center gap-3
    px-8 py-3.5
    bg-transparent text-[var(--fg)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    border border-[var(--fg)]
    transition-all duration-300
    hover:bg-[var(--fg)] hover:text-[var(--bg)]
    focus-visible:outline-2 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3
  `,
  text: `
    inline-flex items-center gap-2
    bg-transparent text-[var(--fg)]
    font-[Jost] font-[400] text-[0.6875rem] tracking-[0.3em] uppercase
    relative after:absolute after:bottom-0 after:left-0
    after:h-px after:w-full after:bg-[var(--line-strong)]
    after:transition-colors after:duration-300
    hover:after:bg-[var(--fg)]
    focus-visible:outline-2 focus-visible:outline-[var(--fg)] focus-visible:outline-offset-3
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
