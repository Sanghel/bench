import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroSection } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

describe('HeroSection', () => {
  it('renders the headline, subtitle and trust checks', () => {
    renderWithRouter(<HeroSection onOpenSearch={vi.fn()} />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'The dev tools you reach for, in one quiet place.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/nothing is uploaded/i)).toBeInTheDocument()
    ;['Free', 'No sign-up', 'Works offline'].forEach((t) =>
      expect(screen.getByText(t)).toBeInTheDocument(),
    )
  })

  it('links the announcement to JSON Diff and the main CTA to the tools', () => {
    renderWithRouter(<HeroSection onOpenSearch={vi.fn()} />)
    expect(screen.getByRole('link', { name: /word-level json diff/i })).toHaveAttribute(
      'href',
      '/tools/jdiff',
    )
    expect(screen.getByRole('link', { name: /open the tools/i })).toHaveAttribute('href', '/tools')
  })

  it('opens search from the secondary CTA', async () => {
    const onOpenSearch = vi.fn()
    renderWithRouter(<HeroSection onOpenSearch={onOpenSearch} />)
    await userEvent.click(screen.getByRole('button', { name: /search a tool/i }))
    expect(onOpenSearch).toHaveBeenCalledOnce()
  })
})
