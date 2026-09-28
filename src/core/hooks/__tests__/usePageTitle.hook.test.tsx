import { renderHook } from '@testing-library/react'
import { usePageTitle } from 'core/hooks'

describe('usePageTitle', () => {
  it('uses the default title without a page title', () => {
    renderHook(() => usePageTitle())
    expect(document.title).toBe('bench. — dev tools in one quiet place')
  })

  it('suffixes a page title with the brand', () => {
    renderHook(() => usePageTitle('Tools'))
    expect(document.title).toBe('Tools · bench.')
  })
})
