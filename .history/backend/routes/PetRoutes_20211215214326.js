const router = require('express').Router()

const PetController = require('../controllers/PetController')

const checkToken = require("../helpers/check-token")
const {imageUpload} = require('../helpers/image-upload')


router.post('/create', checkToken,imageUpload.single("image") PetController.create)

module.exports = router