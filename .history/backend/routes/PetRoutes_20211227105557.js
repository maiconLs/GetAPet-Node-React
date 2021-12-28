const router = require('express').Router()

import { create, getAll, getAllUserPets, getAllUserAdoptions, getPetById, removePetById, updatePet, schedule, concludeAdoption } from '../controllers/PetController'

import checkToken from "../helpers/check-token"
import { imageUpload } from '../helpers/image-upload'


router.post('/create', checkToken, imageUpload.array("images"), create)
router.get('/', getAll)
router.get('/mypets', checkToken, getAllUserPets)
router.get('/myadoptions', checkToken, getAllUserAdoptions)
router.get('/:id', getPetById)
router.delete('/:id', checkToken, removePetById)
router.patch(
  '/:id',
  checkToken,
  imageUpload.array('images'),
  updatePet,
)
router.patch('/schedule/:id', checkToken, schedule)
router.patch('/conclude/:id', checkToken, concludeAdoption)





export default router