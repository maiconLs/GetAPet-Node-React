const mongoose = require('mongoose')

async function main(){
  await mongoose.connect('mongodb:')
}