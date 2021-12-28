const getToken = (req) => {

  const authHeaders = req.headers.authorization
  const token = authHeader.splite("")[1]

  return token
}

module.exports = getToken