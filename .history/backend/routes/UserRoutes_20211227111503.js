import { Express } from 'express'
const router = require('express').Router()

import { register, login, checkUser, getUserById, editUser } from '../controllers/UserController'

import checkToken from '../helpers/check-token'
import { imageUpload } from '../helpers/image-upload'

router.post('/register', register)
router.post('/login', login)
router.get('/checkuser', checkUser)
router.get('/:id', getUserById)
router.patch('/edit/:id', checkToken, imageUpload.single("image"), editUser)

export default router