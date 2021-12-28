const jws = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

  const token = jws.signin({
    name: user.name,
    id: user._id,
  }, "nossoscret")
}

module.exports = c