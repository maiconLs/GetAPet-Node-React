const Pet = require('../models/Pet')

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId


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

    if(!ObjectId.isValid(id)){
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    const pet = await Pet.findOne({_id: id})

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    res.status(200).json({
      pet: pet
    })
  }

  static async removePetById(req, res){
    const id = req.params.id

    if(!ObjectId.isValid(id)){
      res.status(422).json({ message: 'ID inválido' })
      return
    }

    const pet = await Pet.findOne({_id: id})

    if(!pet){
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()){
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({ message: 'Pet removido com sucesso!' })

  }

  static async updatePet(req, res) {
    const id = req.params.id
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = req.body.available

    const updateData = {}

    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updateData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else {
      updateData.age = age
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    } else {
      updateData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    } else {
      updateData.color = color
    }

    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    } else {
      updateData.images = []
      images.map((image) => {
        updateData.images.push(image.filename)
      })
    }

    if (!available) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.available = available
    }

    updateData.description = description

    await Pet.findByIdAndUpdate(id, updateData)

    res.status(200).json({ pet: pet, message: 'Pet atualizado com sucesso!' })
  }
  static async schedule(req, res) {
    const id = req.params.id

    const pet = await Pet.findOne({ _id: id })

    const token = getToken(req)
    const user = await getUserByToken(token)

    console.log(pet)

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: 'Você não pode agendar uma visita com seu próprio Pet!',
      })
      return
    }

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: 'Você já agendou uma visita para este Pet!',
        })
        return
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    }

    console.log(pet)

    await Pet.findByIdAndUpdate(pet._id, pet)

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
    })
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    pet.available = false

    await Pet.findByIdAndUpdate(pet._id, pet)

    res.status(200).json({
      pet: pet,
      message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
    })
  }
}