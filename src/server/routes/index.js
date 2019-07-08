const { createElement } = require('react')
const express = require('express')
const router = express.Router()
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const template = require('../template')
const App = require('../../../dist/server/app').default
const assets = require('../../../dist/server/assets.json')

/* GET home page. */
router.get('/*', (req, res) => {
  const context = {}
  const appString = renderToString(createElement(App, { req, context }))
  const helmet = Helmet.renderStatic()

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url)
  }

  res.send(template({
    body: appString,
    titleTag: helmet.title.toString(),
    assets,
  }))
})

module.exports = router
