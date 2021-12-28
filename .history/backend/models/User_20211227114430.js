import mongoose from '../db/conn.js'
const { Schema } = mongoose

const userSchema  = 
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
      image:{
        type:String,
      },
      phone:{
        type: String,
        required: true,
      },
  
    }, 
     {timestamps: true},
  ),
)

export const User = mongoose.model('user', userSchema);