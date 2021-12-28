import mongoose from '../db/conn.js'

const user = new mongoose.Schema(
  
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


let User = mongoose.model('User', user);

export default User;