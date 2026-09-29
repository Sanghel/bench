import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LandingHeader } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

describe('LandingHeader', () => {
  it('renders the brand, navigation and GitHub link', () => {
    renderWithRouter(<LandingHeader />)
    expect(screen.getByRole('link', { name: 'bench. home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Tools' })).toHaveAttribute('href', '/#tools')
    expect(screen.getByRole('link', { name: 'Shortcuts' })).toHaveAttribute('href', '/#features')
    expect(screen.getByText('Changelog')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/Sanghel',
    )
  })

  it('opens tool search from the search button', async () => {
    renderWithRouter(<LandingHeader />)
    await userEvent.click(screen.getByRole('button', { name: /search tools/i }))
    expect(screen.getByTestId('location')).toHaveTextContent('/tools')
    expect(screen.getByTestId('location')).toHaveAttribute('data-state', '{"openPalette":true}')
  })

  it('opens tool search with ⌘K', () => {
    renderWithRouter(<LandingHeader />)
    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(screen.getByTestId('location')).toHaveTextContent('/tools')
  })
})
