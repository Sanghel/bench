import { useThemeStore } from '../store/theme.store'
import type { ThemeMode } from '../types'

type UseColorSchemeReturn = {
  mode: ThemeMode
  isDark: boolean
  toggleMode: () => void
  setMode: (mode: ThemeMode) => void
}

export function useColorScheme(): UseColorSchemeReturn {
  const mode = useThemeStore((s) => s.mode)
  const toggleMode = useThemeStore((s) => s.toggleMode)
  const setMode = useThemeStore((s) => s.setMode)
  return { mode, isDark: mode === 'dark', toggleMode, setMode }
}
