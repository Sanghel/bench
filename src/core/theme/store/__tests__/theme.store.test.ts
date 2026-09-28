import { act } from '@testing-library/react'
import { matchMedia } from 'test/setup'
import { THEME_STORAGE_KEY } from 'core/theme/config'
import { applyTheme, resolveInitialMode, useThemeStore } from 'core/theme/store/theme.store'

describe('resolveInitialMode', () => {
  it('prefers a saved choice', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    expect(resolveInitialMode()).toBe('dark')
  })

  it('ignores an invalid saved value and falls back to the OS preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'purple')
    matchMedia.set({ '(prefers-color-scheme: dark)': true })
    expect(resolveInitialMode()).toBe('dark')
  })

  it('defaults to light', () => {
    expect(resolveInitialMode()).toBe('light')
  })

  it('falls back when storage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(resolveInitialMode()).toBe('light')
    spy.mockRestore()
  })
})

describe('applyTheme', () => {
  it('writes data-theme and persists the mode', () => {
    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('still sets the attribute when storage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    applyTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    spy.mockRestore()
  })
})

describe('useThemeStore', () => {
  it('toggles between light and dark', () => {
    act(() => useThemeStore.getState().setMode('light'))
    act(() => useThemeStore.getState().toggleMode())
    expect(useThemeStore.getState().mode).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    act(() => useThemeStore.getState().toggleMode())
    expect(useThemeStore.getState().mode).toBe('light')
  })
})
