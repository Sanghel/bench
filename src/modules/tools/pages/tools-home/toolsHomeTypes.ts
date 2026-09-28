import type { Tool } from 'core/catalogues'

export type UseToolsHomeControllerReturn = {
  /** Tool requested through /tools/:toolId, if any. */
  tool: Tool | null
  /** Text handed over from the landing paste box. */
  input: string
}
