import type { JSX } from 'react'
import { FEATURES } from 'modules/landing/constants'
import styles from './FeatureStrip.module.css'

export function FeatureStrip(): JSX.Element {
  return (
    <section id="features" className={styles.strip} aria-label="Why bench">
      <div className={styles.grid}>
        {FEATURES.map(({ title, body, icon: Icon }) => (
          <div key={title} className={styles.feature}>
            <span className={styles.icon}>
              <Icon size={18} aria-hidden />
            </span>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.body}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
