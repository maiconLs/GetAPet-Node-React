import mongoose from '../db/conn.js'
const { Schema } = mongoose

const User = 
  
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

export default mongoose.model('User', User)