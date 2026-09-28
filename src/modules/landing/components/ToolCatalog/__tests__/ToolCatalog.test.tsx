import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToolCatalog } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

const cards = () => within(screen.getByRole('region', { name: /every tool/i })).getAllByRole('link')

describe('ToolCatalog', () => {
  it('shows all 14 tools by default', () => {
    renderWithRouter(<ToolCatalog />)
    expect(screen.getByText('14 tools across five categories.')).toBeInTheDocument()
    expect(cards()).toHaveLength(14)
  })

  it('filters by category', async () => {
    renderWithRouter(<ToolCatalog />)
    await userEvent.click(screen.getByRole('radio', { name: 'Compare' }))
    expect(cards().map((c) => c.getAttribute('href'))).toEqual(['/tools/diff', '/tools/jdiff'])
    await userEvent.click(screen.getByRole('radio', { name: 'All' }))
    expect(cards()).toHaveLength(14)
  })

  it('flags new tools and links each card to its tool', () => {
    renderWithRouter(<ToolCatalog />)
    const jsonDiff = screen.getByRole('link', { name: /json diff/i })
    expect(within(jsonDiff).getByText('New')).toBeInTheDocument()
    expect(jsonDiff).toHaveAttribute('href', '/tools/jdiff')
  })
})
