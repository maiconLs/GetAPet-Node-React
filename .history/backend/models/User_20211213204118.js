const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
  
  new Schema(
    {
    name:{
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    },
    image:
  
  })
)