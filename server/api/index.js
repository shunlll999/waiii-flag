const express = require('express');
const auth = require('./auth');
const user = require('./user');
const projects = require('./projects');
const router = express.Router();

router.use('/login', auth);
router.use('/user', user);
router.use('/projects', projects);

module.exports = router
