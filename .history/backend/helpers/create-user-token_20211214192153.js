const jws = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

  const token = jws.sign({
    name: user.name,
    id: user._id,
  }, "nossoscret")
}

res.status(200).

module.exports = createUserToken