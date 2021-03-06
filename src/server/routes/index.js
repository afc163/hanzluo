const { createElement } = require('react')
const express = require('express')
const router = express.Router()
const { StaticRouter } = require('react-router')
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const template = require('../template')
const App = require('../../../dist/server/app').default
const assets = require('../../../dist/server/assets.json')
const langData = require('../../utils/i18n-langs')

/* GET home page. */
router.get('/*', (req, res) => {
  const context = {}
  const appString = renderToString(
    createElement(App, {
      Router: StaticRouter,
      routerProps: {
        location: req.originalUrl,
        context: {},
      },
      langData,
    })
  )
  const helmet = Helmet.renderStatic()

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url)
  }

  res.send(
    template({
      body: appString,
      titleTag: helmet.title.toString(),
      assets,
      isProd: process.env.NODE_ENV === 'production',
    })
  )
})

module.exports = router
