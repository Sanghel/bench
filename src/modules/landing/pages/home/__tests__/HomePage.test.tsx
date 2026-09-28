import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from 'modules/landing'
import { renderWithRouter } from 'test/renderWithRouter'

describe('HomePage', () => {
  it('composes hero, features, catalogue and paste sections', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /why bench/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /every tool, one shortcut away/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /paste anything/i })).toBeInTheDocument()
  })

  it('moves the hero light with the pointer, ignoring touch', () => {
    renderWithRouter(<HomePage />)
    const hero = screen.getByTestId('hero-background').parentElement as HTMLElement
    fireEvent.pointerMove(hero, { clientX: 120, clientY: 80, pointerType: 'mouse' })
    expect(hero.style.getPropertyValue('--mx')).toBe('120px')
    expect(hero.style.getPropertyValue('--my')).toBe('80px')
    fireEvent.pointerMove(hero, { clientX: 5, clientY: 5, pointerType: 'touch' })
    expect(hero.style.getPropertyValue('--mx')).toBe('120px')
  })

  it('opens tool search from the hero', async () => {
    renderWithRouter(<HomePage />)
    await userEvent.click(screen.getByRole('button', { name: /search a tool/i }))
    expect(screen.getByTestId('location')).toHaveTextContent('/tools')
  })
})
