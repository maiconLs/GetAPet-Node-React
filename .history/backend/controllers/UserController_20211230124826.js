import User from '../models/User.js'
// const {findOne, findById, findOneAndUpdate} = User

import bcrypt from 'bcrypt'
const { genSalt, hash, compare } = bcrypt

import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken

import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"
import getUserByToken from "../helpers/get-user-by-token.js"

export default class UserController{
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
      res.status(422).json({message: "Senha e confirmação de senha não estão iguais"})
      return
    }
   
    const userExits = await User.findOne({email: email})

    if(userExits){
      res.status(422).json({message: "Este email já está em uso!"})
      return
    }
    
    const salt = await genSalt(12)
    const passwordHash = await hash(password, salt)

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

    const user = await User.findOne({ email: email })

    if (!user) {
      return res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail!' })
    }

    const checkPassword = await compare(password, user.password)

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
          const decoded = verify(token, 'mysecret')
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

  static async getUserById(req, res){
    const id = req.params.id

    const user = await User.findById(id).select('-password')

    if(!user){
      res.status(422).json({message: "Ususário não encontrado"})
      return
    }

    res.status(200).json({message: user})
  }  

  static async editUser(req, res) {
    const token = getToken(req)

  

    const user = await getUserByToken(token)


    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    let image = ''

    if (req.file) {
      image = req.file.filename
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    user.email = email

    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    user.phone = phone

    // check if password match
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não conferem.' })

      // change password
    } else if (password === confirmpassword && password !== null) {
      // creating password
      const salt = await genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await hash(reqPassword, salt)

      user.password = passwordHash
    }

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

}