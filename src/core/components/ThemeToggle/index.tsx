import type { JSX } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useColorScheme } from 'core/theme'
import { AppButton } from 'core/components/AppButton'

export function ThemeToggle(): JSX.Element {
  const { isDark, toggleMode } = useColorScheme()
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <AppButton variant="icon" onClick={toggleMode} aria-label={label} title={label}>
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </AppButton>
  )
}
