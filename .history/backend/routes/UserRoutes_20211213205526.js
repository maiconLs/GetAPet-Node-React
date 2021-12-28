const router = require('express').Router()

const UserController = require('')
router.post('/register', UserController.register)

module.exports = router