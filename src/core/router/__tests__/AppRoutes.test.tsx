import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from 'core/router/AppRoutes'
import { LocationProbe } from 'test/renderWithRouter'
import { toolPath } from 'core/router/routes.config'

function renderAt(path: string, state?: unknown) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: path, state }]}>
      <AppRoutes />
      <LocationProbe />
    </MemoryRouter>,
  )
}

describe('AppRoutes', () => {
  it('renders the landing page at /', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { level: 1, name: /dev tools you reach for/i }),
    ).toBeInTheDocument()
  })

  it('renders the tools placeholder at /tools', () => {
    renderAt('/tools')
    expect(
      screen.getByRole('heading', { level: 1, name: /tools dashboard is on its way/i }),
    ).toBeInTheDocument()
  })

  it('names the requested tool and shows handed-over input', () => {
    renderAt(toolPath('json'), { input: '{"a":1}' })
    expect(
      screen.getByRole('heading', { level: 1, name: /JSON Formatter is on its way/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/your pasted input/i)).toHaveTextContent('{"a":1}')
  })

  it('falls back to the generic placeholder for an unknown tool', () => {
    renderAt('/tools/nope')
    expect(screen.getByRole('heading', { level: 1, name: /tools dashboard/i })).toBeInTheDocument()
  })

  it('redirects unknown paths home', () => {
    renderAt('/missing')
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/)
  })
})
