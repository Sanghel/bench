import type { JSX } from 'react'
import type { AppBadgeProps } from './types'
import styles from './AppBadge.module.css'

export function AppBadge({ tone = 'accent', children, className }: AppBadgeProps): JSX.Element {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
