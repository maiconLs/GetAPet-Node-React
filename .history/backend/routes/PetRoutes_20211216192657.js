const router = require('express').Router()

const PetController = require('../controllers/PetController')

const checkToken = require("../helpers/check-token")
const {imageUpload} = require('../helpers/image-upload')


router.post('/create', checkToken, imageUpload.array("image"), PetController.create)
router.get('/', PetController.getAll)
router.get('/', PetController.getAllpet)

module.exports = router