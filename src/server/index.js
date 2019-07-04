// #!/usr/bin/env node
// import http from 'http'
/**
 * Module dependencies.
 */

const app = require('./app')
const debug = require('debug')('server:server')
const http = require('http')
const mongoose = require('mongoose')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create MongoDB and HTTP server.
 */

const MONGO_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://localhost:27017/hanzluo'
    : 'mongodb://localhost:27017/hanzluo'

mongoose.connect(MONGO_URL)

const server = http.createServer(app)
const db = mongoose.connection

/**
 * Listen on provided port, on all network interfaces.
 */

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('DB connected, starting server') // eslint-disable-line no-console
  server.on('error', onError)
  server.on('listening', onListening)
  server.listen(port)
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
