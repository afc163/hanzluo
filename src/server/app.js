const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const apiRouter = require('./api')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
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
  if (req.app.get('env') === 'development') {
    error.name = err.name
    error.message = err.message
    error.stack = err.stack
  }

  res.status(500).send(error).end()
})

module.exports = app
