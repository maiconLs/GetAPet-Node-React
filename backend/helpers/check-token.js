import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken
import getToken from './get-token.js';

const checkToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json({ message: "Acesso negado!" })
  }
  const token = getToken(req)

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = verify(token, "mysecret");
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

export default checkToken;
