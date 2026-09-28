import type { JSX } from 'react'
import type { AppBrandProps } from './types'
import styles from './AppBrand.module.css'

export function AppBrand({ size = 'md', className }: AppBrandProps): JSX.Element {
  return (
    <span className={[styles.brand, styles[size], className].filter(Boolean).join(' ')}>
      bench<span className={styles.dot}>.</span>
    </span>
  )
}
