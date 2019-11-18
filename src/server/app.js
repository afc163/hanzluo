const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const rateLimit = require('express-rate-limit')

const { getRealIp } = require('../utils/req-helpers')
const indexRouter = require('./routes/index')
const apiRouter = require('./api')

const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20, // limit each IP to 20 requests per windowMs
  keyGenerator: getRealIp,
})

app.use(limiter)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use('*.js', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/javascript')
    next()
  })
  app.use('*.css', (req, res, next) => {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/css')
    next()
  })
}

app.use(express.static(path.join(__dirname, '../../dist/client')))

app.use('/api', apiRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// We need 4 arguments here to make the first one to be error object
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const error = {}
  if (process.env.NODE_ENV !== 'production') {
    error.name = err.name
    error.message = err.message
    error.stack = err.stack
  }

  res
    .status(500)
    .send(error)
    .end()
})

module.exports = app
