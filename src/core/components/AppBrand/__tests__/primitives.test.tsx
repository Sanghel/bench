import { render, screen } from '@testing-library/react'
import { AppBadge, AppBrand, AppKbd } from 'core/components'

describe('primitives', () => {
  it('renders the bench. wordmark', () => {
    const { container } = render(<AppBrand size="lg" />)
    expect(container).toHaveTextContent('bench.')
  })

  it('renders a keyboard hint as <kbd>', () => {
    render(<AppKbd variant="raised">⌘K</AppKbd>)
    expect(screen.getByText('⌘K').tagName).toBe('KBD')
  })

  it('renders a badge with its tone', () => {
    render(<AppBadge tone="outline">Format</AppBadge>)
    expect(screen.getByText('Format').className).toMatch(/outline/)
  })
})
