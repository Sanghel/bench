import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

/** Renders the current location so tests can assert on navigation. */
export function LocationProbe(): ReactElement {
  const location = useLocation()
  return (
    <div data-testid="location" data-state={JSON.stringify(location.state ?? null)}>
      {location.pathname}
      {location.hash}
    </div>
  )
}

export function renderWithRouter(ui: ReactElement, initialEntry = '/'): RenderResult {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
      <LocationProbe />
    </MemoryRouter>,
  )
}
