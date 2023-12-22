const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ user: username, password: encryptPassword }, process.env.TOKEN_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ token });
});

module.exports = router
