const jwt = require('jsonwebstorage')
const getToken = require('./get-token')

const checkToken = (next, req, res) => {
  if(!req.headers.authorization){
    return res.status(401).json({message: "Token"})
  }
}