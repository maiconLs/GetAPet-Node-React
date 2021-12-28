const router = require('express').Router()

const PetController = require('../controllers/PetController')
const checkToken = require("../")

router.post('/create', PetController.create)

module.exports = router