const jwt = require('jsonwebstorage')
const getToken = require('./get-token')

const checkToken = (next, req, res) => {
  if(!req.headers.authorization){
    return res.status(401).json({message: "Acesso negado"})
  }

  const token = getToken(req)

  if(!token){
    return res.status(401).json({message: "Acesso negado"})
  }

  try{
    const verified = jwt.verify(token, 'nossoscret')
    req.user = verified
    next()
  } catch(err){
    return res.status(401).json({message: "Acesso negado"})

  }
}