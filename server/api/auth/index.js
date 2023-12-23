const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email }, process.env.TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        const cloneUser = (({password, ...arg}) => arg)(user._doc);
        res.status(201).json(cloneUser);
      } else {
        res.status(400).send("Invalid Credentials");
      }
  } catch (error) {
    res.status(400).send({error, message:"Invalid Credentials"});
  }
});

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    encryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    console.log('user', user);

    const token = jwt.sign(
      { user_id: user._id, email }, process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    const cloneUser = (({password, ...arg}) => arg)(user._doc);
    res.status(201).json(cloneUser);

  } catch (error) {
    console.log('error', error);
    res.status(400).json({ error });
  }
})


module.exports = router
