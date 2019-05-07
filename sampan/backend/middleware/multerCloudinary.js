const multer = require("multer")
const cloudinary = require("cloudinary")
const cloudinaryStorage = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary:cloudinary,
  folder: "sampan",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{crop: "limit"}],
  filename: function(req,file,cb){
    console.log(file)
    cb(undefined,file.originalname)
  }
})

const parser = multer({storage:storage})

module.exports = parser
