import { verify } from 'jsonwebtoken';

import { findOne } from "../models/User.js";

const getUserByToken = async (token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  const decoded = verify(token, 'mysecret')

  const userId = decoded.id

  const user = await findOne({_id: userId})

  return user
}

export default getUserByToken