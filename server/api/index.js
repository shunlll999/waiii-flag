const express = require('express');
const router = express.Router()

router.post('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Home Page', timeStamp: Date.now() })
})

module.exports = router
