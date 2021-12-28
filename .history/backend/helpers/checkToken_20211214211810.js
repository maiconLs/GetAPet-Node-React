const jwt = require('jsonwebstorage')
const getToken = require('./get-token')

const checkToken = (next, req, res) => {
  if(!req.headers.authorization){
    
  }
}