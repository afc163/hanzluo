
const express = require('express')
const router = express.Router()

/* POST message */
router.post('/message', (req, res) => {
  res.sendStatus(200).end()
})

module.exports = router
