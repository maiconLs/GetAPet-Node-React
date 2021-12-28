const User = require('../models/User')

const bcrypt = require('bcrypt')

const createUserToken

module.exports = class UserController{
  static async register(req, res){
    
    const {name, email, phone, password, confirmpassword} = req.body

    if(!name) {
      res.status(422).json({message: "O campo nome é obrigatório!"})
      return
    }
    if(!email) {
      res.status(422).json({message: "O campo email é obrigatório!"})
      return
    }
    if(!phone) {
      res.status(422).json({message: "O campo telefone é obrigatório!"})
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


    if(password !== confirmpassword){
      res.status(422).json({message: "Senha e confirmação de senha não estão iguais1"})
      return
    }
   
    const userExits = await User.findOne({email: email})

    if(userExits){
      res.status(422).json({message: "Este email já está em uso!"})
      return
    }
    
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    })

    try{
      const newUser = await user.save()
      res.status(201).json({message:
        'Usuario criado com sucesso!',
        newUser
      })
    } catch(error){
        res.status(500).json({message: error})
        console.log(error)
    }

  }
}