const getToken = (req) => {

  const authHeaders = req.headers.authorization
  const token = authHeaders.splite("")[1]
}

moudule.exports = getToken