const getToken = (req) => {

  const authHeader = req.headers.authorization
  const token = authHeader.splite("")[1]

  return token
}

module.exports = getToken