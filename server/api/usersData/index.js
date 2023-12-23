const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const verifyToken = require('../../midleware/authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});


module.exports = router
