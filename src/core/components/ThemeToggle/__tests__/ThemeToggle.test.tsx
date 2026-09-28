import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from 'core/components'
import { useThemeStore } from 'core/theme'

describe('ThemeToggle', () => {
  it('switches the theme and updates its label', async () => {
    act(() => useThemeStore.getState().setMode('light'))
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
    expect(useThemeStore.getState().mode).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })
})
