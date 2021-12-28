const multer = require("multer")
const path = require("path")

const imageStore = multer.diskStorage({
  destination: function(req, file, cb){
    let folder = ''

    if(req.baseUrl.includes('users')){
      folder = 'users'
    } else if(req.baseUrl.includes('pets')){
      folder = 'pets'
    }
    cb(null, `public/images/${folder}`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const imageUpload = multer({
  storage: imageStore,
  fileFilter: (req, file, cb) => {
    if(!file.originalname.match(/\.(p)))
  }
})