import { act, renderHook } from '@testing-library/react'
import { useColorScheme } from 'core/theme'

describe('useColorScheme', () => {
  it('exposes the mode and flips it', () => {
    const { result } = renderHook(() => useColorScheme())
    act(() => result.current.setMode('light'))
    expect(result.current.isDark).toBe(false)
    act(() => result.current.toggleMode())
    expect(result.current.mode).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })
})
