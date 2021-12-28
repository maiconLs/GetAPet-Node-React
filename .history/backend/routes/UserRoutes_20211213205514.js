const router = require('express').Router()

router.post('/register', UserController.register)

module.exports = router