import jsonwebtoken from 'jsonwebtoken'
const { sign}

const createUserToken = async (user, req, res) => {

  const token = sign({
    name: user.name,
    id: user._id,
  }, "mysecret")


res.status(200).json({
  message: "Você está autenticado",
  token: token,
  userId: user._id,
})
}
export default createUserToken