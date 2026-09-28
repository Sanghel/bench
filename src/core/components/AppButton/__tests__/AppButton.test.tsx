import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppButton } from 'core/components'

describe('AppButton', () => {
  it('renders a button that defaults to type="button" and handles clicks', async () => {
    const onClick = vi.fn()
    render(<AppButton onClick={onClick}>Save</AppButton>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders a router link when given a destination', () => {
    render(
      <MemoryRouter>
        <AppButton to="/tools" aria-label="Open tools">
          Open
        </AppButton>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Open tools' })).toHaveAttribute('href', '/tools')
  })

  it('applies variant and size classes', () => {
    render(
      <AppButton variant="secondary" size="lg">
        Go
      </AppButton>,
    )
    expect(screen.getByRole('button').className).toMatch(/secondary/)
    expect(screen.getByRole('button').className).toMatch(/lg/)
  })
})
