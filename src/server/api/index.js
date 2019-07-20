const express = require('express')
const router = express.Router()
const { Message } = require('../models')

/* POST message */
router.post('/message', (req, res) => {
  const ip = req.headers['x-real-ip'] || '127.0.0.1'

  const message = new Message({ ...req.body, ip })
  message
    .save()
    .then(() =>
      res
        .status(200)
        .json({})
        .end(),
    )
    .catch(err =>
      res
        .status(400)
        .json(err)
        .end(),
    )
})

module.exports = router
