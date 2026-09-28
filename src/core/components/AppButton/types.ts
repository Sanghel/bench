import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** primary = ink fill · secondary = surface + border · ghost = text only · icon = square. */
export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'
export type AppButtonSize = 'sm' | 'md' | 'lg'

export type AppButtonProps = {
  variant?: AppButtonVariant
  size?: AppButtonSize
  /** When set, renders a router link styled as a button. */
  to?: string
  state?: unknown
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>
