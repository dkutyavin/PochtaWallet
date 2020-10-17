import * as React from 'react'
import { Providers } from './app/providers'
import { Root } from './app/root'

export default function App() {
  return (
    <Providers>
      <Root />
    </Providers>
  )
}
