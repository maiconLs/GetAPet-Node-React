const router = require('express').Router()

const PetController = require('../controllers/PetController')
const checkToken = require("../helpers/")

router.post('/create', PetController.create)

module.exports = router