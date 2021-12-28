const Pet = require('../models/Pet')

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class PetController{
  static async create(req, res){
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = true



    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    }

    if (images.lenght === 0) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pet = new Pet ({
      name: name,
      age: age,
      description: description,
      weight: weight,
      color: color,
      available: available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      await pet.save()
      const newPet = await pet.save()

      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet: newPet,})
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }

  static async getAll(req, res)  {
    const pets = await Pet.find().sort('-createdAt')
    res.status(200).json({pets: pets})
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({
      pets,
    })
  }

  static async getAllUserAdoptions(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'adopter._id': user._id })

    res.status(200).json({
      pets,
    })
  }

  static async getPetById(req, res){
    const id = req.params.id

    if(!ObjectId.IsValid(id)){
      res.status(422).json({ message: 'ID inválido' })

    }
  }
}