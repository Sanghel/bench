import type { ToolId } from 'core/catalogues'

export const HOME = '/'
export const TOOLS_HOME = '/tools'

export const toolPath = (id: ToolId): string => `${TOOLS_HOME}/${id}`

/** Router state handed to the tools area (phase 2 consumes it). */
export type ToolsLocationState = {
  input?: string
  openPalette?: boolean
}

export const EXTERNAL_LINKS = {
  author: 'https://sanghel.dev',
  github: 'https://github.com/Sanghel',
} as const
