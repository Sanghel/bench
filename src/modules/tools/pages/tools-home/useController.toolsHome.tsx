import { useLocation, useParams } from 'react-router-dom'
import { getTool, isToolId } from 'core/catalogues'
import type { ToolsLocationState } from 'core/router/routes.config'
import type { UseToolsHomeControllerReturn } from './toolsHomeTypes'

export function useToolsHomeController(): UseToolsHomeControllerReturn {
  const { toolId } = useParams<{ toolId: string }>()
  const state = useLocation().state as ToolsLocationState | null
  return {
    tool: isToolId(toolId) ? getTool(toolId) : null,
    input: state?.input ?? '',
  }
}
