import React from 'react'
import { hydrate } from 'react-dom'
import App from '../components/app.client'
import '../styles'

const startup = () => {
  hydrate(<App />, document.getElementById('root'))
}

startup()

if (module.hot) {
  module.hot.accept('../components/app.client', () => {
    startup()
  })
}
