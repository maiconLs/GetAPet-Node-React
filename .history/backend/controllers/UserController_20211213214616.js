const User = require('../models/User')

module.exports = class UserController{
  static async register(req, res){

    const {name, email, password, confirmpassword, phone} = req.body

    if(!name) {
      res.status(422).json({message: "O campo nome é obrigatório!"})
      return
    }
    if(!email) {
      res.status(422).json({message: "O campo email é obrigatório!"})
      return
    }
    if(!password) {
      res.status(422).json({message: "O campo senha é obrigatório!"})
      return
    }
    if(!confirmpassword) {
      res.status(422).json({message: "O campo nome é obrigatório!"})
      return
    }
    if(!name) {
      res.status(422).json({message: "O campo nome é obrigatório!"})
      return
    }
  }
}