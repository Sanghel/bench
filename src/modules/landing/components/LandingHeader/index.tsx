import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Github, Search } from 'lucide-react'
import { AppBrand, AppKbd, ThemeToggle } from 'core/components'
import { EXTERNAL_LINKS, HOME } from 'core/router/routes.config'
import { HEADER_LINKS } from 'modules/landing/constants'
import { NavItem } from 'modules/landing/components/NavItem'
import { useLandingHeader } from './useLandingHeader.hook'
import styles from './LandingHeader.module.css'

export function LandingHeader(): JSX.Element {
  const { openSearch } = useLandingHeader()
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={HOME} className={styles.brandLink} aria-label="bench. home">
          <AppBrand />
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {HEADER_LINKS.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </nav>
        <div className={styles.actions}>
          <button type="button" className={styles.search} onClick={openSearch}>
            <Search size={14} aria-hidden />
            <span className={styles.searchLabel}>Search tools…</span>
            <AppKbd>⌘K</AppKbd>
          </button>
          <ThemeToggle />
          <a
            className={styles.github}
            href={EXTERNAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} aria-hidden />
          </a>
        </div>
      </div>
    </header>
  )
}
