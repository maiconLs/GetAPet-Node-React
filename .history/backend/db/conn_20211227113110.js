import mongoose from 'mongoose'
cons
async function main(){
  await mongoose.connect('mongodb://localhost:27017/getapet')
}

main().catch((error) => console.log(error))

export default mongoose