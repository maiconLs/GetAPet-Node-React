const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken =  require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")

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

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }

  static async login(req, res) {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    // check if user exists
    const user = await User.findOne({ email: email })

    if (!user) {
      return res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail!' })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha inválida' })
    }

    await createUserToken(user, req, res)
  }

  static async checkUser(req, res) {
    let currentUser

    try{
        if (req.headers.authorization) {
          
          const token = getToken(req)
          const decoded = jwt.verify(token, 'nossoscret')
          currentUser = await User.findById(decoded.id)

          currentUser.password = undefined
        } else {
          currentUser = null
        }
        res.status(200).send(currentUser)

    }catch(err){
      res.status(422).json({message: err})
    }
        
  }

  static userById(req, res){
    
  }
}