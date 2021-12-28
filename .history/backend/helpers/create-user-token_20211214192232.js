const jws = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

  const token = jws.sign({
    name: user.name,
    id: user._id,
  }, "nossoscret")
}

res.status(200).json({
  message: "Você está autenticado",
  token,
  useruser._id
})

module.exports = createUserToken