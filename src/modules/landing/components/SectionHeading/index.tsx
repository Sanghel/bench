import type { JSX } from 'react'
import type { SectionHeadingProps } from './types'
import styles from './SectionHeading.module.css'

export function SectionHeading({
  id,
  title,
  subtitle,
  align = 'start',
}: SectionHeadingProps): JSX.Element {
  return (
    <div className={[styles.heading, styles[align]].join(' ')}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}
