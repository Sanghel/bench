import type { JSX } from 'react'
import type { AppKbdProps } from './types'
import styles from './AppKbd.module.css'

export function AppKbd({ variant = 'plain', children, className }: AppKbdProps): JSX.Element {
  return (
    <kbd className={[styles.kbd, styles[variant], className].filter(Boolean).join(' ')}>
      {children}
    </kbd>
  )
}
