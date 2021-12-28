const User = require('../models/User')

module.exports = class UserController{
  static async register(req, res){

    const {name, email, password, confirmpassword, phone} = req.body

    if(!name) {
      res.status(422).json(message: {"O campo nome é obrigatório!")
    }
  }
}