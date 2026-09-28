import type { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useToolsHomeController } from 'modules/tools/pages/tools-home/useController.toolsHome'

function makeWrapper(entry: { pathname: string; state?: unknown }) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/tools" element={children} />
          <Route path="/tools/:toolId" element={children} />
        </Routes>
      </MemoryRouter>
    )
  }
}

describe('useToolsHomeController', () => {
  it('resolves the tool from the URL and reads handed-over input', () => {
    const { result } = renderHook(() => useToolsHomeController(), {
      wrapper: makeWrapper({ pathname: '/tools/b64', state: { input: 'aGk=' } }),
    })
    expect(result.current.tool?.name).toBe('Base64')
    expect(result.current.input).toBe('aGk=')
  })

  it('returns no tool and empty input on the tools index', () => {
    const { result } = renderHook(() => useToolsHomeController(), {
      wrapper: makeWrapper({ pathname: '/tools' }),
    })
    expect(result.current.tool).toBeNull()
    expect(result.current.input).toBe('')
  })
})
