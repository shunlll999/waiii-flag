const express = require('express');
const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  res.render('auth', { title: 'Login Page' })
})

router.post('/', (req, res) => {
  // res.status(200).json({ success: true, message: 'Home Page', timeStamp: Date.now() })
  console.log(req.cookies)

  let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: true // Indicates if the cookie should be signed
  }

  // Set cookie
  res.cookie('cokieName', 'cokieValue', options) // options is optional
  res.redirect('/home');
})

module.exports = router
