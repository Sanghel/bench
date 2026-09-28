import { create } from 'zustand'
import type { ThemeMode } from '../types'
import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from '../config'

type ThemeState = {
  mode: ThemeMode
  toggleMode: () => void
  setMode: (mode: ThemeMode) => void
}

export function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', mode)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    // Storage can be blocked (private mode); the attribute still applies.
  }
}

/** Saved choice first, then the OS preference, then the default. */
export function resolveInitialMode(): ThemeMode {
  let saved: string | null
  try {
    saved = localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    saved = null
  }
  if (saved === 'light' || saved === 'dark') return saved
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  return DEFAULT_THEME_MODE
}

const initialMode = resolveInitialMode()
applyTheme(initialMode)

export const useThemeStore = create<ThemeState>()((set) => ({
  mode: initialMode,
  toggleMode: (): void =>
    set((state) => {
      const next: ThemeMode = state.mode === 'light' ? 'dark' : 'light'
      applyTheme(next)
      return { mode: next }
    }),
  setMode: (mode): void => {
    applyTheme(mode)
    set({ mode })
  },
}))
