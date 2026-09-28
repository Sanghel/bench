import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import type { AppButtonProps } from './types'
import styles from './AppButton.module.css'

export function AppButton({
  variant = 'primary',
  size = 'md',
  to,
  state,
  className,
  children,
  type = 'button',
  ...rest
}: AppButtonProps): JSX.Element {
  const cls = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} state={state} className={cls} aria-label={rest['aria-label']}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}
