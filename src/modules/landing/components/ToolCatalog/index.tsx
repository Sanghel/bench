import type { JSX } from 'react'
import { AppSegmented } from 'core/components'
import { TOOL_CATEGORIES } from 'core/catalogues'
import { SectionHeading } from 'modules/landing/components/SectionHeading'
import { ToolCard } from 'modules/landing/components/ToolCard'
import { CATALOG_FILTERS, useToolCatalog } from './useToolCatalog.hook'
import styles from './ToolCatalog.module.css'

const CATEGORY_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']

export function ToolCatalog(): JSX.Element {
  const { filter, setFilter, tools, total } = useToolCatalog()
  return (
    <section id="tools" className={styles.section} aria-labelledby="tools-title">
      <div className={styles.head}>
        <SectionHeading
          id="tools-title"
          title="Every tool, one shortcut away"
          subtitle={`${total} tools across ${CATEGORY_WORDS[TOOL_CATEGORIES.length]} categories.`}
        />
        <AppSegmented
          label="Filter tools by category"
          options={CATALOG_FILTERS}
          value={filter}
          onChange={setFilter}
        />
      </div>
      <div className={styles.grid}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
