const User = require('../models/User')

module.exports = class UserController{
  static async register(req, res){

    const {name, email, password, image, phone} = req.body
  }
}