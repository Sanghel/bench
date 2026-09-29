import type { JSX } from 'react'
import { ArrowLeft } from 'lucide-react'
import { AppBadge, AppButton } from 'core/components'
import { HOME } from 'core/router/routes.config'
import { useToolsHomeController } from './useController.toolsHome'
import styles from './ToolsHomePage.module.css'

/** Phase 1 placeholder — the dashboard and the tools ship in phase 2. */
export default function ToolsHomePage(): JSX.Element {
  const { tool, input } = useToolsHomeController()
  const Icon = tool?.icon
  return (
    <section className={styles.page}>
      <AppBadge>Phase 2</AppBadge>
      {Icon && (
        <span className={styles.icon}>
          <Icon size={22} aria-hidden />
        </span>
      )}
      <h1 className={styles.title}>{tool ? tool.name : 'The tools dashboard'} is on its way</h1>
      <p className={styles.body}>
        We’re building the dashboard and the interactive tools next. For now, explore the catalogue
        on the home page.
      </p>
      {input && (
        <pre className={styles.input} aria-label="Your pasted input">
          {input}
        </pre>
      )}
      <AppButton variant="secondary" to={HOME}>
        <ArrowLeft size={15} aria-hidden />
        Back home
      </AppButton>
    </section>
  )
}
