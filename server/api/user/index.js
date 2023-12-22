const express = require('express');
const router = express.Router();
const verifyToken = require('../../midleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router
