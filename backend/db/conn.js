import mongoose from 'mongoose'
const {connect} = mongoose

async function main(){
  await connect('mongodb://localhost:27017/getapet')
}

main().catch((error) => console.log(error))

export default mongoose