// #!/usr/bin/env node
// import http from 'http'
/**
 * Module dependencies.
 */

const app = require('./app')
const debug = require('debug')('server:server')
const http = require('http')
const mongoose = require('mongoose')
const { MONGO_URL } = require('../../constants')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create MongoDB and HTTP server.
 */

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const server = http.createServer(app)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Listen on provided port, on all network interfaces.
 */

const db = mongoose.connection
db.on('error', err => {
  server.listen(port)
  console.error(err)
})
db.once('open', () => {
  server.listen(port)
  console.info(`DB connected, starting server at port ${port}`)
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

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

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
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
