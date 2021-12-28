const jwt = require("jsonwebtoken");
const getToken = require('./get-token')
// middleware to validate token
const checkToken = (req, res, next) => {
  if(!req.head)
  const token = getToken(req)

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

module.exports = checkToken;
