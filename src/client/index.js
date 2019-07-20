import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../components/app'
import langData from '../utils/i18n-langs'
import '../styles'

const startup = () => {
  hydrate(<App Router={BrowserRouter} langData={langData} />, document.getElementById('root'))
}

startup()

if (module.hot) {
  module.hot.accept('../components/app', () => {
    startup()
  })
}
