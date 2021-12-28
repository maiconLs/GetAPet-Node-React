const jwt = require('jsonwebtoken')
const User = require("../models/User")

const getUserByToken = async (token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  const decoded = jwt.verify(token, 'nossoscret')

  const token = decoded.id
}