import { render, screen } from '@testing-library/react'
import { ProductPreview } from 'modules/landing/components'

describe('ProductPreview', () => {
  it('is exposed as a single described image with nothing focusable inside', () => {
    const { container } = render(<ProductPreview />)
    expect(
      screen.getByRole('img', { name: /preview of the bench json formatter/i }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('button, a, input, textarea')).toHaveLength(0)
  })

  it('shows the formatted output with 8 numbered lines, keeping indentation', () => {
    render(<ProductPreview />)
    expect(screen.getByText('8 lines · 128 B')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('"author"').parentElement?.textContent).toBe('  "author": null,')
  })
})
