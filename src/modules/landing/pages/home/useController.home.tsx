import { useCallback, useRef } from 'react'
import type { PointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOOLS_HOME } from 'core/router/routes.config'
import type { ToolsLocationState } from 'core/router/routes.config'
import type { UseHomeControllerReturn } from './homeTypes'

export function useHomeController(): UseHomeControllerReturn {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)

  /** Feeds the cursor position to the hero light via CSS custom properties. */
  const onHeroPointerMove = useCallback((e: PointerEvent<HTMLDivElement>): void => {
    const el = heroRef.current
    if (!el || e.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  const openSearch = useCallback((): void => {
    const state: ToolsLocationState = { openPalette: true }
    void navigate(TOOLS_HOME, { state })
  }, [navigate])

  return { heroRef, onHeroPointerMove, openSearch }
}
