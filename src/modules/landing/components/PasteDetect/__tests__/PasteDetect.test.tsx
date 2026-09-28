import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasteDetect } from 'modules/landing/components'
import { renderWithRouter } from 'test/renderWithRouter'

const textarea = () => screen.getByRole('textbox', { name: /paste content/i })

describe('PasteDetect', () => {
  it('offers samples and a browse CTA while empty', () => {
    renderWithRouter(<PasteDetect />)
    ;['JSON', 'JWT', 'Base64', 'SQL'].forEach((s) =>
      expect(screen.getByRole('button', { name: s })).toBeInTheDocument(),
    )
    expect(screen.getByRole('button', { name: /browse all tools/i })).toBeInTheDocument()
  })

  it('detects the format of a sample and retitles the CTA', async () => {
    renderWithRouter(<PasteDetect />)
    await userEvent.click(screen.getByRole('button', { name: 'JWT' }))
    expect((textarea() as HTMLTextAreaElement).value).toMatch(/^eyJ/)
    expect(screen.getByText('Looks like')).toBeInTheDocument()
    expect(screen.getByText('a JWT')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open jwt debugger/i })).toBeInTheDocument()
  })

  it('opens the detected tool with the pasted input', async () => {
    renderWithRouter(<PasteDetect />)
    fireEvent.change(textarea(), { target: { value: ' {"a":1} ' } })
    await userEvent.click(screen.getByRole('button', { name: /open json formatter/i }))
    expect(screen.getByTestId('location')).toHaveTextContent('/tools/json')
    expect(screen.getByTestId('location')).toHaveAttribute(
      'data-state',
      JSON.stringify({ input: '{"a":1}' }),
    )
  })

  it('submits with ⌘↵ from the textarea', () => {
    renderWithRouter(<PasteDetect />)
    fireEvent.change(textarea(), { target: { value: 'https://bench.dev' } })
    fireEvent.keyDown(textarea(), { key: 'Enter' })
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/)
    fireEvent.keyDown(textarea(), { key: 'Enter', metaKey: true })
    expect(screen.getByTestId('location')).toHaveTextContent('/tools/url')
  })

  it('browses all tools when nothing is pasted', async () => {
    renderWithRouter(<PasteDetect />)
    await userEvent.click(screen.getByRole('button', { name: /browse all tools/i }))
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/tools$/)
  })
})
