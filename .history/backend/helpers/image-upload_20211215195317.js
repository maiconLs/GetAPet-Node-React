const multer = require("multer")
const path = require("path")

const imageStore = multer.diskStorage({
  destination: function(req, file, cb){
    let folder = ''

    if(req.baseUrl)
  }
})