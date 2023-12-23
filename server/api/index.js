const express = require('express');
const auth = require('./auth');
const users = require('./usersData');
const projects = require('./projects');
const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/projects', projects);

module.exports = router
