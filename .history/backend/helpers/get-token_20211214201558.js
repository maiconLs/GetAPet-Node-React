const getToken = (req) => {

  const authHeaders = req.headers.authorization
  const token = authHeaders.splite("")[1]

  return token
}

moudule.exports = getToken