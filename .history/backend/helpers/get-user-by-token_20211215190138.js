const jwt = require('jsonwebtoken')
const User = require("../models/User")

const getUserByToken = (token)