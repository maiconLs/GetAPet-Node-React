const router = require('express').Router()

const PetController = require('../controllers/PetController')
const checkToken = require("../helpers/check-token")

router.post('/create', checkToken, PetController.create)

module.exports = router