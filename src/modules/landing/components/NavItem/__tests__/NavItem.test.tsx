import { screen } from '@testing-library/react'
import { NavItem } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

describe('NavItem', () => {
  it('renders an internal destination as a router link', () => {
    renderWithRouter(<NavItem link={{ label: 'Tools', href: '/#tools' }} />)
    expect(screen.getByRole('link', { name: 'Tools' })).toHaveAttribute('href', '/#tools')
  })

  it('opens external destinations in a new tab', () => {
    renderWithRouter(
      <NavItem link={{ label: 'GitHub', href: 'https://github.com', external: true }} />,
    )
    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders a pending destination as non-interactive text', () => {
    renderWithRouter(<NavItem link={{ label: 'Changelog' }} />)
    expect(screen.queryByRole('link', { name: 'Changelog' })).not.toBeInTheDocument()
    expect(screen.getByText('Changelog')).toHaveAttribute('aria-disabled', 'true')
  })
})
