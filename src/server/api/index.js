const express = require('express')
const router = express.Router()
const { Message } = require('../models')

/* POST message */
router.post('/message', (req, res, next) => {
  // test request ip in prod
  console.log('req.headers[\'x-forwarded-for\']: ', req.headers['x-forwarded-for']) // eslint-disable-line
  console.log('req.connection.remoteAddress: ', req.connection.remoteAddress) // eslint-disable-line

  const message = new Message(req.body)
  message
    .save()
    .then(() => res.status(200).json({}).end())
    .catch(e => next(e))
})

module.exports = router
