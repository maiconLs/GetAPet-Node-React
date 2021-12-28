import mongoose from '../db/conn.js'

const User = mongoose.Schema(
  
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

const userModel = mongoose.model('User', userSchema);

export default userModel;