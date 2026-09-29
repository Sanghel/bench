import type { JSX } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RoutesProvider } from 'core/router'
import { ScrollToHash } from 'core/router/components/ScrollToHash'

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/">
      <ScrollToHash />
      <RoutesProvider />
    </BrowserRouter>
  )
}

export default App
