import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import type { LandingLayoutProps } from './types'
import styles from './LandingLayout.module.css'

/** Public shell: sticky header, routed content, footer. */
export function LandingLayout({ header, footer }: LandingLayoutProps): JSX.Element {
  return (
    <div className={styles.layout}>
      {header}
      <main className={styles.main}>
        <Outlet />
      </main>
      {footer}
    </div>
  )
}
