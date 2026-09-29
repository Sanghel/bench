import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotkey } from 'core/hooks'
import { TOOLS_HOME } from 'core/router/routes.config'
import type { ToolsLocationState } from 'core/router/routes.config'

type UseLandingHeaderReturn = {
  openSearch: () => void
}

/** ⌘K anywhere on the landing opens tool search in the tools area. */
export function useLandingHeader(): UseLandingHeaderReturn {
  const navigate = useNavigate()
  const openSearch = useCallback((): void => {
    const state: ToolsLocationState = { openPalette: true }
    void navigate(TOOLS_HOME, { state })
  }, [navigate])

  useHotkey('k', openSearch, { mod: true })

  return { openSearch }
}
