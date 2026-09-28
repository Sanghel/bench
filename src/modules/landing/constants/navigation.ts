export type NavLink = {
  label: string
  /** Omitted while the destination doesn't exist yet — rendered as "Soon". */
  href?: string
  external?: boolean
}

export const HEADER_LINKS: NavLink[] = [
  { label: 'Tools', href: '/#tools' },
  { label: 'Shortcuts', href: '/#features' },
  { label: 'Changelog' },
]

export const FOOTER_LINKS: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/Sanghel', external: true },
  { label: 'Changelog' },
  { label: 'Privacy' },
]
