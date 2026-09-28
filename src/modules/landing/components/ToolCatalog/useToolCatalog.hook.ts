import { useMemo, useState } from 'react'
import { TOOL_CATEGORIES, TOOLS } from 'core/catalogues'
import type { Tool, ToolCategory } from 'core/catalogues'

export type CatalogFilter = 'All' | ToolCategory

export const CATALOG_FILTERS: readonly CatalogFilter[] = ['All', ...TOOL_CATEGORIES]

type UseToolCatalogReturn = {
  filter: CatalogFilter
  setFilter: (filter: CatalogFilter) => void
  tools: Tool[]
  total: number
}

export function useToolCatalog(): UseToolCatalogReturn {
  const [filter, setFilter] = useState<CatalogFilter>('All')
  const tools = useMemo(
    (): Tool[] => (filter === 'All' ? TOOLS : TOOLS.filter((t) => t.category === filter)),
    [filter],
  )
  return { filter, setFilter, tools, total: TOOLS.length }
}
