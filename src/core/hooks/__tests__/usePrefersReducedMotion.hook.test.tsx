import { act, renderHook } from '@testing-library/react'
import { matchMedia } from 'test/setup'
import { usePrefersReducedMotion } from 'core/hooks'

describe('usePrefersReducedMotion', () => {
  it('reflects the media query and follows changes', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
    act(() => matchMedia.set({ '(prefers-reduced-motion: reduce)': true }))
    expect(result.current).toBe(true)
  })
})
