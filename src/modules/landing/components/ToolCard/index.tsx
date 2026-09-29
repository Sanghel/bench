import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { AppBadge } from 'core/components'
import { toolPath } from 'core/router/routes.config'
import type { ToolCardProps } from './types'
import styles from './ToolCard.module.css'

export function ToolCard({ tool }: ToolCardProps): JSX.Element {
  const { id, name, desc, category, icon: Icon, isNew } = tool
  return (
    <Link to={toolPath(id)} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.icon}>
          <Icon size={18} aria-hidden />
        </span>
        {isNew && <AppBadge>New</AppBadge>}
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <span className={styles.desc}>{desc}</span>
      </div>
      <AppBadge tone="outline" className={styles.category}>
        {category}
      </AppBadge>
    </Link>
  )
}
