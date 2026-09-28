import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ScrollToHash } from 'core/router/components/ScrollToHash'

describe('ScrollToHash', () => {
  it('scrolls the hash target into view', () => {
    const target = document.createElement('div')
    target.id = 'tools'
    target.scrollIntoView = vi.fn()
    document.body.appendChild(target)
    render(
      <MemoryRouter initialEntries={['/#tools']}>
        <ScrollToHash />
      </MemoryRouter>,
    )
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    target.remove()
  })

  it('scrolls to the top without a hash', () => {
    const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    render(
      <MemoryRouter initialEntries={['/tools']}>
        <ScrollToHash />
      </MemoryRouter>,
    )
    expect(spy).toHaveBeenCalledWith(0, 0)
    spy.mockRestore()
  })
})
