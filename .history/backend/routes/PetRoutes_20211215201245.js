const router = require('express').Router()

const PetController = require('../controllers/PetController')

router.post('/create', PetController)

module.exports = router