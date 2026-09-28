import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppSegmented } from 'core/components'

describe('AppSegmented', () => {
  it('marks the current option as checked and reports changes', async () => {
    const onChange = vi.fn()
    render(
      <AppSegmented
        label="Mode"
        options={['Encode', 'Decode']}
        value="Encode"
        onChange={onChange}
      />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Mode' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Encode' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Decode' })).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(screen.getByRole('radio', { name: 'Decode' }))
    expect(onChange).toHaveBeenCalledWith('Decode')
  })
})
