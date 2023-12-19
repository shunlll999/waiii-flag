const express = require('express');
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  console.log('cookies', req.cookies);
  // if (req.cookies['_wachiii-cokie']) {
    next();
  // } else {
    // res.redirect('/auth');
  // }

})
// define the home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page'})
})
// define the about route
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Page', layout: './layouts/sidebar' })
})

module.exports = router
