const Pet = require('../models/Pet')

const getToken = require("../helpers/get-token")
const getUserById = require("../helpers/get-user-by-token")

module.exports = class PetController{
  static async create(req, res){
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = true

    // console.log(req.body)
    console.log(images)
    // return

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

    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    const pet = new Pet {
      name = name,
      description = description
    }

  }
}