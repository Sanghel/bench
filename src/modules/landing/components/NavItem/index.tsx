import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import type { NavItemProps } from './types'
import styles from './NavItem.module.css'

/** A header/footer link; destinations that don't exist yet render as "Soon". */
export function NavItem({ link, className }: NavItemProps): JSX.Element {
  const cls = [styles.item, className].filter(Boolean).join(' ')
  if (!link.href) {
    return (
      <span className={[cls, styles.soon].join(' ')} aria-disabled="true" title="Coming soon">
        {link.label}
      </span>
    )
  }
  if (link.external) {
    return (
      <a className={cls} href={link.href} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    )
  }
  return (
    <Link className={cls} to={link.href}>
      {link.label}
    </Link>
  )
}
