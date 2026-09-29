import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { AppBadge, AppButton, AppKbd } from 'core/components'
import { TOOLS_HOME, toolPath } from 'core/router/routes.config'
import {
  HERO_ANNOUNCEMENT,
  HERO_CHECKS,
  HERO_SUBTITLE,
  HERO_TITLE,
} from 'modules/landing/constants'
import type { HeroSectionProps } from './types'
import styles from './HeroSection.module.css'

export function HeroSection({ onOpenSearch }: HeroSectionProps): JSX.Element {
  return (
    <section className={styles.hero}>
      <Link to={toolPath('jdiff')} className={styles.announcement}>
        <AppBadge className={styles.announcementBadge}>{HERO_ANNOUNCEMENT.badge}</AppBadge>
        <span className={styles.announcementText}>{HERO_ANNOUNCEMENT.text}</span>
        <ArrowRight size={13} className={styles.announcementArrow} aria-hidden />
      </Link>
      <h1 className={styles.title}>{HERO_TITLE}</h1>
      <p className={styles.subtitle}>{HERO_SUBTITLE}</p>
      <div className={styles.ctas}>
        <AppButton size="lg" to={TOOLS_HOME}>
          Open the tools
          <ArrowRight size={16} aria-hidden />
        </AppButton>
        <AppButton
          size="lg"
          variant="secondary"
          className={styles.searchCta}
          onClick={onOpenSearch}
        >
          Search a tool
          <span className={styles.keys}>
            <AppKbd variant="raised">⌘</AppKbd>
            <AppKbd variant="raised">K</AppKbd>
          </span>
        </AppButton>
      </div>
      <ul className={styles.checks}>
        {HERO_CHECKS.map((check) => (
          <li key={check} className={styles.check}>
            <Check size={14} className={styles.checkIcon} aria-hidden />
            {check}
          </li>
        ))}
      </ul>
    </section>
  )
}
