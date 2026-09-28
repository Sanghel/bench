import type { JSX } from 'react'
import { AppBrand } from 'core/components'
import { EXTERNAL_LINKS } from 'core/router/routes.config'
import { FOOTER_LINKS } from 'modules/landing/constants'
import { NavItem } from 'modules/landing/components/NavItem'
import reactLogo from 'assets/logos/react.svg'
import typescriptLogo from 'assets/logos/typescript.svg'
import styles from './LandingFooter.module.css'

export function LandingFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <AppBrand size="sm" />
        <p className={styles.credit}>
          Crafted with{' '}
          <span className={styles.heart} role="img" aria-label="love">
            ♥
          </span>{' '}
          and <img src={reactLogo} alt="React" title="React" width={14} height={14} />{' '}
          <img src={typescriptLogo} alt="TypeScript" title="TypeScript" width={13} height={13} /> by{' '}
          <a
            className={styles.author}
            href={EXTERNAL_LINKS.author}
            target="_blank"
            rel="noreferrer"
          >
            Sanghel González
          </a>
        </p>
        <nav className={styles.links} aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </nav>
      </div>
    </footer>
  )
}
