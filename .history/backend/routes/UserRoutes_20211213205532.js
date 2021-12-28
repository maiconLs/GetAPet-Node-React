const router = require('express').Router()

const UserController = require('../controllers/')
router.post('/register', UserController.register)

module.exports = router