import { screen } from '@testing-library/react'
import { LandingFooter } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

describe('LandingFooter', () => {
  it('credits the author with the React and TypeScript logos', () => {
    renderWithRouter(<LandingFooter />)
    expect(screen.getByText(/crafted with/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'love' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'TypeScript' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sanghel González' })).toHaveAttribute(
      'href',
      'https://sanghel.dev',
    )
  })

  it('renders footer links, with pending ones marked as coming soon', () => {
    renderWithRouter(<LandingFooter />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank')
    expect(screen.getByText('Privacy')).toHaveAttribute('title', 'Coming soon')
  })
})
