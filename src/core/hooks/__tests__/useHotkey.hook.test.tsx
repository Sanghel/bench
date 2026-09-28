import { fireEvent, renderHook } from '@testing-library/react'
import { useHotkey } from 'core/hooks'

describe('useHotkey', () => {
  it('fires on the key with ⌘ or Ctrl when mod is required', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('k', handler, { mod: true }))
    fireEvent.keyDown(window, { key: 'k' })
    expect(handler).not.toHaveBeenCalled()
    fireEvent.keyDown(window, { key: 'K', metaKey: true })
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('ignores other keys', () => {
    const handler = vi.fn()
    renderHook(() => useHotkey('k', handler))
    fireEvent.keyDown(window, { key: 'j' })
    expect(handler).not.toHaveBeenCalled()
    fireEvent.keyDown(window, { key: 'k' })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does nothing while disabled and cleans up on unmount', () => {
    const handler = vi.fn()
    const { rerender, unmount } = renderHook(
      ({ enabled }) => useHotkey('k', handler, { enabled }),
      {
        initialProps: { enabled: false },
      },
    )
    fireEvent.keyDown(window, { key: 'k' })
    expect(handler).not.toHaveBeenCalled()
    rerender({ enabled: true })
    unmount()
    fireEvent.keyDown(window, { key: 'k' })
    expect(handler).not.toHaveBeenCalled()
  })
})
