const router = require('express').Router()

const UserController = require('../controllers/UserController')

const verifyToken = require('../')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', UserController.editUser)

module.exports = router