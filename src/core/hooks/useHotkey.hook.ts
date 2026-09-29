import { useEffect, useRef } from 'react'

export type HotkeyOptions = {
  /** Require ⌘ on macOS / Ctrl elsewhere. */
  mod?: boolean
  enabled?: boolean
}

/** Binds a global keydown shortcut, e.g. `useHotkey('k', open, { mod: true })`. */
export function useHotkey(key: string, handler: () => void, options: HotkeyOptions = {}): void {
  const { mod = false, enabled = true } = options
  const handlerRef = useRef(handler)

  useEffect((): void => {
    handlerRef.current = handler
  }, [handler])

  useEffect((): (() => void) | void => {
    if (!enabled) return
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return
      if (mod && !(e.metaKey || e.ctrlKey)) return
      e.preventDefault()
      handlerRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return (): void => window.removeEventListener('keydown', onKeyDown)
  }, [key, mod, enabled])
}
