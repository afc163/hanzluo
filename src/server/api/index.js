const express = require('express')
const router = express.Router()
const { Message } = require('../models')

/* POST message */
router.post('/message', (req, res, next) => {
  const message = new Message(req.body)
  message
    .save()
    .then(() => res.status(200).json({}).end())
    .catch(e => next(e))
})

module.exports = router
