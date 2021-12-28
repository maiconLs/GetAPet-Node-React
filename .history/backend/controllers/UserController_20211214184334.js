const User = require('../models/User')

const bcrypt = require('bcrypt')

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
      res.status(422).json({message: "O campo confirme senha é obrigatório!"})
      return
    }
    if(!phone) {
      res.status(422).json({message: "O campo telefone é obrigatório!"})
      return
    }

    if(password !== confirmpassword){
      res.status(422).json({message: "Senha e confirmação de senha não estão iguais1"})
      return
    }

    const userExits = await User.findOne({email: email})

    if(userExits){
      res.status(422).json({message: "Este email já está em uso!"})
      return
    }

    const salt = await bcrypt.salt(12)
    const passwordHash = await bcrypt.hash(salt, password)

    const user = new User({
      nome,
      email,
      password: passwordHash,
      phone
    })

    try{
      const newUser = user.save()
      res.status(201).json({message:
        
      })
    } catch(error){
        res.status(500).json({message: error})
    }

  }
}