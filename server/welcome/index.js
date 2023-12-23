const express = require('express');
const router = express.Router();
const verifyToken = require('../midleware/authMiddleware');

router.get('/welcome', verifyToken, async (req, res) => {
  res.status(200).json({ message: 'Welcome to the server' });
});


module.exports = router
