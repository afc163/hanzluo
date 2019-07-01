
const express = require('express')
const router = express.Router()

/* POST message */
router.post('/message', (req, res) => {
  console.log(req.body)
  res.status(200).json({}).end()
})

module.exports = router
